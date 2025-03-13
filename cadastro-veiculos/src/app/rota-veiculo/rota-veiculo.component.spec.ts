import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaVeiculoComponent } from './rota-veiculo.component';

describe('RotaVeiculoComponent', () => {
  let component: RotaVeiculoComponent;
  let fixture: ComponentFixture<RotaVeiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotaVeiculoComponent]
    });
    fixture = TestBed.createComponent(RotaVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
