import { apiClient, ApiError, setIsSystemDegraded, setOnServiceUnavailable } from '../apiClient';

function mockFetch(status: number, body: Record<string, unknown>) {
  return vi.fn().mockResolvedValue({
    status,
    ok: status >= 200 && status < 300,
    json: () => Promise.resolve(body),
  });
}

async function catchErr<T>(fn: Promise<T>): Promise<unknown> {
  return fn.catch(e => e);
}

function expectApiError(err: unknown): asserts err is ApiError {
  expect(err).toBeInstanceOf(ApiError);
}

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  setIsSystemDegraded(false);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('apiClient error interceptor — normal mode (isSystemDegraded=false)', () => {
  it('passes through the original error message on 500', async () => {
    vi.stubGlobal('fetch', mockFetch(500, { error: 'Error interno del servidor' }));
    const err = await catchErr(apiClient('/test'));
    expectApiError(err);
    expect(err.status).toBe(500);
    expect(err.message).toBe('Error interno del servidor');
  });

  it('passes through the 503 error message', async () => {
    vi.stubGlobal('fetch', mockFetch(503, { error: 'Servicio no disponible' }));
    const err = await catchErr(apiClient('/test'));
    expectApiError(err);
    expect(err.status).toBe(503);
    expect(err.message).toBe('Servicio no disponible');
  });

  it('returns data on 200', async () => {
    vi.stubGlobal('fetch', mockFetch(200, { data: 'ok' }));
    const result = await apiClient('/test');
    expect(result).toEqual({ data: 'ok' });
  });
});

describe('apiClient error interceptor — degraded mode (isSystemDegraded=true)', () => {
  beforeEach(() => {
    setIsSystemDegraded(true);
  });

  it('replaces 503 GET error with data-offline message', async () => {
    vi.stubGlobal('fetch', mockFetch(503, { error: 'Servicio no disponible' }));
    const err = await catchErr(apiClient('/test', { method: 'GET' }));
    expectApiError(err);
    expect(err.status).toBe(503);
    expect(err.message).toBe(
      'La base de datos principal no está disponible. Los datos se mostrarán cuando el servicio se restablezca.'
    );
  });

  it('replaces 500 GET error with data-offline message', async () => {
    vi.stubGlobal('fetch', mockFetch(500, { error: 'Error interno' }));
    const err = await catchErr(apiClient('/test', { method: 'GET' }));
    expectApiError(err);
    expect(err.status).toBe(500);
    expect(err.message).toBe(
      'La base de datos principal no está disponible. Los datos se mostrarán cuando el servicio se restablezca.'
    );
  });

  it('replaces POST/PUT/DELETE errors with writes-disabled message', async () => {
    vi.stubGlobal('fetch', mockFetch(503, { error: 'Servicio no disponible' }));
    const err = await catchErr(apiClient('/test', { method: 'POST' }));
    expectApiError(err);
    expect(err.status).toBe(503);
    expect(err.message).toBe(
      'Operación no disponible porque el sistema está en modo offline. Las escrituras se habilitarán cuando la base de datos se restablezca.'
    );
  });

  it('preserves original message as originalMessage', async () => {
    vi.stubGlobal('fetch', mockFetch(503, { error: 'Servicio no disponible' }));
    const err = await catchErr(apiClient('/test', { method: 'GET' }));
    expectApiError(err);
    expect(err.originalMessage).toBe('Servicio no disponible');
  });

  it('does not replace message on 200', async () => {
    vi.stubGlobal('fetch', mockFetch(200, { data: 'ok' }));
    const result = await apiClient('/test');
    expect(result).toEqual({ data: 'ok' });
  });

  it('still fires onServiceUnavailable on 503', async () => {
    const cb = vi.fn();
    setOnServiceUnavailable(cb);
    vi.stubGlobal('fetch', mockFetch(503, { error: 'Servicio no disponible' }));
    await apiClient('/test').catch(() => {});
    expect(cb).toHaveBeenCalledOnce();
  });

  it('does not replace 401 message — auth still redirects', async () => {
    vi.stubGlobal('fetch', mockFetch(401, { error: 'Unauthorized' }));
    const err = await catchErr(apiClient('/test'));
    expectApiError(err);
    expect(err.status).toBe(401);
    expect(err.message).toBe('Unauthorized');
  });
});