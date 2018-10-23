import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { PagesModule } from '../pages/pages.module';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajuste = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };
  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjuste();
   }

  guardarAjuste() {
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjuste() {
    if( localStorage.getItem('ajustes') ) {
        this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
        this.aplicarTema( this.ajustes.tema );
    } else {
        console.log( 'Cargando de Ajustes por defecto' );
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema( tema: string ) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjuste();
  }
}
interface Ajuste {
  temaUrl: string;
  tema: string;
}