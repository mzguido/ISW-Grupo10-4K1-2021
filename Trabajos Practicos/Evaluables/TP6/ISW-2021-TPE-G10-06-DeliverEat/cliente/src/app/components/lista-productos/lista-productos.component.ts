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
  id!: string;
  productos: Producto[] = {} as Producto[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private comercioService: ComerciosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.productos = this.comercioService.getProductosDelComercio(this.id);
    console.log(this.productos);
  }
}
