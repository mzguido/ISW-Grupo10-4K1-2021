import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comercio } from '../interfaces/comercio.interface';
import { Carrito, Pedido, Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ComerciosService {
  public url = 'http://localhost:5000/';
  public comercios: Comercio[] = {} as Comercio[];
  public comercioSelec: Comercio = {} as Comercio;
  public productos: Producto[] = {} as Producto[];
  public productosCarrito: Producto[] = {} as Producto[];
  public totalMontoCarrito = 0;
  public carrito: Carrito = {} as Carrito;
  public pedido: Pedido = {} as Pedido;

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

  agregarProducto(idComercio: string, producto: Producto) {
    console.log(this.url + `cart/add/${producto._id}`);
    return this.http.post(this.url + `cart/add/${idComercio}`, producto);
  }

  eliminarProducto(producto: Producto) {
    console.log(this.url + `cart/remove/${producto._id}`);
    return this.http.post(this.url + `cart/remove/${producto._id}`, producto);
  }

  getCarrito() {
    return this.http.get<Carrito[]>(this.url + `cart`);
  }
  // getCarritoFalse() {
  //   return this.http.get<Carrito>(this.url + `cart`);
  // }
}
