import { Component, OnInit,inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home-arbitro',
  templateUrl: './home-arbitro.page.html',
  styleUrls: ['./home-arbitro.page.scss'],
})
export class HomeArbitroPage implements OnInit {

  utilsSvc = inject(UtilsService);
  weatherService = inject(WeatherService);

  weatherData: any;
  hourlyForecast: any[] = [];

  ngOnInit() {
    this.getLocationAndWeather();
  }

  async getLocationAndWeather() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe(data => {
        this.weatherData = data;
      });

      this.weatherService.getHourlyForecast(latitude, longitude).subscribe((forecastData: any) => {
        this.hourlyForecast = forecastData.list.slice(0, 6).map(forecast => ({
          dt: forecast.dt,
          main: { temp: forecast.main.temp },
          weather: forecast.weather // Esto incluye el icono correcto
        }));
      });
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
      this.utilsSvc.showToast('Error al obtener la ubicación.', 2000);
    }
  }

  // Método para formatear la hora
  formatHour(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.getHours() + ':00';
  }

}