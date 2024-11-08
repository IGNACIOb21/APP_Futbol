import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  weatherService = inject(WeatherService);

  weatherData: any;

  ngOnInit() {
    this.getLocationAndWeather();
  }

  //===== Obtener ubicación y clima en tiempo real =====
  async getLocationAndWeather() {
    try {
      // Intentar obtener la ubicación
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
  
      // Obtener los datos del clima usando las coordenadas
      this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe(data => {
        this.weatherData = data;
      });
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
  
      // Manejo específico del error de geolocalización
      if (error.code === 1) {
        // El usuario denegó el permiso
        this.utilsSvc.showToast('Permiso de geolocalización denegado. Por favor, habilítalo en la configuración.', 3000);
      } else if (error.code === 2) {
        // La ubicación no está disponible (por ejemplo, GPS desactivado)
        this.utilsSvc.showToast('No se pudo obtener la ubicación. Verifica la conexión GPS.', 3000);
      } else if (error.code === 3) {
        // Tiempo de espera agotado
        this.utilsSvc.showToast('Tiempo de espera agotado al obtener la ubicación.', 3000);
      } else {
        // Otros tipos de error
        this.utilsSvc.showToast('Error desconocido al obtener la ubicación.', 3000);
      }
    }
  }

  //===== Cerrar Sesión ======
  signOut() {
    this.firebaseSvc.signOut();
  }
}
