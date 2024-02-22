import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproduitComponent } from './editproduit.component';

describe('EditproduitComponent', () => {
  let component: EditproduitComponent;
  let fixture: ComponentFixture<EditproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
