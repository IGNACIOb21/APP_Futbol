import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  //============= Loading ============ 
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  //============= Toast ============

  // Método general para mostrar toast con opciones personalizadas
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // Método específico para mostrar toast con solo un mensaje y duración
  async showToast(message: string, duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom', // Puedes personalizar la posición si lo necesitas
      color: 'dark'       // Puedes personalizar el color si lo necesitas
    });
    toast.present();
  }

  //============= Enruta a cualquier pagina disponible ======
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //============= Guarda un elemento en localstorage ======
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //============= Obtiene un elemento de localstorage ======
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

}
