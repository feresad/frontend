import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmachineComponent } from './listmachine.component';

describe('ListmachineComponent', () => {
  let component: ListmachineComponent;
  let fixture: ComponentFixture<ListmachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListmachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListmachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
