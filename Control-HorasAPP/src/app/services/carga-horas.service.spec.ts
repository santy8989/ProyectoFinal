import { TestBed } from '@angular/core/testing';

import { CargaHorasService } from './carga-horas.service';

describe('CargaHorasService', () => {
  let service: CargaHorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaHorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
