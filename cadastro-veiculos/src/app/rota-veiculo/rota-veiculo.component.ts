import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../veiculo.service';
import { Veiculo } from '../veiculo.model';

interface Rota {
  veiculo: string;
  rota: string;
  paradas: string;
  data: Date;
  expandido?: boolean;
  condutor?: string;
}

@Component({
  selector: 'app-rota-veiculo',
  templateUrl: './rota-veiculo.component.html',
  styleUrls: ['./rota-veiculo.component.css'],
})
export class RotaVeiculoComponent implements OnInit {
  novaRota: Rota = {
    veiculo: '',
    rota: '',
    paradas: '',
    data: new Date(),
    expandido: false,
    condutor: ''
  };

  rotas: Rota[] = [];
  veiculos: Veiculo[] = [];
  condutorSelecionado: string = '';

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculoService.buscarTodosVeiculos().subscribe({
      next: (veiculos) => {
        this.veiculos = veiculos;
      },
      error: (erro) => {
        console.error('Erro ao carregar veículos:', erro);
      }
    });
  }

  onVeiculoSelecionado(frota: string) {
    const veiculoSelecionado = this.veiculos.find(v => v.frota === frota);
    if (veiculoSelecionado) {
      this.condutorSelecionado = veiculoSelecionado.condutor;
      this.novaRota.condutor = veiculoSelecionado.condutor;
    }
  }

  adicionarRota() {
    this.rotas.push({ ...this.novaRota });
    this.novaRota = {
      veiculo: '',
      rota: '',
      paradas: '',
      data: new Date(),
    };
  }

  removerRota(rota: Rota) {
    const index = this.rotas.indexOf(rota);
    if (index > -1) {
      this.rotas.splice(index, 1);
    }
  }

  gerarLinkGoogleMaps(endereco: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
  }

  preventSubmit(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = event.target as HTMLTextAreaElement;
      const value = target.value;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      target.value = value.substring(0, start) + '\n' + value.substring(end);
      target.selectionStart = target.selectionEnd = start + 1;
    }
  }

  abrirMapa(parada: string) {
    const url = this.gerarLinkGoogleMaps(parada);
    const janela = window.open('', '_blank', 'width=600,height=400');
    if (janela) {
      janela.document.write(`
        <html>
          <head>
            <title>Mapa de ${parada}</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          </head>
          <body>
            <div class="container mt-5">
              <div class="card">
                <div class="card-body">
                  <iframe width="100%" height="400" frameborder="0" style="border:0"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCqZKU7zwOWIvV7aUd1p29TMjPsXE9qgnA&q=${encodeURIComponent(parada)}" allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
    }
  }

}
