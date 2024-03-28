import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutConsommationComponent } from './ajout-consommation.component';

describe('AjoutConsommationComponent', () => {
  let component: AjoutConsommationComponent;
  let fixture: ComponentFixture<AjoutConsommationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutConsommationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutConsommationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
