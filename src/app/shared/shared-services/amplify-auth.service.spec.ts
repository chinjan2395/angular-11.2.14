import {TestBed} from '@angular/core/testing';

import {AmplifyAuthService} from './amplify-auth.service';

describe('AmplifyAuthService', () => {
  let service: AmplifyAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmplifyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
