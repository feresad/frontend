import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebutComponent } from './rebut.component';

describe('RebutComponent', () => {
  let component: RebutComponent;
  let fixture: ComponentFixture<RebutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RebutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RebutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
