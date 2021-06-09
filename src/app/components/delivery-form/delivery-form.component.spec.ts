import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { IDelivery } from 'src/app/models';

import { DeliveryFormComponent } from './delivery-form.component';

describe('DeliveryFormComponent', () => {
  let component: DeliveryFormComponent;
  let fixture: ComponentFixture<DeliveryFormComponent>;
  let testDelivery: IDelivery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    })
      .overrideComponent(DeliveryFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create, and initialize an empty Object Delivery (For new form initialization)', () => {
    expect(component).toBeTruthy();
    expect(component.delivery).toEqual({} as IDelivery);
  });

  describe('Edit Form Sceanarios', () => {
    beforeEach(() => {
      testDelivery = {
        id: 1,
        customer: 'Test Customer',
        address: '123 Test Address',
      };
      component.delivery = testDelivery;
      fixture.detectChanges();
    });
    it('should initalize inputs with delivery property values', (done) => {
      fixture.whenStable().then(() => {
        const formDg = fixture.debugElement;
        const customerName = formDg.query(
          By.css('input[data-cy="customerName"]')
        );
        const customerAddress = formDg.query(
          By.css('input[data-cy="customerAddress"]')
        );

        // Should be empty before ngOnChanges fires initially
        expect(customerName.properties.value).toEqual('');
        expect(customerAddress.properties.value).toEqual('');

        component.ngOnChanges({
          delivery: new SimpleChange(null, testDelivery, true),
        });

        // Should be inited after ngOnChanges fires initially
        expect(customerName.properties.value).toEqual(testDelivery.customer);
        expect(customerAddress.properties.value).toEqual(testDelivery.address);
        done();
      });
    });

    describe('After ngOnChanges fires first change Scenarios', () => {
      beforeEach(() => {
        component.ngOnChanges({
          delivery: new SimpleChange(null, testDelivery, true),
        });
      });

      it('should emit onFormSubmit event when submitted', (done) => {
        fixture.whenStable().then(() => {
          let updatedDelivery: IDelivery;
          const submitBtn = fixture.debugElement.query(
            By.css('.actions > button:last-child')
          );

          component.onFormSubmit
            .pipe(first())
            .subscribe((newDelivery: IDelivery) => {
              updatedDelivery = newDelivery;
              expect(updatedDelivery.id).toBe(testDelivery.id);
              done();
            });

          submitBtn.triggerEventHandler('click', null);
        });
      });
    });
  });
});
