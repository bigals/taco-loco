import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IDelivery } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveriesService {
  private BASE_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Gets the entire list of deliveries from the db/server
   * @returns   Observable{HttpResponse<IDelivery[]>}
   */
  public getDeliveries(filterStr?: string): Observable<IDelivery[]> {
    return this.http.get<IDelivery[]>(
      `${this.BASE_URI}/deliveries${filterStr ? `?q=${filterStr}` : ''}`
    );
  }

  /**
   * Gets a single Delivery by ID
   * @param id of the delivery we care about
   * @returns Observable{HttpResponse<IDelivery>}
   */
  public getDeliveryById(id: number) {
    return this.http.get<IDelivery>(`${this.BASE_URI}/deliveries/${id}`);
  }

  /**
   * Creates a new delivery on the server/in the database, and returns the new object, including is id location
   * @param delivery The new delivery (w/o the id Property, gened by the server)
   * @returns   Observable{HttpResponse<IDelivery>}
   */
  public addDelivery(delivery: IDelivery) {
    return this.http.post<IDelivery>(`${this.BASE_URI}/deliveries`, delivery);
  }

  /**
   * Updates the passed in delivery on the server with the new values passed in
   * @param delivery the updated delivery
   * @returns  Observable{HttpResponse<IDelivery>}
   */
  public updateDelivery(delivery: IDelivery) {
    return this.http.put<IDelivery>(
      `${this.BASE_URI}/deliveries/${delivery.id}`,
      delivery
    );
  }

  /**
   * Deletes the requested resource/id from the database/server
   * @param id the id of the delivery to delete
   * @returns Observable{HttpResponse<void>}
   */
  public deleteDelivery(id: number) {
    return this.http.delete<void>(`${this.BASE_URI}/deliveries/${id}`);
  }
}
