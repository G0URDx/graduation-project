import { TestBed } from '@angular/core/testing';

import { CuratorshipService } from './curatorship.service';

describe('CuratorshipService', () => {
  let service: CuratorshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuratorshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
