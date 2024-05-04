import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListordreeComponent } from './listordree.component';

describe('ListordreeComponent', () => {
  let component: ListordreeComponent;
  let fixture: ComponentFixture<ListordreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListordreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListordreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
