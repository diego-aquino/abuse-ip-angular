import { TestBed } from '@angular/core/testing';

import { AbuseIpService } from './abuse-ip.service';

describe('AbuseIpService', () => {
  let service: AbuseIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbuseIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
