import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [ ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settingsService: SettingsService
  ) { }

  ngOnInit() { this.colocarCheck();
  }

  cambiarColor( color: string, link: any) {
    this.aplicarCheck( link );
    // const url = `assets/css/colors/${ color }.css`;
    // this._document.getElementById('tema').setAttribute('href', url );
    // this.settingsService.ajustes.tema = color;
    // this.settingsService.ajustes.temaUrl = url;

    // this.settingsService.guardarAjuste();
    this.settingsService.aplicarTema( color );
  }
  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }
  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.settingsService.ajustes.tema;
    for (let ref of selectores) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
