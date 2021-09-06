import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

const routes: Routes = [
  { path: 'comercios', component: ComerciosComponent },
  { path: 'productos/:id', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'comercios' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
