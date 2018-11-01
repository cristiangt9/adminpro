import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    console.log('Modal listo');
  }
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }
  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this._modalUploadService.id);
  }
  cerraModal(){
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.cerrarModal();
    this._modalUploadService.notification.emit( true );
  }
}
