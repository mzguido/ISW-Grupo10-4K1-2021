import { TestBed } from '@angular/core/testing';

import { ComerciosService } from './comercios.service';

describe('ComerciosService', () => {
  let service: ComerciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComerciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
