import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRebutComponent } from './edit-rebut.component';

describe('EditRebutComponent', () => {
  let component: EditRebutComponent;
  let fixture: ComponentFixture<EditRebutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRebutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRebutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
