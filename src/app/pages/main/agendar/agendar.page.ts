import { Component, OnInit } from '@angular/core';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de tener este servicio
import { UtilsService } from 'src/app/services/utils.service';
import { Partido } from 'src/app/models/partido';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit  {
  

  partido: Partial<Partido> = {
    fecha: '',      // Inicia vacío
    hora: '',       // Inicia vacío
    ubicacion: '',  // Inicia vacío
    jugadores: [],  // Lista vacía de jugadores
    finalizado: false // Por defecto, el partido no está finalizado
  };
  

  constructor(
    private firebaseService: FirebaseService, // Para obtener el usuario logueado
    private utilsSvc: UtilsService // Para mostrar mensajes
  ) {}

  
  userId: string | null = null;

ngOnInit() {
  this.obtenerUserId();
  this.cargarPartidos();
}

async obtenerUserId() {
  this.userId = await this.firebaseService.getLoggedUserId();
}

  async cargarPartidos() {
    try {
      this.partidos = await this.firebaseService.getAllPartidos();
    } catch (error) {
      console.error('Error al cargar partidos:', error);
    }
  }

  async agendarPartido() {
    try {
    // Obtiene el ID del usuario autenticado
    const userId = await this.firebaseService.getLoggedUserId();
    if (!userId) {
      console.error('No se encontró un usuario autenticado');
      return;
    }
  
    // Crea un nuevo objeto de partido
    const nuevoPartido: Partido = {
      creadorId: userId,             // El creador del partido es el usuario actual
      fecha: this.partido.fecha,     // Toma la fecha del formulario
      hora: this.partido.hora,       // Toma la hora del formulario
      ubicacion: this.partido.ubicacion, // Toma la ubicación del formulario
      jugadores: [userId],           // Agrega al creador como el primer jugador
      finalizado: false              // Por defecto, no está finalizado
    };
  
    
      // Genera un ID único para el partido y lo guarda en Firestore
      const partidoId = `${Date.now()}_${userId}`; // Ejemplo de ID único
      await this.firebaseService.setDocument(`partidos/${partidoId}`, { id: partidoId, ...nuevoPartido });
      console.log('Partido agendado correctamente');
    } catch (error) {
      console.error('Error al agendar el partido:', error);
    }
  }


  partidos: Partido[] = []; // Array para almacenar los partidos


  async unirseAPartido(partido: Partido) {
    try {
      // Obtén el ID del usuario autenticado
      const userId = await this.firebaseService.getLoggedUserId();
      if (!userId) {
        console.error('No se encontró un usuario autenticado');
        return;
      }
  
      // Verifica si el usuario ya está en la lista de jugadores
      if (partido.jugadores.includes(userId)) {
        console.log('El usuario ya está registrado en este partido');
        return;
      }
  
      // Verifica si hay espacio disponible (máximo 11 jugadores)
      if (partido.jugadores.length >= 11) {
        console.log('El partido ya está lleno');
        return;
      }
  
      // Agregar el ID del usuario a la lista de jugadores
      partido.jugadores.push(userId);
  
      // Actualizar el partido en Firestore
      await this.firebaseService.setDocument(`partidos/${partido.id}`, partido);
      console.log('Usuario unido al partido correctamente');
    } catch (error) {
      console.error('Error al unirse al partido:', error);
    }
  }
  

async obtenerPartidos() {
  try {
    const snapshot = await this.firebaseService.getDocument('partidos'); // Cambia a tu método para obtener todos
    this.partido = snapshot; // Asigna los partidos al array
  } catch (error) {
    console.error('Error al obtener los partidos:', error);
  }
}


async eliminarPartido(partido: Partido) {
  try {
    const userId = await this.firebaseService.getLoggedUserId();
    if (!userId) {
      this.utilsSvc.showToast('No se pudo obtener el usuario autenticado', 2000);
      return;
    }

    if (partido.jugadores[0] !== userId) {
      this.utilsSvc.showToast('Solo el creador del partido puede eliminarlo.', 2000);
      return;
    }

    // Usa el servicio para eliminar
    await this.firebaseService.deleteDocument(`partidos/${partido.id}`);

    this.partidos = this.partidos.filter(p => p.id !== partido.id);

    this.utilsSvc.showToast('Partido eliminado con éxito', 2000);
  } catch (error) {
    console.error('Error al eliminar el partido:', error);
    this.utilsSvc.showToast('Hubo un error al intentar eliminar el partido', 2000);
  }
}

}


  

