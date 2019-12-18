import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourNotificationComponent } from './tour-notification.component';

describe('TourNotificationComponent', () => {
  let component: TourNotificationComponent;
  let fixture: ComponentFixture<TourNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
