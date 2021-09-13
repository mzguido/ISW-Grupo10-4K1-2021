import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  total = 0;
  submitted = false;
  FormPedido: FormGroup = this.fb.group({
    calle: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    ciudad: [, [Validators.required]],
    referencia: ['', [Validators.required]],
    formaPago: ['efectivo', []],
    monto: [, [Validators.required]],
    // numeroTarjeta: [, [Validators.pattern('^4[0-9]{12}(?:[0-9]{3})?$')]],
    numeroTarjeta: [],
    cvc: [],
    fechaTarjeta: [this.getMesAnioActual()],
    prioridadEntrega: ['antesPosible'],
    fechaEntrega: [new Date().toISOString().substring(0, 16)],
    // fechaEntrega: ['2021-09-13T03:39'],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.FormPedido);
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
      if (val === 'tarjetaCredito') {
        this.FormPedido.controls.monto.clearValidators();
        this.FormPedido.controls.monto.markAsUntouched();
        this.FormPedido.controls.monto.updateValueAndValidity();
        this.FormPedido.controls.numeroTarjeta.setValidators([
          Validators.pattern('^4[0-9]{15,15}$'),
          Validators.required,
        ]);
        this.FormPedido.controls.cvc.setValidators([
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(3),
        ]);
        this.FormPedido.controls.fechaTarjeta.setValidators([
          Validators.required,
        ]);
        this.FormPedido.updateValueAndValidity();
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
          Validators.min(this.total),
        ]);
      }
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
    this.fechaPedidoValida();
  }

  esVisa() {
    // console.log(this.FormPedido.controls.numeroTarjeta.value[0]);
    // console.log(this.FormPedido.controls.numeroTarjeta.

    if (
      this.FormPedido.controls.numeroTarjeta.value != undefined &&
      this.FormPedido.controls.numeroTarjeta.value[0] == 4
    ) {
      console.log(this.FormPedido.controls.numeroTarjeta.value);

      return true;
    }
    console.log(this.FormPedido.controls.numeroTarjeta.value);

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
    fechaHoraSel.setMinutes(fechaHoraSel.getMinutes() + 60);
    return fechaHoraSel;
  }
}
