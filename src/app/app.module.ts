import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficosComponent } from './pages/graficos/graficos.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { RegistreComponent } from './login/registre.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
    ProgressComponent,
    GraficosComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PagesComponent,
    RegistreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
