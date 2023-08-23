import { TestBed } from '@angular/core/testing';

import { MessagesUtilService } from './messages-util.service';

describe('MessagesUtilService', () => {
  let service: MessagesUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
