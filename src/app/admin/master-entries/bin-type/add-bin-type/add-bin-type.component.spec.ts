import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBinTypeComponent } from './add-bin-type.component';

describe('AddBinTypeComponent', () => {
  let component: AddBinTypeComponent;
  let fixture: ComponentFixture<AddBinTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBinTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBinTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
