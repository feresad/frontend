import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrebutComponent } from './listrebut.component';

describe('ListrebutComponent', () => {
  let component: ListrebutComponent;
  let fixture: ComponentFixture<ListrebutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListrebutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListrebutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
