import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTimeSeriesComponent } from './canvas-time-series.component';

describe('CanvasTimeSeriesComponent', () => {
  let component: CanvasTimeSeriesComponent;
  let fixture: ComponentFixture<CanvasTimeSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasTimeSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTimeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
