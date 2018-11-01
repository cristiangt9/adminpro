import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  n = 5;
  cargando = true;

  constructor( public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notification.subscribe( () => this.cargarUsuarios());
  }
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      console.log(this.usuarios);
      this.cargando = false;

    });
  }
  siguiente(n: number) {
    this.desde += n;
    this.cargarUsuarios();
  }
  anterior(n: number) {
    this.desde -= n;
    this.cargarUsuarios();
  }
  buscarUsuarios( busqueda: string) {
    console.log(busqueda.length);
    if (busqueda.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    console.log(busqueda);
    this._usuarioService.buscarUsuarios(busqueda)
    .subscribe( (usuarios: Usuario[]) => this.usuarios = usuarios);
  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('Usuario NO eliminado', 'No puede eliminar su propio usuario', 'error');
      return;
    }
    swal({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then( borrar => {
      if ( borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(() => this.cargarUsuarios());
      }
      return;
    });
  }
  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario( usuario ).subscribe();
  }
  modal(usuario: Usuario) {
    console.log(usuario);
    this._modalUploadService.subirImagen('usuarios', usuario._id);
  }
}
