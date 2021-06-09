import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DeliveryEditComponent } from './delivery-edit.component';

describe('DeliveryEditComponent', () => {
  let component: DeliveryEditComponent;
  let fixture: ComponentFixture<DeliveryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryEditComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create, and define its breadcrumb path, initalize a hidden zero state so a loader is shown', () => {
    expect(component).toBeTruthy();
    expect(component.breadcrumbs).toBeDefined();
    expect(component.breadcrumbs).toEqual([
      { title: 'Deliveries', routePath: '/' },
      { title: 'Editing Delivery' },
    ]);
    expect(component.isUnRecognizedId).toBeFalsy();
  });
});
