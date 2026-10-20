const API_BASE_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  public originalMessage?: string;

  constructor(
    public status: number,
    message: string,
    originalMessage?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.originalMessage = originalMessage;
  }
}

let isSystemDegraded = false;

export function setIsSystemDegraded(degraded: boolean): void {
  isSystemDegraded = degraded;
}

const DATA_OFFLINE_MSG =
  'La base de datos principal no está disponible. Los datos se mostrarán cuando el servicio se restablezca.';

const WRITES_OFFLINE_MSG =
  'Operación no disponible porque el sistema está en modo offline. Las escrituras se habilitarán cuando la base de datos se restablezca.';

function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function clearToken() {
  localStorage.removeItem('auth_token');
}

export function setToken(token: string) {
  localStorage.setItem('auth_token', token);
}

let onServiceUnavailable: (() => void) | null = null;

export function setOnServiceUnavailable(cb: (() => void) | null) {
  onServiceUnavailable = cb;
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (import.meta.env.DEV) {
    console.log(`[apiClient] ${options.method || 'GET'} ${endpoint}`, token ? 'with token' : 'no token');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.warn(`[apiClient] 401 on ${endpoint} — clearing token`);
    clearToken();
    window.location.href = '/login';
    throw new ApiError(401, 'Unauthorized');
  }

  const body = await response.json().catch(() => ({}));
  const originalMessage = body.error || undefined;

  if (response.status === 503) {
    onServiceUnavailable?.();
    if (isSystemDegraded) {
      const method = (options.method || 'GET').toUpperCase();
      const offlineMsg = method === 'GET' ? DATA_OFFLINE_MSG : WRITES_OFFLINE_MSG;
      throw new ApiError(503, offlineMsg, originalMessage);
    }
    throw new ApiError(503, originalMessage || 'Servicio no disponible');
  }

  if (!response.ok) {
    if (isSystemDegraded) {
      const method = (options.method || 'GET').toUpperCase();
      const offlineMsg = method === 'GET' ? DATA_OFFLINE_MSG : WRITES_OFFLINE_MSG;
      throw new ApiError(response.status, offlineMsg, originalMessage);
    }
    throw new ApiError(response.status, originalMessage || response.statusText);
  }

  return body as T;
}
