import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Station} from "../../entities/station";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {WeatherDataService} from "../../services/weather-data.service";
import {map} from "rxjs";
import {WeatherData} from "../../entities/weather-data";

@Component({
  selector: 'app-station',
  templateUrl: './station-weather.component.html',
  styleUrls: ['./station-weather.component.css']
})
export class StationWeatherComponent implements OnInit {
  title = 'meteo-frontend';
  stationData: Station;
  weatherData: any;
  displayedColumns: string[] = ['humidity', 'pm2.5', 'pm10', 'rain', 'temperature', 'timestamp'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private weatherDataService: WeatherDataService,
              private db: AngularFireDatabase) {
    this.stationData = data.stationData;
    this.weatherData = [];
  }

  ngOnInit() {
    this.retrieveMeasurements();
  }

  private retrieveMeasurements() {
    this.weatherDataService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
            ({key: c.payload.key, value: c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.weatherData = [];
      data.forEach(dataObject => {
        // @ts-ignore
        dataObject.value = JSON.parse(dataObject.value);
        // @ts-ignore
        dataObject.value.timestamp = new Date(dataObject.value.timestamp * 1000);
        this.weatherData.push(dataObject)
      })
      this.weatherData = data;
    });
  }
}
