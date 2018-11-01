import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo: string;
  public id: string;
  public notification = new EventEmitter<boolean>();
  constructor() {
    console.log('ModalUploadService funcionando!!');
   }
  cerrarModal(){
    this.tipo = null;
    this.id = null;

  }
  subirImagen( tipo: string, id: string) {
    this.tipo = tipo;
    this.id = id;
  }
}
