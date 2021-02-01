import { Component, OnInit } from '@angular/core';
import { VerifyService } from './verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(public service: VerifyService) { }

  ngOnInit() { }

  reportObj: any;
  errorMsg: String;
  flag: boolean = true;
  dbMessage: String;

  evaluate() {
    console.log("called");

    this.errorMsg = null;
    this.reportObj = null;
    this.service.getData().subscribe((response) => {
      this.flag = false;
      this.reportObj = response;
      localStorage.setItem("reportObj", JSON.stringify(response));
      this.report(response);
      setTimeout(() => {
        response.forEach(element => {
          element.percent = this.calculatePercent(element.suitName, element.totalNoOfTestCases, element.noOfTestCasesPassed);
        });
      }, 1000)
    }, (err) => { this.errorMsg = err.error.message; this.flag = false; })
  }

  showTestReport() {
    this.flag = false;
    this.reportObj = JSON.parse(localStorage.getItem("reportObj"));
    this.report(this.reportObj);
    setTimeout(() => {
      this.reportObj.forEach(element => {
        element.percent = this.calculatePercent(element.suitName, element.totalNoOfTestCases, element.noOfTestCasesPassed);
      });
    }, 1000)
  }

  report(obj) {
    obj.forEach(value => {
      if (value.failTest.length == 0) {
        value.failTest.push("Passed")
      }
    });
  }

  setColor(status) {
    return (status === 'Passed') ? "green" : "red"
  }

  calculatePercent(id, total, pass) {
    let target = document.getElementById(id);
    let percent = Math.round((pass / total) * 100);
    target.setAttribute("style", `width:${percent}%`);
    target.setAttribute("aria-valuenow", String(percent));
    if (percent > 90) {
      target.setAttribute("class", "progress-bar bg-success progress-bar-striped progress-bar-animated")
    }
    else if (percent > 50) {
      target.setAttribute("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated")
    }
    else {
      target.setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated")
    }
    return percent
  }

  setUpDb() {
    this.dbMessage = ""
    this.service.loadDatabse().subscribe(
      (data) => {
        this.dbMessage = data.message
      },
      (err) => {
        this.dbMessage = err.error.message
      })
  }
}
