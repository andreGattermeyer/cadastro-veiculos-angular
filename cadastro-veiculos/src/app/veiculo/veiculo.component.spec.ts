import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoComponent } from './veiculo.component';

describe('VeiculoComponent', () => {
  let component: VeiculoComponent;
  let fixture: ComponentFixture<VeiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeiculoComponent]
    });
    fixture = TestBed.createComponent(VeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
