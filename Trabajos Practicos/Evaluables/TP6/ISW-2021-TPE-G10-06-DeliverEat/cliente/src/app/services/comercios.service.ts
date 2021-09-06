import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comercio } from '../interfaces/comercio.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ComerciosService {
  public url = 'http://localhost:5000/';
  public comercios: Comercio[] = {} as Comercio[];
  public comercioSelec: Comercio = {} as Comercio;
  public productos: Producto[] = {} as Producto[];
  constructor(private http: HttpClient) {
    console.log('service ready');
    this.initService();
  }

  initService() {
    this.getComercios().subscribe((res: Comercio[]) => {
      this.comercios = res;
    });
  }

  getComercios() {
    return this.http.get<Comercio[]>(this.url + 'comercios');
  }

  getProductosDelComercio(id: string) {
    if (this.comercioSelec._id != id) {
      this.getComercios().subscribe((res: Comercio[]) => {
        this.comercios = res;
        console.log('holis');
        for (const comercio of this.comercios) {
          if (comercio._id == id) {
            this.comercioSelec = comercio;
            console.log(this.comercioSelec);
            break;
          }
        }
        return this.comercioSelec.productos;
      });
    }
    return this.comercioSelec.productos;
  }

  setComercioSeleccionado(com: Comercio) {
    this.comercioSelec = com;
  }
}
