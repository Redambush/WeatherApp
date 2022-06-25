import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Station} from "../../entities/station";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-station',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css']
})
export class StationDetailsComponent {
  title = 'meteo-frontend';

  station: Station;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.station = data.stationData;
  }


}
