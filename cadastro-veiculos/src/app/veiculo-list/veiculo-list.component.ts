import { Component, OnInit, ViewChild } from '@angular/core';
import { VeiculoService } from '../veiculo.service';
import { Veiculo } from '../veiculo.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css'],
})
export class VeiculoListComponent implements OnInit {
  dataSource = new MatTableDataSource<Veiculo>([]);

  displayedColumns: string[] = [
    'idVeiculo',
    'dataRegistro',
    'marca',
    'modelo',
    'chassi',
    'quilometragem',
    'condutor',
    'placa',
    'regiao',
    'frota',
    'tipoVeiculo',
    'status',
    'explicacaoNaoOk',
    'alterarVeiculo',
    'apagarVeiculo',
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private veiculoService: VeiculoService, private router: Router) {}

  ngOnInit(): void {
    this.buscarTodosVeiculos();

    this.dataSource.filterPredicate = (data: Veiculo, filter: string) => {
      const normalize = (str: string) =>
        str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
      const lowerCaseFilter = normalize(filter);
      return (
        normalize(data.marca).includes(lowerCaseFilter) ||
        normalize(data.modelo).includes(lowerCaseFilter) ||
        normalize(data.placa).includes(lowerCaseFilter) ||
        normalize(data.regiao).includes(lowerCaseFilter) ||
        normalize(data.frota).includes(lowerCaseFilter) ||
        normalize(data.chassi).includes(lowerCaseFilter) ||
        normalize(data.tipoVeiculo).includes(lowerCaseFilter)
      );
    };

    this.dataSource.paginator = this.paginator;
  }

  acharVeiculos(veiculos: Veiculo[]): void {
    this.dataSource.data = veiculos;
    this.dataSource.paginator = this.paginator;
  }

  cancelarBusca(): void {
    this.buscarTodosVeiculos();
  }

  buscarTodosVeiculos(): void {
    this.veiculoService.buscarTodosVeiculos().subscribe({
      next: (res: Veiculo[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  }

  alterarVeiculo(idVeiculo: number): void {
    this.router.navigate(['/veiculo', { idVeiculo }]);
  }

  apagarVeiculo(idVeiculo: number): void {
    console.log(idVeiculo);
    this.veiculoService.apagarVeiculo(idVeiculo).subscribe({
      next: (res) => {
        console.log(res);
        this.buscarTodosVeiculos();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  }
}
