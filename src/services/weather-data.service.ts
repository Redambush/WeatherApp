import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../environments/environment.prod";
import {WeatherData} from "../entities/weather-data";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
const API_URL = '/weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  dbPath = "/measures";
  baseUrl = environment.baseUrl;
  weatherData: AngularFireList<WeatherData[]>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.weatherData = db.list(this.dbPath);
  }

  getAll(): AngularFireList<any[]> {
    return this.weatherData;
  }
}
