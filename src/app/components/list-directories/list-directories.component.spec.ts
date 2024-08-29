import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDirectoriesComponent } from './list-directories.component';

describe('ListDirectoriesComponent', () => {
  let component: ListDirectoriesComponent;
  let fixture: ComponentFixture<ListDirectoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDirectoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDirectoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
