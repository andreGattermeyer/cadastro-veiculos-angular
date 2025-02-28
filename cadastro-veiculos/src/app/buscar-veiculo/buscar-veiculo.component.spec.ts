import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarVeiculoComponent } from './buscar-veiculo.component';

describe('BuscarVeiculoComponent', () => {
  let component: BuscarVeiculoComponent;
  let fixture: ComponentFixture<BuscarVeiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarVeiculoComponent]
    });
    fixture = TestBed.createComponent(BuscarVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
