import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./login.component.css']
})
export class RegistreComponent implements OnInit {

  forma: FormGroup;
  constructor( public _usuarioService: UsuarioService,
               public _router: Router
    ) { }
  sonIguales( campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if( pass1 === pass2 ) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condition: new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')});
  }
  registrarUsuario() {

    if ( this.forma.invalid){
      return;
    }
    if( !this.forma.value.condition) {
        swal('Importante', 'Debe de aceptar las condiciones', 'warning');
        return;
    }
    console.log('Forma valida: ', this.forma.valid);
    console.log(this.forma);
    const usuario = new Usuario(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    );
    this._usuarioService.crearUsuario( usuario )
    .subscribe( resp => {
      console.log(resp);
      this._router.navigate(['/login']);
    });
  }
}
