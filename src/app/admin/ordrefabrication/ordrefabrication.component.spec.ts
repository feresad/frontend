import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdrefabricationComponent } from './ordrefabrication.component';

describe('OrdrefabricationComponent', () => {
  let component: OrdrefabricationComponent;
  let fixture: ComponentFixture<OrdrefabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdrefabricationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdrefabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
