import { Component, OnInit } from '@angular/core';
import { SolarheaterService } from '../solarheater.service';
/* Import the required modules here */

@Component({
  selector: 'app-view-solar',
  templateUrl: './view-solar.component.html',
  styleUrls: ['./view-solar.component.css']
})
export class ViewSolarComponent implements OnInit {

  public cardData: any[] = []
  public selectedSolar: string = null;
  public errorMessage: string = null


  /* Inject neccessary dependencies */
  constructor(private service: SolarheaterService) { }

  ngOnInit() {
    /* implement according to requirement */
    this.loadview();
  }


  loadview() {
    /* implement according to requirement */
    this.cardData = [];
    this.errorMessage = null;
    this.service.dashboardData().subscribe((data) => {
      this.cardData = data; console.log(data);
    }, error => { this.errorMessage = "Unable to load view" })
  }

  loadForm(name: string) {
    /* implement according to requirement */
    this.selectedSolar = name;
  }

  loadSolarHeaters() {
    /* implement according to requirement */
    this.selectedSolar = null;
  }
}
