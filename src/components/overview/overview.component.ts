import {Component} from '@angular/core';
import {Station} from "../../entities/station";
import {MatTableDataSource} from "@angular/material/table";
import {StationDetailsComponent} from "../station-details/station-details.component";
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {StationWeatherComponent} from "../station-weather/station-weather.component";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  title = 'meteo-frontend';
  displayedColumns: string[] = ['ID', 'Location', 'Name', 'Owner', 'Actions'];

  stationsData: Station[] = [
    {ID: "1", Location: "Kraków", Name: "KR-01", Owner: "Michał", Actions: "Open"},
  ];

  dataSource = new MatTableDataSource(this.stationsData);

  constructor(public dialog: MatDialog, private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  openStationWeatherDetails(stationData: Station): void {
    let dialogRef = this.dialog.open(StationWeatherComponent, {
      height: '400px',
      width: '1200px',
      data: {
        stationData: stationData
      }
    });
  }

  openStationInfoDialog(stationData: Station) {
    this.bottomSheet.open(StationDetailsComponent, {
      data: {
        stationData: stationData
      }
    });
  }
}
