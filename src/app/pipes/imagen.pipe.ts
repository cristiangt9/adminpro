import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = URL_SERVICIOS + '/imagen';
    if ( !img ) {
      return url + '/usuarios/xxx';
    }
    if ( img.indexOf('https') >= 0) {
      return img;
    }
    switch ( tipo ) {
      case 'usuarios':
       url += '/usuarios/' + img;
      break;

      case 'medicos':
       url += '/medicos/' + img;
      break;

      case 'hospitales':
       url += '/hospitales/' + img;
      break;

      default:
        url += '/usuarios/xxx';
        console.log( 'tipo de imagen no exite, debe ser: usuarios, medicos u hospitales');
      break;
    }
    return url;
  }

}
