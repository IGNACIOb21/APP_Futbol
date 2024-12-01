import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getFirestore, setDoc, doc, getDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { User } from 'firebase/auth';
import {  updateDoc, Firestore, collection, docData } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class jugador {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  constructor(private firebase : FirebaseService,
    private firestore: Firestore
  ) {}

  
  // Función para registrar la evaluación del jugador
  async evaluatePlayer(
    id: string,
    goles: number,
    asistencia: number,
    tarjetaAmarilla: number,
    tarjetaRoja: number
  ): Promise<void> {
    // Referencia al documento del jugador
    const playerRef = doc(this.firestore, `players/${id}`);

    // Calcular evaluación del jugador
    const evaluation = this.calculatePlayerEvaluation(goles, asistencia, tarjetaAmarilla, tarjetaRoja);

    // Actualizar los datos del jugador en Firestore
    await updateDoc(playerRef, {
      goles,
      asistencia,
      tarjetaAmarilla,
      tarjetaRoja,
      evaluation,
    });
  }

  // Función para calcular la evaluación
  calculatePlayerEvaluation(
    goles: number,
    asistencia: number,
    tarjetaAmarilla: number,
    tarjetaRoja: number
  ): string {
    let evaluation = 'Needs Improvement';

    if (goles >= 2 && asistencia >= 2) {
      evaluation = 'Excellent Player';
    } else if (goles >= 1 && asistencia >= 1) {
      evaluation = 'Good Player';
    } else if (tarjetaAmarilla > 2 || tarjetaRoja > 0) {
      evaluation = 'Disciplinary Issues';
    }

    return evaluation;
  }
}