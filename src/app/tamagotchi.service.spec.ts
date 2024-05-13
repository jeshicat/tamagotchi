import { TestBed } from '@angular/core/testing';

import { TamagotchiService } from './tamagotchi.service';

describe('TamagotchiService', () => {
  let service: TamagotchiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamagotchiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
