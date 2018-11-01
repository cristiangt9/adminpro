import { Component, OnInit, NgModule } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
// @NgModule({
//     providers: [SidebarService],
// })
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor( public _sidebarService: SidebarService,
               public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }
  logout() {
    this._usuarioService.logout();
  }

}
