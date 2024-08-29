import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmployeeDisplayerComponent } from './single-employee-displayer.component';

describe('SingleEmployeeDisplayerComponent', () => {
  let component: SingleEmployeeDisplayerComponent;
  let fixture: ComponentFixture<SingleEmployeeDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleEmployeeDisplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleEmployeeDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
