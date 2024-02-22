import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProdComponent } from './list-prod.component';

describe('ListProdComponent', () => {
  let component: ListProdComponent;
  let fixture: ComponentFixture<ListProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
