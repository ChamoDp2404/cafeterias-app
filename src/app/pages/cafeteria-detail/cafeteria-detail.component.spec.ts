import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeteriaDetailComponent } from './cafeteria-detail.component';

describe('CafeteriaDetailComponent', () => {
  let component: CafeteriaDetailComponent;
  let fixture: ComponentFixture<CafeteriaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeteriaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CafeteriaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
