import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComerciosComponent } from './pages/comercios/comercios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';

const routes: Routes = [
  { path: 'comercios', component: ComerciosComponent },
  { path: 'productos/:id', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'detalle-pedido', component: DetallePedidoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'comercios' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
