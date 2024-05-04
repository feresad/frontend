import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitconsoComponent } from './list-produitconso.component';

describe('ListProduitconsoComponent', () => {
  let component: ListProduitconsoComponent;
  let fixture: ComponentFixture<ListProduitconsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProduitconsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProduitconsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
