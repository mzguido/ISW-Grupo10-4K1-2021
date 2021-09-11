import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styles: [],
})
export class ItemCarritoComponent implements OnInit {
  @Input() producto: Producto = {} as Producto;

  constructor() {}

  ngOnInit(): void {}
}
