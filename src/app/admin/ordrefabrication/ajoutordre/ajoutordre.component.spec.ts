import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutordreComponent } from './ajoutordre.component';

describe('AjoutordreComponent', () => {
  let component: AjoutordreComponent;
  let fixture: ComponentFixture<AjoutordreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutordreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutordreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
