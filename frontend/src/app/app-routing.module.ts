import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityService } from './service/security/security.service';

// Authentication components
import { SignupComponent } from './component/signup/signup.component'; 
import { SigninComponent } from './component/signin/signin.component';

// View compoenents
import { HomeComponent } from './component/home/home.component';
import { TransportationOfferHomeComponent } from './component/transportation-offer/transportation-offer-home/transportation-offer-home.component';
import { ClientHomeComponent } from './component/client/client-home/client-home.component';
import { CustomsHomeComponent } from './component/customs/customs-home/customs-home.component';
import { SenderHomeComponent } from './component/sender/sender-home/sender-home.component';
import { RecipientHomeComponent } from './component/recipient/recipient-home/recipient-home.component';
import { CargoHomeComponent } from './component/cargo/cargo-home/cargo-home.component';
import { OrderHomeComponent } from './component/order/order-home/order-home.component';
import { DriverHomeComponent } from './component/driver/driver-home/driver-home.component';
import { VehicleHomeComponent } from './component/vehicle/vehicle-home/vehicle-home.component';
import { TrailerHomeComponent } from './component/trailer/trailer-home/trailer-home.component';
import { CuratorshipHomeComponent } from './component/curatorship/curatorship-home/curatorship-home.component';

const routes: Routes = [
  {path : "", redirectTo: "home", pathMatch: "full"},

  {path : "home" , component: HomeComponent},

  {path : "auth/signup" , component: SignupComponent},
  {path : "auth/signin" , component: SigninComponent},

  {path: "transportation-offer/home", component: TransportationOfferHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'manager'] }},
  {path: "transportation-offer", redirectTo: "transportation-offer/home", pathMatch: "full"},

  {path: "client/home", component: ClientHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'manager'] }},
  {path: "client", redirectTo: "client/home", pathMatch: "full"},

  {path: "customs/home", component: CustomsHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'manager'] }},
  {path: "customs", redirectTo: "customs/home", pathMatch: "full"},

  {path: "sender/home", component: SenderHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'manager'] }},
  {path: "sender", redirectTo: "sender/home", pathMatch: "full"},

  {path: "recipient/home", component: RecipientHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'manager'] }},
  {path: "recipient", redirectTo: "recipient/home", pathMatch: "full"},

  {path: "cargo/home", component: CargoHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'manager'] }},
  {path: "cargo", redirectTo: "cargo/home", pathMatch: "full"},

  {path: "order/home", component: OrderHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'manager'] }},
  {path: "order", redirectTo: "order/home", pathMatch: "full"},

  {path: "curatorship/home", component: CuratorshipHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'manager'] }},
  {path: "curatorship", redirectTo: "curatorship/home", pathMatch: "full"},

  {path: "driver/home", component: DriverHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'scheduler'] }},
  {path: "driver", redirectTo: "driver/home", pathMatch: "full"},

  {path: "vehicle/home", component: VehicleHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'scheduler'] }},
  {path: "vehicle", redirectTo: "vehicle/home", pathMatch: "full"},

  {path: "trailer/home", component: TrailerHomeComponent, canActivate: [SecurityService], data: { expectedRole: ['admin', 'scheduler'] }},
  {path: "trailer", redirectTo: "trailer/home", pathMatch: "full"},

  {path : "**", redirectTo: "", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }