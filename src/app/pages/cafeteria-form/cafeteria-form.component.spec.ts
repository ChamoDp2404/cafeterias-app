import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeteriaFormComponent } from './cafeteria-form.component';

describe('CafeteriaFormComponent', () => {
  let component: CafeteriaFormComponent;
  let fixture: ComponentFixture<CafeteriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeteriaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CafeteriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
