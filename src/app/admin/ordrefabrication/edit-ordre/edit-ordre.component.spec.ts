import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdreComponent } from './edit-ordre.component';

describe('EditOrdreComponent', () => {
  let component: EditOrdreComponent;
  let fixture: ComponentFixture<EditOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOrdreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
