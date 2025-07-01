import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeteriaListComponent } from './cafeteria-list.component';

describe('CafeteriaListComponent', () => {
  let component: CafeteriaListComponent;
  let fixture: ComponentFixture<CafeteriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeteriaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CafeteriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
