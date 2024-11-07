import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '50b6244c1a9f89f21007366cbae26c0b';  // Reemplaza esta clave con la correcta
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    // Corrige la URL para evitar duplicación de parámetros
    return this.http.get(`${this.apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
  }
}
