import { Component, EventEmitter, Output } from '@angular/core';
import { VeiculoService } from '../veiculo.service';
import { Veiculo } from '../veiculo.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buscar-veiculo',
  templateUrl: './buscar-veiculo.component.html',
  styleUrls: ['./buscar-veiculo.component.css']
})
export class BuscarVeiculoComponent {
  termoBusca: string = '';
  @Output() veiculosBuscados: EventEmitter<Veiculo[]> = new EventEmitter<Veiculo[]>();
  @Output() cancelarBusca: EventEmitter<void> = new EventEmitter<void>();  

  constructor(private veiculoService: VeiculoService) {}

  buscarVeiculos(): void {
    if (this.termoBusca) {
      this.veiculoService.buscarVeiculos(this.termoBusca).subscribe({
        next: (veiculos) => {
          this.veiculosBuscados.emit(veiculos);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
    }
  }

  cancelar(): void {
    this.termoBusca = '';
    if (this.cancelarBusca) {  // Verificando se cancelarBusca está definido
      this.cancelarBusca.emit();
    }
  }
}
