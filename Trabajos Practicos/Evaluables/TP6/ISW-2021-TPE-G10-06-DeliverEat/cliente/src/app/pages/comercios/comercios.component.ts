import { Component, OnInit } from '@angular/core';
import { Comercio } from 'src/app/interfaces/comercio.interface';
import { ComerciosService } from 'src/app/services/comercios.service';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styles: [],
})
export class ComerciosComponent implements OnInit {
  comercios = [];
  constructor(private comercioService: ComerciosService) {}

  ngOnInit(): void {
    this.comercioService.getComercios().subscribe((res: any) => {
      this.comercios = res;
      console.log(res);
    });
  }
}
