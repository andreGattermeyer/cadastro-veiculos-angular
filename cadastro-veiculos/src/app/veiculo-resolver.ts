import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { VeiculoService } from "./veiculo.service";
import { Observable, of } from "rxjs";
import { Veiculo } from "./veiculo.model";
import { inject } from "@angular/core";

export const VeiculoResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Veiculo> => {

    const veiculoService = inject(VeiculoService);
    const idVeiculo = route.paramMap.get("idVeiculo");

    if (idVeiculo) {
      return veiculoService.buscarVeiculoPorId(Number(idVeiculo));
    } else {
      const veiculo: Veiculo = {
        veiculoId: 0,
        dataRegistro: '',
        marca: '',
        modelo: '',
        chassi: '',
        quilometragem: '',
        condutor: '',
        placa: '',
        regiao: '',
        frota: '',
        status: '',
        tipoVeiculo: '',
        statusOk: false,
        statusNaoOk: false,
        explicacaoNaoOk: '',
        selectTipo: undefined
      };

      return of(veiculo);
    }
  };
