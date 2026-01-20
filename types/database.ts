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
  precios: Precio[] | null;
  turnos: Turno[] | null;
  ubicacion: string | null;
  fotos: string[] | null;
  created_at: string;
  distrito_id: string | null;
  slug: string | null;
  stars: number | null;
  distrito?: Distrito; 
  servicios?: Servicio[];
}

export interface Turno {
  descripcion: string;
  duracion_horas: number;
}

export interface Precio {
  tipo: string;
  precio: number;
}