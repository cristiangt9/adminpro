import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }
  subirArchivo( archivo: File, tipo: string, id: string, token: string ) {
    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id + '?token=' + token;
    return new Promise( (resolve, reject) =>{
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append( 'imagen', archivo, archivo.name);
      xhr.onreadystatechange = function () {
        if ( xhr.readyState === 4) {
            if ( xhr.status === 200) {
              console.log('imagen subida');
              resolve( JSON.parse(xhr.response) );
            } else {
              console.log('Fallo la subida de la imagen');
              reject( xhr.response );
            }
        }
      };
      xhr.open('PUT', url, true);
      xhr.send( formData);
    });

  }
}
