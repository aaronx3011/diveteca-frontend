import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import type { HealthResponse, HealthStatus } from '../types/health';
import { getHealth } from '../services/healthService';
import { useToast } from './ToastContext';
import { setOnServiceUnavailable, setIsSystemDegraded } from '../services/apiClient';

const POLL_INTERVAL = 30_000;

interface HealthContextType {
  status: HealthStatus;
  health: HealthResponse | null;
  lastCheck: Date | null;
  isPolling: boolean;
  recheck: () => void;
}

const HealthContext = createContext<HealthContextType | null>(null);

export function HealthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<HealthStatus>('loading');
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevStatusRef = useRef<HealthStatus | null>(null);
  const { showToast } = useToast();

  const fetchHealth = useCallback(async () => {
    try {
      const result = await getHealth();
      setHealth(result);
      setLastCheck(new Date());

      const newStatus: HealthStatus =
        result.status === 'connected' ? 'connected' : 'degraded';
      setIsSystemDegraded(newStatus !== 'connected');
      const prev = prevStatusRef.current;

      if (prev === 'degraded' && newStatus === 'connected') {
        showToast(
          'success',
          'La conexión con la base de datos se ha restablecido. Las operaciones de escritura ya están disponibles.',
        );
      }

      prevStatusRef.current = newStatus;
      setStatus(newStatus);
    } catch {
      setIsSystemDegraded(true);
      setStatus(() => {
        const next: HealthStatus = 'error';
        prevStatusRef.current = next;
        return next;
      });
    }
  }, [showToast]);

  const recheck = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    fetchHealth();
    intervalRef.current = setInterval(fetchHealth, POLL_INTERVAL);
  }, [fetchHealth]);

  useEffect(() => {
    setIsSystemDegraded(false);
    fetchHealth();
    intervalRef.current = setInterval(fetchHealth, POLL_INTERVAL);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsPolling(false);
      } else {
        fetchHealth();
        intervalRef.current = setInterval(fetchHealth, POLL_INTERVAL);
        setIsPolling(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchHealth]);

  useEffect(() => {
    setOnServiceUnavailable(() => {
      recheck();
    });

    return () => {
      setOnServiceUnavailable(null);
    };
  }, [recheck]);

  return (
    <HealthContext.Provider value={{ status, health, lastCheck, isPolling, recheck }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const ctx = useContext(HealthContext);
  if (!ctx) throw new Error('useHealth must be used within HealthProvider');
  return ctx;
}
