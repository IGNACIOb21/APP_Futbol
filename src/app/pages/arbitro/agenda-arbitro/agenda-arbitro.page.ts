import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Partido } from 'src/app/models/partido';
@Component({
  selector: 'app-agenda-arbitro',
  templateUrl: './agenda-arbitro.page.html',
  styleUrls: ['./agenda-arbitro.page.scss'],
})
export class AgendaArbitroPage implements OnInit {

  partidos: Partido [] = []; // Lista para almacenar partidos

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.cargarPartidos(); // Cargar los partidos al inicializar la página
  }

  async cargarPartidos() {
    try {
      this.partidos = await this.firebaseService.getAllPartidos(); // Reutiliza el método del servicio
    } catch (error) {
      console.error('Error al cargar partidos:', error);
    }

}
}