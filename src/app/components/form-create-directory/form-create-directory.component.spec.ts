import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateDirectoryComponent } from './form-create-directory.component';

describe('FormCreateDirectoryComponent', () => {
  let component: FormCreateDirectoryComponent;
  let fixture: ComponentFixture<FormCreateDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateDirectoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
