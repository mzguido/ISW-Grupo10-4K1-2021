import { Component, OnInit } from '@angular/core';
import { Carrito, Producto } from 'src/app/interfaces/producto.interface';
import { ComerciosService } from 'src/app/services/comercios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  productos: Producto[] = {} as Producto[];
  carrito: Carrito = {} as Carrito;
  montoTotal = 0;
  pesoTotal = 0;
  dimensionTotal = 0;

  constructor(
    private comercioService: ComerciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductos();
    this.calcularTotal();
    // this.productos = this.comercioService.getProductosDelComercio(
    //   '613518ca399df09324be7692'
    // );
    console.log(this.productos);
  }

  aumentarCant(prod: Producto): void {
    prod.cantidad++;
    this.calcularSubTotal(prod);
  }
  disminuirCant(prod: Producto): void {
    if (prod.cantidad > 1) {
      prod.cantidad--;
      this.calcularSubTotal(prod);
    }
  }

  calcularSubTotal(prod: Producto): void {
    prod.subTotal = prod.precio * prod.cantidad;

    this.calcularTotal();
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

  eliminarProd(prod: Producto): void {
    this.comercioService.eliminarProducto(prod).subscribe((res) => {
      this.getProductos();
    });
  }

  getProductos() {
    this.comercioService.getCarrito().subscribe((res: Carrito[]) => {
      this.productos = res[0].productos;
      this.carrito = res[0];
      console.log(res);
      this.productos.map((prod) => {
        prod.cantidad = 1;
        prod.subTotal = prod.precio;
      });
      this.calcularTotal();
    });
  }

  irComercio() {
    this.router.navigateByUrl('./comercios');
  }

  continuarCompra() {
    this.comercioService.productosCarrito = this.productos;
    this.comercioService.totalMontoCarrito = this.montoTotal;
    this.router.navigateByUrl('pedido');
  }
}
