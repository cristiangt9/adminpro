import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() porcentaje = 50;
  @Input() leyenda = 'Leyenda';
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onChange(nuevo: number){
    if( nuevo > 100) {
      this.porcentaje = 100;
    } else if (nuevo < 0) {
      this.porcentaje = 0;
    }
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }
  menos() {
    if (this.porcentaje > 0) {
      this.porcentaje = this.porcentaje - 5;
      this.cambioValor.emit( this.porcentaje );
      this.txtProgress.nativeElement.focus();
    }
    return;
  }

  mas() {
    if (this.porcentaje < 100) {
      this.porcentaje = this.porcentaje + 5;
      this.cambioValor.emit( this.porcentaje );
      this.txtProgress.nativeElement.focus();
    }
    return;
  }
}
