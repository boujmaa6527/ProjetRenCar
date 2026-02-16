import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCarDetailComponent } from './customer-car-detail.component';

describe('CustomerCarDetailComponent', () => {
  let component: CustomerCarDetailComponent;
  let fixture: ComponentFixture<CustomerCarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCarDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
