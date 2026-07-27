const DATA_OFFLINE_MSG =
  'La base de datos principal no está disponible. Los datos se mostrarán cuando el servicio se restablezca.';

const WRITES_OFFLINE_MSG =
  'Operación no disponible porque el sistema está en modo offline. Las escrituras se habilitarán cuando la base de datos se restablezca.';

const DEFAULT_FALLBACK = 'Error desconocido';

export function formatOfflineError(
  err: unknown,
  isDegraded: boolean,
  options?: { method?: string; fallback?: string }
): string {
  if (isDegraded) {
    const method = (options?.method || 'GET').toUpperCase();
    return method === 'GET' ? DATA_OFFLINE_MSG : WRITES_OFFLINE_MSG;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return options?.fallback || DEFAULT_FALLBACK;
}