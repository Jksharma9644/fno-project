import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasJsComponent } from './canvas-js.component';

describe('CanvasJsComponent', () => {
  let component: CanvasJsComponent;
  let fixture: ComponentFixture<CanvasJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
