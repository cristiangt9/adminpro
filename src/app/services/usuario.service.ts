import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from './subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor( public _http: HttpClient,
               public _router: Router,
               public _subirArchivo: SubirArchivoService
    ) {
    console.log('Servico de usuarios Listo!!');
    this.cargarStorage();
   }
  cargarStorage(){
    if ( localStorage.getItem('token')) {
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
     const url = URL_SERVICIOS + '/usuario';
     return this._http.post(url, usuario).pipe( map( (res: any) => {
      swal('Usuario Creado', usuario.email, 'success');
      return res.usuario;
     }));
   }
  actualizarUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this._http.put(url, usuario).pipe(map((res: any) => {
      if ( usuario._id === this.usuario._id) {
        this.guardarStorage( res.id, this.token, res.usuario );
      }
      swal('Usuario Actualizado', usuario.nombre, 'success');
      return true;
    }));
  }
  cambiarImagen( archivo: File, id: string) {
    this._subirArchivo.subirArchivo( archivo, 'usuarios', id, this.token).then( (resp: any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen Actualizada', this.usuario.nombre, 'success');
      this.guardarStorage( id, this.token, this.usuario);
    }).catch( resp => {
      console.log(resp);
    });
  }
  cargarUsuarios( desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this._http.get(url);
  }
  buscarUsuarios( busqueda ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + busqueda;
    return this._http.get(url).pipe( map((res: any) => res.usuarios));
  }
  borrarUsuario( id: string ) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this._http.delete(url).pipe(map((res: any) => swal('Usuario Eliminado', res.usuarios.nombre, 'success')));
  }
}
