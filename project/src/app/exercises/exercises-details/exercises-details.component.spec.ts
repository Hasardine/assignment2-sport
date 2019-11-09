import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesDetailsComponent } from './exercises-details.component';

describe('ExercisesDetailsComponent', () => {
  let component: ExercisesDetailsComponent;
  let fixture: ComponentFixture<ExercisesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
