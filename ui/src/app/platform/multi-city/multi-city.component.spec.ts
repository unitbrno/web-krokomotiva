import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCityComponent } from './multi-city.component';

describe('MultiCityComponent', () => {
  let component: MultiCityComponent;
  let fixture: ComponentFixture<MultiCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
