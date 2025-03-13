import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../veiculo.model';
import { NgForm } from '@angular/forms';
import { VeiculoService } from '../veiculo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css'],
})
export class VeiculoComponent implements OnInit {
  [x: string]: any;
  statusHistory: Array<{ status: string; timestamp: Date }> = [];
  veiculo: any;

 isCreateVeiculo: boolean = false;

 tipoVeiculo: string[] = [];

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.veiculo = this.activatedRoute.snapshot.data['veiculo'];

    }




  salvarVeiculo(veiculoForm: NgForm): void {
    this.veiculoService.salvarVeiculo(this.veiculo).subscribe({
      next: (res: Veiculo) => {
        console.log(res);
        veiculoForm.reset();
        this.veiculo.tipoVeiculo = '';
        this.router.navigate(['/veiculo-list']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  selectTipo(tipoVeiculo: string) {
    this.veiculo.tipoVeiculo = tipoVeiculo;
    console.log('Tipo selecionado:', tipoVeiculo);
  }

  checkStatus(status: string) {
    return this.veiculo.status != null && this.veiculo.status.includes(status);
  }

  checkTipo(tipoVeiculo: string) {
    return (
      this.veiculo.tipoVeiculo != null &&
      this.veiculo.tipoVeiculo === tipoVeiculo
    );
  }

  onStatusChanges(event: any, status: 'OK' | 'NaoOk') {
    console.log('Status alterado:', status, 'Checked:', event.checked);
    const novoStatus = status === 'OK' ? 'OK' : 'Não OK';

    if (event.checked) {
      // Adiciona o novo status ao histórico
      this.statusHistory.push({
        status: novoStatus,
        timestamp: new Date(),
      });

      // Exibe o histórico de status
      console.log('Histórico de Status:');
      this.statusHistory.forEach((hist, index) => {
        console.log(
          `${index + 1}. ${hist.status} - ${hist.timestamp.toLocaleString()}`
        );
      });
    }

    if (status === 'OK') {
      this.veiculo.statusOk = event.checked;
      if (event.checked) {
        this.veiculo.statusNaoOk = false;
        this.veiculo.explicacaoNaoOk = ''; // Limpa a explicação quando muda para OK
        console.log('Status OK ativado, Não OK desativado');
      } else {
        console.log('Status OK desativado');
      }
    } else {
      this.veiculo.statusNaoOk = event.checked;
      if (event.checked) {
        this.veiculo.statusOk = false;
        console.log('Status Não OK ativado, OK desativado');
      } else {
        this.veiculo.explicacaoNaoOk = ''; // Limpa a explicação quando desmarca Não OK
        console.log('Status Não OK desativado');
      }
    }

    this.veiculo.status = this.veiculo.statusOk
      ? 'OK'
      : this.veiculo.statusNaoOk
      ? 'Não OK'
      : '';
    console.log('Estado final dos status:', {
      statusOk: this.veiculo.statusOk,
      statusNaoOk: this.veiculo.statusNaoOk,
      status: this.veiculo.status,
      explicacaoNaoOk: this.veiculo.explicacaoNaoOk,
    });
  }
}
