import { Component, OnInit } from '@angular/core';
import { Comercio } from 'src/app/interfaces/comercio.interface';
import { ComerciosService } from 'src/app/services/comercios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-comercios',
  templateUrl: './lista-comercios.component.html',
  styles: [],
})
export class ListaComerciosComponent implements OnInit {
  comercios?: Comercio[];

  constructor(
    private comercioService: ComerciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comercioService.getComercios().subscribe((res: any) => {
      this.comercios = res;
      console.log(res);
    });
  }

  verProductos(com: Comercio) {
    this.comercioService.setComercioSeleccionado(com);
    this.router.navigate(['/productos', com._id]);
  }
}
