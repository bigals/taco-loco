import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IDelivery } from '../models';

import { DeliveriesService } from './deliveries.service';

describe('DeliveriesService', () => {
  let service: DeliveriesService;
  let httpTestController: HttpTestingController;
  let testDelivery: IDelivery;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(DeliveriesService);
    httpTestController = TestBed.get(HttpTestingController);
    testDelivery = {
      id: 1,
      customer: 'Jim Bob',
      address: '123 NoWhere St.',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('defines a Get All method', (done) => {
    let result: IDelivery[];

    service.getDeliveries().subscribe((deliveries) => {
      result = deliveries;

      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(testDelivery);
      done();
    });
    const request = httpTestController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/deliveries`,
    });

    request.flush([testDelivery]);
    httpTestController.verify();
  });

  it('defines a Get By ID method', (done) => {
    let result: IDelivery;

    service.getDeliveryById(1).subscribe((delivery) => {
      result = delivery;

      expect(result).toEqual(testDelivery);

      done();
    });
    const request = httpTestController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/deliveries/${testDelivery.id}`,
    });

    request.flush(testDelivery);
  });

  it('defines a Update method', (done) => {
    let result: IDelivery;

    service.updateDelivery(testDelivery).subscribe((delivery) => {
      result = delivery;

      expect(result).toEqual(testDelivery);
      expect(request.request.body).toEqual(testDelivery);

      done();
    });
    const request = httpTestController.expectOne({
      method: 'PUT',
      url: `http://localhost:3000/deliveries/${testDelivery.id}`,
    });

    request.flush(testDelivery);
  });

  it('defines a Create method', (done) => {
    let result: IDelivery;
    let postDelivery: IDelivery = {
      customer: 'new cool delivery',
      address: '432 Nowhere St.',
    };

    service.addDelivery(postDelivery).subscribe((delivery) => {
      result = delivery;

      expect(result).toEqual(postDelivery);
      expect(request.request.body).toEqual(postDelivery);

      done();
    });
    const request = httpTestController.expectOne({
      method: 'POST',
      url: `http://localhost:3000/deliveries`,
    });

    request.flush(postDelivery);
  });

  it('defines a Delete method', (done) => {
    let result: IDelivery;

    service.deleteDelivery(testDelivery.id as number).subscribe(() => {
      expect(request).toBeDefined();
      done();
    });
    const request = httpTestController.expectOne({
      method: 'DELETE',
      url: `http://localhost:3000/deliveries/${testDelivery.id}`,
    });

    request.flush(testDelivery);
  });
});
