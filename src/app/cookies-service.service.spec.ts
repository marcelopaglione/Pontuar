import { TestBed } from '@angular/core/testing';

import { CookiesServiceService } from './cookies-service.service';

describe('CookiesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookiesServiceService = TestBed.get(CookiesServiceService);
    expect(service).toBeTruthy();
  });
});
