import { TestBed } from '@angular/core/testing';

import { TeamMateriasService } from './team-materias.service';

describe('TeamMateriasService', () => {
  let service: TeamMateriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMateriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
