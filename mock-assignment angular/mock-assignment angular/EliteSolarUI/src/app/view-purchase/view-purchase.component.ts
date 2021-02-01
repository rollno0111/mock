import { Component, OnInit } from '@angular/core';
import { SolarheaterService } from '../solarheater.service';
/* Import the required modules */

@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.css'],
})
export class ViewPurchaseComponent implements OnInit {
  solarHeaterArray: any[] = [];
  distributorArray: any[] = [];
  tableData: any[] = [];
  errorMessage: string = null;
  selectedHeater: string = '';

  /* Inject neccessary dependencies */
  constructor(private service: SolarheaterService) {}

  ngOnInit() {
    /* implement according to requirement */
    this.loadview();
  }

  loadview() {
    /* implement according to requirement */
    this.solarHeaterArray = [];
    this.distributorArray = [];
    this.errorMessage = null;
    this.service.viewpurchase().subscribe(
      (data) => {
        this.solarHeaterArray = data;
        for (let item of data) {
          this.distributorArray.push(item.distributorName);
        }
        console.log(data);

        console.log(this.distributorArray);
      },
      (error) => {
        this.errorMessage = 'Unable to load view';
      }
    );
  }


  displayTable() {
    /* implement according to requirement */
   
    this.tableData = [];
    this.errorMessage = null;
    this.solarHeaterArray.forEach((item)=>{
      if (item.distributorName == this.selectedHeater){
        this.tableData=item.customer;
        
      }
    })
    if(this.tableData.length==0){
      this.errorMessage="No sale was done by "+this.selectedHeater;
      this.selectedHeater=null;
    }
    console.log(this.tableData);
  }
}
