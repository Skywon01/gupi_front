import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDeviceDisplayerComponent } from './single-device-displayer.component';

describe('SingleDeviceDisplayerComponent', () => {
  let component: SingleDeviceDisplayerComponent;
  let fixture: ComponentFixture<SingleDeviceDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleDeviceDisplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDeviceDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
