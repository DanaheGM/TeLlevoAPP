import { TestBed } from '@angular/core/testing';

import { AuthenticatorService } from './autentificador.service';

describe('AuthenticatorService', () => {
  let service: AuthenticatorService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
