import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueEntryDailogComponent } from './unique-entry-dailog.component';

describe('UniqueEntryDailogComponent', () => {
  let component: UniqueEntryDailogComponent;
  let fixture: ComponentFixture<UniqueEntryDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueEntryDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueEntryDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
