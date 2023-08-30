import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class DashboardModule { }
