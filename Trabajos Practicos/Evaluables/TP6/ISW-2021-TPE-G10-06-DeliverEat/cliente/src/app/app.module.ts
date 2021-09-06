import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ListaComerciosComponent } from './components/lista-comercios/lista-comercios.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    ComerciosComponent,
    ProductosComponent,
    ListaComerciosComponent,
    ListaProductosComponent,
    NavbarComponent,
    CarritoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
