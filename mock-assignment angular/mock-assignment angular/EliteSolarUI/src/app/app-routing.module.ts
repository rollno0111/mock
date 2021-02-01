import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component';
import { ViewSolarComponent } from './view-solar/view-solar.component';


export const routes: Routes = [
  /* Add the routes here as mentioned in QP */
  { path: "", component: ViewSolarComponent },
  { path: "View", component: ViewPurchaseComponent },
  { path: "**", redirectTo: "View", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
