import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutrebutComponent } from './ajoutrebut.component';

describe('AjoutrebutComponent', () => {
  let component: AjoutrebutComponent;
  let fixture: ComponentFixture<AjoutrebutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutrebutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutrebutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
