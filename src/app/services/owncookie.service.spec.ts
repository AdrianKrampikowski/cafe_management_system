import { TestBed } from '@angular/core/testing';

import { OwncookieService } from './owncookie.service';

describe('OwncookieService', () => {
  let service: OwncookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwncookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
