import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewSolarComponent } from './view-solar/view-solar.component';
import { HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AllocationFormComponent } from './allocation-form/allocation-form.component';
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component'

import { SolarheaterService } from './solarheater.service';
import { VerifyService } from './verify/verify.service';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewSolarComponent,
    AllocationFormComponent,
    ViewPurchaseComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SolarheaterService, VerifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
