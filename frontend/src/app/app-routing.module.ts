import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Authentication components
import { SignupComponent } from './component/signup/signup.component'; 
import { SigninComponent } from './component/signin/signin.component';

// View compoenents
import { HomeComponent } from './component/home/home.component';
import { TransportationOfferHomeComponent } from './component/transportation-offer/transportation-offer-home/transportation-offer-home.component';
import { ClientHomeComponent } from './component/client/client-home/client-home.component';

const routes: Routes = [
  {path : "", redirectTo: "home", pathMatch: "full"},

  {path : "home" , component: HomeComponent},

  {path : "auth/signup" , component: SignupComponent},
  {path : "auth/signin" , component: SigninComponent},

  {path: "transportation-offer/home", component: TransportationOfferHomeComponent},
  {path: "transportation-offer", redirectTo: "transportation-offer/home", pathMatch: "full"},

  {path: "client/home", component: ClientHomeComponent},
  {path: "client", redirectTo: "client/home", pathMatch: "full"},

  {path : "**", redirectTo: "", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }