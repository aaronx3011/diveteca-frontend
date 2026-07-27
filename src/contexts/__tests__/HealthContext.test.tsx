import { render, screen, waitFor } from '@testing-library/react';
import { HealthProvider, useHealth } from '../HealthContext';
import { ToastProvider } from '../ToastContext';
import * as apiClient from '../../services/apiClient';

function TestComponent() {
  const { status, health } = useHealth();
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="health">{health ? 'present' : 'null'}</span>
    </div>
  );
}

function renderWithProviders() {
  return render(
    <ToastProvider>
      <HealthProvider>
        <TestComponent />
      </HealthProvider>
    </ToastProvider>
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('HealthContext', () => {
  it('sets isSystemDegraded=false when health returns connected', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        status: 'connected',
        mssql: { available: true, connected: true, failureCount: 0, server: 'mssql' },
        sqlite: { available: true, cacheEntries: 0, sessions: 0, cachedUsers: 0 },
      }),
    }));

    const spy = vi.spyOn(apiClient, 'setIsSystemDegraded');

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('connected');
    });

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('sets isSystemDegraded=true when health returns degraded', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        status: 'degraded',
        mssql: { available: false, connected: false, failureCount: 5, server: 'mssql' },
        sqlite: { available: true, cacheEntries: 100, sessions: 3, cachedUsers: 10 },
      }),
    }));

    const spy = vi.spyOn(apiClient, 'setIsSystemDegraded');

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('degraded');
    });

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('sets isSystemDegraded=true when health check fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const spy = vi.spyOn(apiClient, 'setIsSystemDegraded');

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('error');
    });

    expect(spy).toHaveBeenCalledWith(true);
  });
});