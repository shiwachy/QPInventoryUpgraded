import { TestBed } from '@angular/core/testing';

import { DMService } from './dm.service';

describe('DMService', () => {
  let service: DMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
