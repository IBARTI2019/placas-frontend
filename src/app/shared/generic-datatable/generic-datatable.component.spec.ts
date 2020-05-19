import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDatatableComponent } from './generic-datatable.component';

describe('GenericDatatableComponent', () => {
  let component: GenericDatatableComponent;
  let fixture: ComponentFixture<GenericDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
