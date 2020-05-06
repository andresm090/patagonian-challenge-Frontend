import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryFormComponent } from './galery-form.component';

describe('GaleryFormComponent', () => {
  let component: GaleryFormComponent;
  let fixture: ComponentFixture<GaleryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
