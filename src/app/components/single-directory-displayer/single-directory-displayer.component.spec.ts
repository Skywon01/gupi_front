import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDirectoryDisplayerComponent } from './single-directory-displayer.component';

describe('SingleDirectoryDisplayerComponent', () => {
  let component: SingleDirectoryDisplayerComponent;
  let fixture: ComponentFixture<SingleDirectoryDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleDirectoryDisplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDirectoryDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
