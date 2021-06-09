import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { DeliveriesService } from 'src/app/data/deliveries.service';
import { IBreadCrumbs, IDelivery } from 'src/app/models';

@UntilDestroy()
@Component({
  selector: 'taco-loco-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss'],
})
export class DeliveriesComponent {
  public breadcrumbs: IBreadCrumbs[] = [
    { title: 'Deliveries', routePath: '/' },
  ];
  public filterVal: string = '';

  public deliveries$ = new BehaviorSubject<IDelivery[] | undefined>(undefined);

  constructor(
    private deliveriesService: DeliveriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.filterVal = params.filter ? params.filter : '';

        this.deliveriesService
          .getDeliveries(params.filter ? params.filter : undefined)
          .subscribe((deliveries) => this.deliveries$.next(deliveries));
      });
  }

  /**
   * Handles the filterChange event from the header component, to filter the
   * delivery list. Done with route navigate with queryParams for persistent routes/filters
   * @param filterVal {string} the new filter value emited from the child
   */
  public filterDeliveryList(filterVal: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { filter: filterVal ? filterVal : undefined },
    });
  }

  /**
   * Handles emit of the delete event from the child delivery card events,
   * to trigger the delete of the delivery.
   * @param deliveryId {number} the id of the delivery to delete
   */
  public handleDeleteDelivery(deliveryId: number) {
    if (deliveryId) {
      const confirmDelete = confirm(
        `Are you sure you want to delete Delivery ID: ${deliveryId}`
      );
      if (confirmDelete) {
        this.deliveriesService
          .deleteDelivery(deliveryId)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            const newDels = this.deliveries$.value
              ? this.deliveries$.value
                  .filter((delivery) => delivery.id !== deliveryId)
                  .map((del) => ({ ...del }))
              : [];
            this.deliveries$.next(
              [...newDels] //shouldn't ever be here since we can't trigger this handler without a deliveries list
            );
          });
      }
    }
  }
}
