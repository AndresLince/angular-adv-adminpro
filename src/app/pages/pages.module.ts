import { ComponentsModule } from './../components/components.module';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [    
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
  ],
  imports: [   
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    
  ],
  exports: [    
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent
  ]
})
export class PagesModule { }
