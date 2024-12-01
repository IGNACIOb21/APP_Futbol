import { Component, OnInit, inject } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  playerStats: any = null; // Datos del jugador logueado
  playerId: string = ''; // ID del jugador logueado

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    try {
      // Obtener el ID del jugador logueado desde el servicio
      this.playerId = await this.firebaseService.getLoggedUserId();

      if (this.playerId) {
        // Obtener las estadísticas del jugador
        this.playerStats = await this.firebaseService.getPlayerStats(this.playerId);
        console.log('Estadísticas del jugador:', this.playerStats);
      } else {
        console.warn('No hay un usuario logueado.');
      }
    } catch (error) {
      console.error('Error al obtener las estadísticas del jugador:', error);
    }
  }
}