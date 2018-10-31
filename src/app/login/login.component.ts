import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email: string;

  auth2: any;

  constructor( public _router: Router,
               public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '640524799651-3kibgb8178ua918hpr3m5svl3f14t1ah.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingin(document.getElementById('btnGoogle'));
    });
  }

  attachSingin( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this._usuarioService.loginGoogle( token ).subscribe( res => {
        window.location.href = '/dashboard';
        console.log(res);
      });
    });
  }

// {"web":{"client_id":"640524799651-3kibgb8178ua918hpr3m5svl3f14t1ah.apps.googleusercontent.com","project_id":"my-project-1533836994703","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://www.googleapis.com/oauth2/v3/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"B9fB23LQF-mNS6W6m5HonTJd","javascript_origins":["http://localhost:3000","http://localhost:4200"]}}
  ingresar( forma: NgForm) {
    // this._router.navigate(['/dashboard']);
    console.log(forma.valid);
    console.log(forma.value);
    if(forma.invalid) {
      return;
    }
    this._usuarioService.login( forma.value.email, forma.value.password, this.recuerdame)
    .subscribe( resp => this._router.navigate(['/dashboard']));
  }
}
