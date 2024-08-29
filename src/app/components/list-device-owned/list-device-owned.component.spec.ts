import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeviceOwnedComponent } from './list-device-owned.component';

describe('ListDeviceOwnedComponent', () => {
  let component: ListDeviceOwnedComponent;
  let fixture: ComponentFixture<ListDeviceOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDeviceOwnedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDeviceOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
