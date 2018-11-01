import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficosComponent } from './graficos/graficos.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/login.guard';
import { ProfileComponent } from './profile/profile.component';


export const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'} },
            { path: 'graficos', component: GraficosComponent, data: { titulo: 'Gráficos'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste del Tema' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

