export interface Partido {
  id?: string;          // ID único del partido (opcional porque se genera al crearlo)
  creadorId: string;    // ID del jugador que creó el partido
  fecha: string;        // Fecha del partido (en formato "YYYY-MM-DD")
  hora: string;         // Hora del partido (en formato "HH:mm")
  ubicacion: string;    // Ubicación del partido
  jugadores: string[];  // Lista de IDs de jugadores que se unieron
  finalizado: boolean;  // Estado del partido (true si está finalizado)
}
