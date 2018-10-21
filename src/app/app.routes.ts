import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages.component';
import { RegistreComponent } from './login/registre.component';

export const routes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistreComponent },
    { path: '**', component: NopagefoundComponent},
];