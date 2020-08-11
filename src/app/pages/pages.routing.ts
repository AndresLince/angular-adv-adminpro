import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './../guards/auth.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [ 
    {
        path:'dashboard',component:PagesComponent,
        canActivate:[AuthGuard],
        children:[
          {path:'',component:DashboardComponent,data:{title:'Dashboard'}},
          {path:'progress',component:ProgressComponent,data:{title:'Progress'}},
          {path:'grafica1',component:Grafica1Component,data:{title:'Graficas'}},  
          {path:'account-settings',component:AccountSettingsComponent,data:{title:'Account Settings'}},   
          {path:'promesas',component:PromesasComponent,data:{title:'Promesas'}},   
          {path:'rxjs',component:RxjsComponent,data:{title:'RXJS'}},    
          {path:'perfil',component:PerfilComponent,data:{title:'Perfil de usuario'}},             
          //Mantenimientos
          {path:'usuarios',component:UsuariosComponent,data:{title:'Usuarios de aplicacion'}},             
        ]
    },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
