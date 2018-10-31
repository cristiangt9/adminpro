import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( public _usuarioService: UsuarioService,
               public _router: Router
    ) {}
  canActivate(): boolean {
    if( this._usuarioService.estaLogueado() ) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      console.log('Login Guard BLOQUEA');
      this._router.navigate(['/login']);
      return false;

    }
  }
}
