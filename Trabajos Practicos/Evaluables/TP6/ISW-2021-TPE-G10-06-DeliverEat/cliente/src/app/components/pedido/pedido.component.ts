import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/producto.interface';
import { ComerciosService } from 'src/app/services/comercios.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  montoTotal = this.comercioService.totalMontoCarrito;
  submitted = false;
  pedido: Pedido = {} as Pedido;
  pedidoValido = false;

  FormPedido: FormGroup = this.fb.group({
    calle: ['', [Validators.required]],
    numero: ['', [Validators.required, Validators.maxLength(4)]],
    ciudad: [, [Validators.required]],
    referencia: ['', [Validators.maxLength(280)]],
    formaPago: ['efectivo', []],
    monto: [, [Validators.required, Validators.min(this.montoTotal)]],
    // numeroTarjeta: [, [Validators.pattern('^4[0-9]{12}(?:[0-9]{3})?$')]],
    numeroTarjeta: [],
    cvc: [],
    fechaTarjeta: [this.getMesAnioActual()],
    prioridadEntrega: ['antesPosible'],
    // fechaEntrega: [new Date().toISOString().substring(0, 16)],
    fechaEntrega: [this.getFechaHoraActual().toISOString().substring(0, 16)],

    // fechaEntrega: ['2021-09-13T03:39'],
  });
  constructor(
    private fb: FormBuilder,
    private comercioService: ComerciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.FormPedido);
    this.montoTotal = this.comercioService.totalMontoCarrito;
    this.onChanges();
  }

  onChanges(): void {
    this.FormPedido.valueChanges.subscribe((val) => {
      // console.log(val);
      // console.log(this.FormPedido.controls['numeroTarjeta'].value);
      // console.log(this.FormPedido.controls['numeroTarjeta'].valid);
    });

    this.FormPedido.controls.formaPago.valueChanges.subscribe((val) => {
      console.log(val);
      this.FormPedido.updateValueAndValidity();
      if (val === 'tarjetaCredito') {
        this.FormPedido.controls.monto.clearValidators();
        this.FormPedido.controls.monto.markAsUntouched();
        this.FormPedido.controls.monto.updateValueAndValidity();

        this.FormPedido.controls.numeroTarjeta.setValidators([
          Validators.pattern('^4[0-9]{15,15}$'),
          Validators.required,
        ]);
        this.FormPedido.controls.numeroTarjeta.updateValueAndValidity();

        this.FormPedido.controls.cvc.setValidators([
          Validators.required,
          // Validators.min(100),
          // Validators.max(999),
          Validators.maxLength(3),
          Validators.minLength(3),
          Validators.pattern('[0-9]*'),
        ]);
        this.FormPedido.controls.cvc.updateValueAndValidity();

        this.FormPedido.controls.fechaTarjeta.setValidators([
          Validators.required,
        ]);
        this.FormPedido.controls.fechaTarjeta.updateValueAndValidity();

        console.log(this.FormPedido.controls);
      }

      if (val === 'efectivo') {
        this.FormPedido.controls.numeroTarjeta.clearValidators();
        this.FormPedido.controls.numeroTarjeta.markAsUntouched();
        this.FormPedido.controls.numeroTarjeta.updateValueAndValidity();

        this.FormPedido.controls.cvc.clearValidators();
        this.FormPedido.controls.cvc.markAsUntouched();
        this.FormPedido.controls.cvc.updateValueAndValidity();

        this.FormPedido.controls.fechaTarjeta.clearValidators();
        this.FormPedido.controls.fechaTarjeta.markAsUntouched();
        this.FormPedido.controls.fechaTarjeta.updateValueAndValidity();

        this.FormPedido.controls.monto.setValidators([
          Validators.required,
          Validators.min(this.montoTotal),
        ]);
        this.FormPedido.controls.monto.updateValueAndValidity();
      }

      this.FormPedido.updateValueAndValidity();
    });

    this.FormPedido.controls.referencia.valueChanges.subscribe((val) => {
      console.log(this.FormPedido.controls.referencia);
    });
    this.FormPedido.controls.numeroTarjeta.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }

  pagaEfectivo() {
    return this.FormPedido.controls['formaPago'].value === 'efectivo';
  }

  esAntesPosible() {
    return (
      this.FormPedido.controls['prioridadEntrega'].value === 'antesPosible'
    );
  }

  finalizarCompra() {
    this.submitted = true;
    console.log('formulario valido: ', this.FormPedido.valid);
    console.log(this.FormPedido.controls);
    // this.fechaPedidoValida();
    // this.fechaEntregaValida();
    this.guardarDatosPedido();
    this.router.navigateByUrl('detalle-pedido');
  }

  guardarDatosPedido() {
    this.pedido.direccion = `${this.FormPedido.controls.calle.value} ${this.FormPedido.controls.numero.value}`;
    this.pedido.fechaEntrega = new Date(
      this.FormPedido.controls.fechaEntrega.value
    );
    this.pedido.metodoPago = this.FormPedido.controls.formaPago.value;
    this.comercioService.pedido = this.pedido;
  }

  esVisa() {
    // console.log(this.FormPedido.controls.numeroTarjeta.value[0]);
    // console.log(this.FormPedido.controls.numeroTarjeta.

    if (
      this.FormPedido.controls.numeroTarjeta.value != undefined &&
      this.FormPedido.controls.numeroTarjeta.value[0] == 4 &&
      this.FormPedido.controls.numeroTarjeta.value.length > 1
    ) {
      console.log(this.FormPedido.controls.numeroTarjeta.value);

      return true;
    }
    console.log(this.FormPedido.controls.numeroTarjeta.value);
    console.log(this.FormPedido.controls.cvc.value);
    console.log(this.FormPedido.controls.cvc);

    return false;
  }

  fechaTarjetaValida() {
    let fecha = this.FormPedido.controls.fechaTarjeta.value
      .toString()
      .split('-');
    let anio = new Date().getFullYear();
    let mes = new Date().getMonth();
    if (fecha[0] > anio) {
      return true;
    } else if (fecha[0] < anio) {
      return false;
    } else if (fecha[1] > mes) {
      return true;
    }
    return false;
  }

  fechaPedidoValida() {
    let fechaHoraAct = new Date();
    let fechaHoraSel = new Date(this.FormPedido.controls.fechaEntrega.value);
    console.log(this.FormPedido.controls.fechaEntrega.value);

    fechaHoraSel.setMinutes(fechaHoraSel.getMinutes() + 60);
    console.log(fechaHoraAct);
    console.log(fechaHoraSel);
    console.log(new Date().toISOString().substring(0, 16));

    return this.FormPedido.controls.fechaEntrega.value > fechaHoraAct;
  }

  stringToDate() {
    let arrFecha = this.FormPedido.controls.fechaTarjeta.value
      .toString()
      .split('-');
    let fecha = new Date(arrFecha[0] + '/' + arrFecha[1]);
    console.log(arrFecha[0] + '/' + arrFecha[1]);
    console.log(this.FormPedido.controls.fechaTarjeta);

    console.log(fecha);
  }

  DateToString() {}

  getMesAnioActual() {
    let fecha = new Date();
    let stringFecha = fecha.getFullYear() + '-' + 0 + (fecha.getMonth() + 1);
    console.log(stringFecha);

    return stringFecha;
  }

  getFechaHoraActual() {
    let fechaHoraSel = new Date();
    fechaHoraSel.setMinutes(fechaHoraSel.getMinutes() - 90);
    // console.log(fechaHoraSel);

    // console.log(fechaHoraSel.toISOString().substring(0, 16));

    return fechaHoraSel;
  }

  fechaEntregaValida() {
    let fechaAct = this.getFechaHoraActual();
    fechaAct.setMinutes(fechaAct.getMinutes() + 150);
    let fechaSel = new Date(this.FormPedido.controls.fechaEntrega.value);
    let fechaMasSemana = this.getFechaHoraActual();
    fechaMasSemana.setDate(fechaMasSemana.getDate() + 7);
    fechaMasSemana.setMinutes(fechaMasSemana.getMinutes() + 150);
    // console.log({ fechaAct });
    // console.log({ fechaSel });
    // console.log({ fechaMasSemana });

    return fechaSel >= fechaAct && fechaSel <= fechaMasSemana;
    // if (fechaSel >= fechaAct && fechaSel <= fechaMasSemana) {
    //   console.log('fecha Valida');
    // } else {
    //   console.log('fecha invalida');
    // }
  }

  horaEntregaValida() {
    let horaSel = new Date(
      this.FormPedido.controls.fechaEntrega.value
    ).getHours();
    let horaActual = new Date().getHours();
    console.log({ horaSel, horaActual });
    console.log(horaSel >= 10 && horaSel <= 23);

    return horaSel >= 10 && horaSel <= 23;
  }

  validarPedido() {
    // return this.FormPedido.valid;

    if (this.FormPedido.valid && this.fechaEntregaValida()) {
      if (this.FormPedido.controls.formaPago.value === 'tarjetaCredito') {
        this.pedidoValido = this.fechaTarjetaValida();
        return this.fechaTarjetaValida();
      } else {
        this.pedidoValido = true;
        return true;
      }
    } else {
      this.pedidoValido = false;
      return false;
    }
  }

  // if (this.esVisa()) {
  //   console.log(' es visa');

  //   return true;
  // }
  // console.log('no es visa');
  // return false;
}
