import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {
  @Input() ChartLabels: string[] = [];
  @Input() ChartData: number[] = [];
  @Input() ChartType = '';
  @Input() leyenda = '';

  private doughnutChartColours: any[] = [
    { backgroundColor: [
      '#b8436d',
      '#00d9f9',
      '#a4c73c',
      '#a4add3']
     }]; 
   constructor() { }

  ngOnInit() {
  }
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
