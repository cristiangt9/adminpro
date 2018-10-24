import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  constructor( private _router: Router,
              private _title: Title,
              private _meta: Meta
    ) {
    this.getDataRoute().subscribe(event => {
      this.titulo = event.titulo;
      this._title.setTitle(event.titulo);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: `Esta pagina contiene informacion de ${ event.titulo}`
      };
      _meta.updateTag( metaTag);
    } );
  }

  ngOnInit() {
  }
  
  getDataRoute() {
    return this._router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.data.hasOwnProperty('titulo')),
      map(event => event.snapshot.data)
    );
  }
}
