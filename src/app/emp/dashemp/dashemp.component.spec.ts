import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashempComponent } from './dashemp.component';

describe('DashempComponent', () => {
  let component: DashempComponent;
  let fixture: ComponentFixture<DashempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
