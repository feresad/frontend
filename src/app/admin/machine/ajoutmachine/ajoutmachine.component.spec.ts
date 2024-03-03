import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutmachineComponent } from './ajoutmachine.component';

describe('AjoutmachineComponent', () => {
  let component: AjoutmachineComponent;
  let fixture: ComponentFixture<AjoutmachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutmachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutmachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
