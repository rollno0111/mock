import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SolarheaterService } from '../solarheater.service';
/* Import the required modules here */

@Component({
  selector: 'app-allocation-form',
  templateUrl: './allocation-form.component.html',
  styleUrls: ['./allocation-form.component.css']
})
export class AllocationFormComponent implements OnInit {

  errorMessage: string = null;
  successMessage: string = null;

  /* Implement @Input and @Output directives */

  /* Inject appropriate dependencies */
  constructor(private formBuilder: FormBuilder, private service: SolarheaterService) { }
  @Output() loadCard = new EventEmitter();
  @Input() distributor: string;
  allocateForm: FormGroup

  ngOnInit() {
    console.log(this.distributor);

    this.allocateForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      purchaseDate: ["", [Validators.required, validateDate]],
      installationDate: ["", [Validators.required, validateDate]],
      location: ["", [Validators.required]]
    })
  }

  allocateSolar() {
    /* Implement according to the requriement */
    this.errorMessage = null;
    this.successMessage = null;
    this.service.allocate(this.distributor, this.allocateForm.value).subscribe(
      data => {
        this.successMessage = data.message;

      },
      error => {
        this.errorMessage = error.error.message;
        console.log(error);

      }
    )

  }

  loadHeaters() {
    /* Implement according to the requriement */
    this.loadCard.emit(true);
  }

  get name() {
    return this.allocateForm.get("name");
  }
  get purchaseDate() {
    return this.allocateForm.get("purchaseDate");
  }
  get installationDate() {
    return this.allocateForm.get("installationDate");
  }
  get location() {
    return this.allocateForm.get("location");
  }

}

function validateDate(date: FormControl) {
  /* Implement according to the requriement */
  const givenDate = new Date(date.value);
  if (givenDate > new Date())
    return null

  return { dateError: { message: 'Entered date cannot be as past date' } };
}
