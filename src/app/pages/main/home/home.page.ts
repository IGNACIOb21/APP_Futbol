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
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe(data => {
        this.weatherData = data;
      });
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
      // Manejo de error, por ejemplo, mostrar mensaje al usuario
      this.utilsSvc.showToast('Error al obtener la ubicación.');
    }
  }

  //===== Cerrar Sesión ======
  signOut() {
    this.firebaseSvc.signOut();
  }
}
