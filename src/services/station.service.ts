import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../environments/environment.prod";
import {Station} from "../entities/station";

const API_URL = '/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.baseUrl + API_URL);
  }

  public getStationById(stationId: string): Observable<Station> {
    return this.http.get<Station>(this.baseUrl + API_URL + '/' + stationId);
  }
}
