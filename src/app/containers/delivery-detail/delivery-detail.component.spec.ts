import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DeliveryDetailComponent } from './delivery-detail.component';

describe('DeliveryDetailComponent', () => {
  let component: DeliveryDetailComponent;
  let fixture: ComponentFixture<DeliveryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryDetailComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create, and define its breadcrumb path', () => {
    expect(component).toBeTruthy();
    expect(component.breadcrumbs).toBeDefined();
    expect(component.breadcrumbs).toEqual([
      { title: 'Deliveries', routePath: '/' },
      { title: 'Delivery' },
    ]);
  });
});
