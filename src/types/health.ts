export interface HealthResponse {
  status: 'connected' | 'degraded' | 'error';
  mssql: {
    available: boolean;
    connected: boolean;
    failureCount: number;
    server: string;
  };
  sqlite: {
    available: boolean;
    cacheEntries: number;
    sessions: number;
    cachedUsers: number;
  };
}

export type HealthStatus = 'loading' | 'connected' | 'degraded' | 'error';
