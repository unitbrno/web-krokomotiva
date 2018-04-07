import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeMeAnywhereComponent } from './take-me-anywhere.component';

describe('TakeMeAnywhereComponent', () => {
  let component: TakeMeAnywhereComponent;
  let fixture: ComponentFixture<TakeMeAnywhereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeMeAnywhereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeMeAnywhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
