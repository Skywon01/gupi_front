import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFileComponent } from './my-file.component';

describe('MyFileComponent', () => {
  let component: MyFileComponent;
  let fixture: ComponentFixture<MyFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
