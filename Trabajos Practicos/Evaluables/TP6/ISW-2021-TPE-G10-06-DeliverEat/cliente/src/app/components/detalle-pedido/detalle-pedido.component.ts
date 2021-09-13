import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Carrito,
  Pedido,
  Producto,
} from 'src/app/interfaces/producto.interface';
import { ComerciosService } from 'src/app/services/comercios.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css'],
})
export class DetallePedidoComponent implements OnInit {
  productos: Producto[] = {} as Producto[];
  carrito: Carrito = {} as Carrito;
  montoTotal = 0;
  pesoTotal = 0;
  dimensionTotal = 0;
  pedido: Pedido = {} as Pedido;
  constructor(
    private comercioService: ComerciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productos = this.comercioService.productosCarrito;
    this.montoTotal = this.comercioService.totalMontoCarrito;
    this.pedido = this.comercioService.pedido;
  }

  calcularTotal() {
    this.montoTotal = 0;
    this.pesoTotal = 0;
    this.dimensionTotal = 0;
    for (const prod of this.productos) {
      this.montoTotal += prod.subTotal;
      this.pesoTotal += parseFloat(prod.peso) * prod.cantidad;
      this.dimensionTotal += prod.dimension * prod.cantidad;
    }
  }
  finalizarCompra() {
    this.router.navigateByUrl('comercios');
  }
  cancelar() {
    this.router.navigateByUrl('comercios');
  }
}
