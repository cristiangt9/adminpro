import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficosComponent } from './graficos/graficos.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routes';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        GraficosComponent,
        NopagefoundComponent,
        PagesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(pagesRoutes)
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraficosComponent,
        NopagefoundComponent,
        PagesComponent,
        RouterModule
    ],
    providers: [],
})
export class PagesModule { } 