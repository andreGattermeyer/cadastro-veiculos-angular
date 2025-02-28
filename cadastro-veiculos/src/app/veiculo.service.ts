import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo } from './veiculo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  constructor(private httpClient: HttpClient) { }

  api = "http://localhost:8080/veiculos";

  public salvarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient.post<Veiculo>(`${this.api}/gravar-veiculo`, veiculo);
  }

  public buscarTodosVeiculos(): Observable<Veiculo[]> {
    return this.httpClient.get<Veiculo[]>(`${this.api}/ver-todos-veiculos`);
  }



  public apagarVeiculo(idVeiculo: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api}/deletar/veiculo/${idVeiculo}`);
  }

  public buscarVeiculoPorId(idVeiculo: number) {
    return this.httpClient.get<Veiculo>(`${this.api}/${idVeiculo}`);
  }

  public alterarVeiculo(idVeiculo: number) {
    return this.httpClient.get<Veiculo>(`${this.api}/alterar/veiculo/${idVeiculo}`);
  }

   // Adicionando o método buscarVeiculos
   public buscarVeiculos(termoBusca: string): Observable<Veiculo[]> {
    let params = new HttpParams().set('termoBusca', termoBusca);
    return this.httpClient.post<Veiculo[]>(`${this.api}/buscar`, null, { params });
  }


}
