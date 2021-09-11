import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-cantidad',
  templateUrl: './cantidad.component.html',
  styles: [],
})
export class CantidadComponent implements OnInit {
  @Input() producto: Producto = {} as Producto;
  constructor() {}

  ngOnInit(): void {}
}
