import { TestBed } from '@angular/core/testing';

import { ThemeProviderService } from './theme-provider.service';

describe('ThemeProviderService', () => {
  let service: ThemeProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
