import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditconsoComponent } from './editconso.component';

describe('EditconsoComponent', () => {
  let component: EditconsoComponent;
  let fixture: ComponentFixture<EditconsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditconsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditconsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
