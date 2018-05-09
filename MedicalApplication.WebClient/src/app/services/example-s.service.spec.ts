import { TestBed, inject } from '@angular/core/testing';

import { ExampleSService } from './example-s.service';

describe('ExampleSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExampleSService]
    });
  });

  it('should be created', inject([ExampleSService], (service: ExampleSService) => {
    expect(service).toBeTruthy();
  }));
});
