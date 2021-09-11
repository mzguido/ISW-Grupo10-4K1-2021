import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ComerciosService } from 'src/app/services/comercios.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styles: [],
})
export class ListaProductosComponent implements OnInit {
  idComercio!: string;
  productos: Producto[] = {} as Producto[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private comercioService: ComerciosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idComercio = params['id'];
    });
    this.productos = this.comercioService.getProductosDelComercio(
      this.idComercio
    );
    console.log(this.productos);
  }

  agregarProducto(producto: Producto): void {
    this.comercioService
      .agregarProducto(this.idComercio, producto)
      .subscribe((res) => console.log(res));
  }
}
