import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-estadistica-arbitro',
  templateUrl: './estadistica-arbitro.page.html',
  styleUrls: ['./estadistica-arbitro.page.scss'],
})
export class EstadisticaArbitroPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  players: User[] = []; // Lista de jugadores
  selectedPlayerId: string | null = null; // ID del jugador seleccionado
  evaluation = {
    goles: 0,
    asistencias: 0,
    tarjetasAmarillas: 0,
    tarjetasRojas: 0,
  };

  async ngOnInit() {
    try {
      // Cargar todos los jugadores al iniciar
      const allPlayers = await this.firebaseSvc.getPlayers();
      console.log('Jugadores cargados:', allPlayers);
      this.players = allPlayers;
    } catch (error) {
      console.error('Error al cargar jugadores:', error);
      this.utilsSvc.showToast('No se pudieron cargar los jugadores.');
    }
  }

  // Abrir el formulario de evaluación para un jugador específico
  openEvaluationForm(playerId: string) {
    this.selectedPlayerId = playerId;
  }

  // Cancelar la evaluación y limpiar el formulario
  cancelEvaluation() {
    this.selectedPlayerId = null;
    this.evaluation = { goles: 0, asistencias: 0, tarjetasAmarillas: 0, tarjetasRojas: 0 };
  }

  // Guardar la evaluación del jugador
  async submitEvaluation() {
    if (!this.selectedPlayerId) return;

    try {
      await this.firebaseSvc.updatePlayerStats(this.selectedPlayerId, this.evaluation);
      this.utilsSvc.showToast('Evaluación guardada exitosamente.');
      this.cancelEvaluation(); // Reiniciar el formulario tras guardar
    } catch (error) {
      console.error('Error al guardar la evaluación:', error);
      this.utilsSvc.showToast('No se pudo guardar la evaluación.');
    }
  }
}
