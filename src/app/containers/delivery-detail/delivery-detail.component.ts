import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DeliveriesService } from 'src/app/data/deliveries.service';
import { IBreadCrumbs, IDelivery } from 'src/app/models';

@UntilDestroy()
@Component({
  selector: 'taco-loco-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryDetailComponent {
  public delivery$: Observable<IDelivery> | undefined;
  public delivery: IDelivery | undefined;
  public breadcrumbs: IBreadCrumbs[] = [
    { title: 'Deliveries', routePath: '/' },
    { title: 'Delivery' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private deliveriesService: DeliveriesService,
    private router: Router
  ) {
    this.activatedRoute.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((paramMap) => {
        const id = paramMap.get('id');
        if (id) {
          this.delivery$ = this.deliveriesService
            .getDeliveryById(parseInt(id, 10))
            .pipe(
              catchError(() => {
                this.delivery = {} as IDelivery;
                return of(this.delivery);
              })
            );

          this.delivery$.pipe(untilDestroyed(this)).subscribe((delivery) => {
            this.delivery = delivery;

            if (delivery.id) {
              this.breadcrumbs[1].title += ` ${delivery.id}`;
              this.breadcrumbs = [...this.breadcrumbs];
            }
          });
        } else {
          // Set to Error/Zero state when can't parse the id from the url
          this.delivery = {} as IDelivery;
          this.delivery$ = of(this.delivery);
        }
      });
  }

  /**
   * Handles click of the delete delivery button, launching a confirm,
   * and firing delete if desired
   * @param id {number} the id of the delivery to delete
   */
  public handleDeleteDelivery(id: number | undefined) {
    if (id) {
      const confirmDelete = confirm(
        `Are you sure you want to delete Delivery ID: ${id}`
      );
      if (confirmDelete) {
        this.deliveriesService
          .deleteDelivery(id)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.router.navigate(['/']); // go back to deliveries
          });
      }
    }
  }
}
