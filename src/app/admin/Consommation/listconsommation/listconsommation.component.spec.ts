import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconsommationComponent } from './listconsommation.component';

describe('ListconsommationComponent', () => {
  let component: ListconsommationComponent;
  let fixture: ComponentFixture<ListconsommationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListconsommationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListconsommationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
