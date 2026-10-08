import { apiClient } from './apiClient';
import type { VentaProducto, VentasProductoResponse } from '../types/ventas';

export const fetchVentasPorProducto = async (): Promise<VentaProducto[]> => {
    const json: VentasProductoResponse = await apiClient('/ventas/ventas-producto/');
    return json.data;
};
