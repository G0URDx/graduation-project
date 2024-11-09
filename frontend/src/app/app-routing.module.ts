import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './component/signup/signup.component'; 
import { SigninComponent } from './component/signin/signin.component'; 
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path : "", redirectTo: "home", pathMatch: "full"},
  {path : "home" , component: HomeComponent},
  {path : "auth/signup" , component: SignupComponent},
  {path : "auth/signin" , component: SigninComponent},
  {path : "**", redirectTo: "", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }