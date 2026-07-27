import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useHealth } from '../../contexts/HealthContext';

export default function DegradedBanner() {
  const { status, health, recheck } = useHealth();
  const show = status === 'degraded' || status === 'error';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={`px-4 py-2.5 flex items-center gap-3 text-sm ${
            status === 'error'
              ? 'bg-red-50 border-b border-red-200 text-red-800'
              : 'bg-amber-50 border-b border-amber-200 text-amber-800'
          }`}>
            <WifiOff size={18} className="shrink-0" />
            <div className="flex-1 min-w-0">
              {status === 'error' ? (
                <p className="font-medium">No se puede verificar el estado del servidor.</p>
              ) : (
                <>
                  <p className="font-medium">
                    Modo offline — La base de datos principal no está disponible.
                    Los datos mostrados pueden estar desactualizados.
                    Las operaciones de escritura están deshabilitadas.
                  </p>
                  {health && (
                    <p className="text-xs mt-0.5 opacity-80">
                      Intentos fallidos: {health.mssql.failureCount}
                      {health.sqlite.cachedUsers > 0 && ` · Usuarios en caché: ${health.sqlite.cachedUsers}`}
                      {health.sqlite.sessions > 0 && ` · Sesiones activas: ${health.sqlite.sessions}`}
                    </p>
                  )}
                </>
              )}
            </div>
            <button
              onClick={recheck}
              className="shrink-0 p-1.5 rounded-lg hover:bg-black/5 transition-colors"
              title="Reintentar conexión"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
