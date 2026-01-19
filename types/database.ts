/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Servicio {
  id: string;
  nombre: string;
  created_at: string;
  foto: string;
  slug: string;
}

export interface Distrito {
  id: string;
  slug: string;
  foto: string;
  created_at: string;
  nombre: string;
  telos?: number;
}
export interface Telo {
  id: string;
  nombre: string;
  descripcion: string | null;
  precios: Record<string, any> | null;
  turnos: Record<string, any> | null;
  ubicacion: string | null;
  fotos: string[] | null;
  created_at: string;
  distrito_id: string | null;
  slug: string | null;
  stars: number | null;
  distrito?: Distrito; 
  servicios?: Servicio[];
}