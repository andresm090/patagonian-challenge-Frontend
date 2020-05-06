import { TestBed } from '@angular/core/testing';

import { ImagenItemService } from './imagen-item.service';

describe('ImagenItemService', () => {
  let service: ImagenItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
