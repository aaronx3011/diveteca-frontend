import { formatOfflineError } from '../errorFormatter';

describe('formatOfflineError', () => {
  describe('when isDegraded is true', () => {
    it('returns data-offline message for GET method', () => {
      const result = formatOfflineError(new Error('anything'), true, { method: 'GET' });
      expect(result).toBe(
        'La base de datos principal no está disponible. Los datos se mostrarán cuando el servicio se restablezca.'
      );
    });

    it('returns writes-disabled message for POST method', () => {
      const result = formatOfflineError(new Error('anything'), true, { method: 'POST' });
      expect(result).toBe(
        'Operación no disponible porque el sistema está en modo offline. Las escrituras se habilitarán cuando la base de datos se restablezca.'
      );
    });

    it('returns writes-disabled message for PUT method', () => {
      const result = formatOfflineError(new Error('anything'), true, { method: 'PUT' });
      expect(result).toBe(
        'Operación no disponible porque el sistema está en modo offline. Las escrituras se habilitarán cuando la base de datos se restablezca.'
      );
    });

    it('returns writes-disabled message for DELETE method', () => {
      const result = formatOfflineError(new Error('anything'), true, { method: 'DELETE' });
      expect(result).toBe(
        'Operación no disponible porque el sistema está en modo offline. Las escrituras se habilitarán cuando la base de datos se restablezca.'
      );
    });

    it('returns data-offline message when no method is specified (defaults to GET)', () => {
      const result = formatOfflineError(new Error('anything'), true);
      expect(result).toBe(
        'La base de datos principal no está disponible. Los datos se mostrarán cuando el servicio se restablezca.'
      );
    });

    it('ignores fallback when degraded', () => {
      const result = formatOfflineError(new Error('anything'), true, { fallback: 'ignored' });
      expect(result).not.toBe('ignored');
    });
  });

  describe('when isDegraded is false', () => {
    it('returns the error message from an Error instance', () => {
      const result = formatOfflineError(new Error('Error real del backend'), false);
      expect(result).toBe('Error real del backend');
    });

    it('returns fallback for non-Error with fallback provided', () => {
      const result = formatOfflineError('some string', false, { fallback: 'Error desconocido' });
      expect(result).toBe('Error desconocido');
    });

    it('returns default fallback for non-Error when no fallback given', () => {
      const result = formatOfflineError(null, false);
      expect(result).toBe('Error desconocido');
    });

    it('ignores method when not degraded', () => {
      const result = formatOfflineError(new Error('normal error'), false, { method: 'POST' });
      expect(result).toBe('normal error');
    });
  });
});