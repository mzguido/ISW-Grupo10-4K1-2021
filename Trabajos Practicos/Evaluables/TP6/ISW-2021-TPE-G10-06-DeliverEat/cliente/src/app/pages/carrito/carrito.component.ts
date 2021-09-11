import { Component, OnInit } from '@angular/core';
import { Carrito, Producto } from 'src/app/interfaces/producto.interface';
import { ComerciosService } from 'src/app/services/comercios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: [],
})
export class CarritoComponent implements OnInit {
  productos: Producto[] = {} as Producto[];
  carrito: Carrito = {} as Carrito;
  montoTotal = 0;

  constructor(private comercioService: ComerciosService) {}

  ngOnInit(): void {
    this.getProductos();
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
    for (const prod of this.productos) {
      this.montoTotal += prod.subTotal;
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
      console.log(res);
      this.productos.map((prod) => {
        prod.cantidad = 1;
        prod.subTotal = 0;
      });
    });
  }
}
