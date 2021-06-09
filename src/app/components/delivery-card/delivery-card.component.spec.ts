import { ChangeDetectionStrategy } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { IDelivery } from 'src/app/models';

import { DeliveryCardComponent } from './delivery-card.component';

describe('DeliveryCardComponent', () => {
  let component: DeliveryCardComponent;
  let fixture: ComponentFixture<DeliveryCardComponent>;
  let testDelivery: IDelivery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryCardComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    })
      .overrideComponent(DeliveryCardComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCardComponent);
    component = fixture.componentInstance;
    testDelivery = {
      id: 1,
      customer: 'Test Customer',
      address: '123 Test Address',
    };
    component.delivery = testDelivery;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dynamic titles', (done) => {
    fixture.whenStable().then(() => {
      const cardDg = fixture.debugElement;
      const customerName = cardDg.query(By.css('.customer')).nativeElement;
      const customerAddress = cardDg.query(By.css('.address')).nativeElement;

      expect(customerName.textContent).toEqual(testDelivery.customer);
      expect(customerAddress.textContent).toEqual(testDelivery.address);
      done();
    });
  });

  it('should emit onDelete event when Delete is clicked with the deliveries id', (done) => {
    fixture.whenStable().then(() => {
      let sentDeleteId: number = 0;
      const delteBtn = fixture.debugElement.query(
        By.css('.actions > button:last-child')
      );

      component.onDelete
        .pipe(first())
        .subscribe((deleteId: number) => (sentDeleteId = deleteId));

      delteBtn.triggerEventHandler('click', { stopPropagation: () => {} });
      expect(sentDeleteId).toBe(testDelivery.id as number);

      done();
    });
  });

  it('should have a routerLink to edit the delivery on the edit icon', (done) => {
    fixture.whenStable().then(() => {
      const cardDg = fixture.debugElement;
      const editBtn = cardDg.query(By.css('.actions > button:first-child'));

      expect(editBtn.properties['routerLink']).toEqual([
        'edit',
        testDelivery.id,
      ]);
      done();
    });
  });
});
