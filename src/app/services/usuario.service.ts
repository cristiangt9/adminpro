import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor( public _http: HttpClient,
               public _router: Router
    ) {
    console.log('Servico de usuarios Listo!!');
    this.cargarStorage();
   }
  cargarStorage(){
    if( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
  }
  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
  }
  guardarStorage( id, token, usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this._http.post( url, {token}).pipe( map( (res: any) => {
      this.guardarStorage( res.id, res.token, res.usuario);
      return true;
    }));
  }
  login( email: string, password: string, recuerdame: Boolean = false) {
    if (recuerdame) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this._http.post( url, {email, password}).pipe( map((res: any) => {
      this.guardarStorage(res.id, res.token, res.usuario);
      return true;
    }));
  }
   crearUsuario( usuario: Usuario) {
     console.log('creando usuario....', usuario);
     const url = URL_SERVICIOS + '/usuario';
     return this._http.post(url, usuario).pipe( map( (res: any) => {
      swal('Usuario Creado', usuario.email, 'success');
      return res.usuario;
     }));
   }
}
