import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaHorasComponent } from './carga-horas.component';

describe('CargaHorasComponent', () => {
  let component: CargaHorasComponent;
  let fixture: ComponentFixture<CargaHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaHorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
