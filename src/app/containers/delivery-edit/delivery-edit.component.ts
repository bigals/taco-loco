import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DeliveriesService } from 'src/app/data/deliveries.service';

import { IBreadCrumbs, IDelivery } from 'src/app/models';

@UntilDestroy()
@Component({
  selector: 'taco-loco-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryEditComponent {
  public delivery$: Observable<IDelivery> | undefined;
  public delivery: IDelivery | undefined;
  public breadcrumbs: IBreadCrumbs[] = [
    { title: 'Deliveries', routePath: '/' },
    { title: 'Editing Delivery' },
  ];
  public isUnRecognizedId: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deliveriesService: DeliveriesService
  ) {
    this.activatedRoute.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((paramMap) => {
        const id = paramMap.get('id');
        if (id && id !== 'new') {
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
            this.isUnRecognizedId = !delivery.id;

            if (delivery.id) {
              this.breadcrumbs[1].title += ` ${delivery.id}`;
              this.breadcrumbs = [...this.breadcrumbs];
            }
          });
        } else if (id === 'new') {
          //for creation form, just set delivery$ to get to form
          this.delivery = {} as IDelivery;
          this.delivery$ = of(this.delivery);

          this.breadcrumbs[1].title = `New Delivery`;
          this.breadcrumbs = [...this.breadcrumbs];
        }
      });
  }

  /**
   * Takes care of handling the form submission from the child
   * component, and firing the nessecary PUT/POST method in the service
   * @param newDelivery {IDelivery} the updated Delivery object
   */
  public handleFormSubmission(newDelivery: IDelivery) {
    if (newDelivery.id) {
      this.deliveriesService
        .updateDelivery(newDelivery)
        .pipe(untilDestroyed(this))
        .subscribe((newDel: IDelivery) =>
          this.handleNewDeliveryUpdated(newDel)
        );
    } else {
      this.deliveriesService
        .addDelivery(newDelivery)
        .pipe(untilDestroyed(this))
        .subscribe((newDel: IDelivery) =>
          this.handleNewDeliveryUpdated(newDel)
        );
    }
  }

  /**
   * A Uniform handler function to navigate to the delivery details
   * object after either create/update
   * @param newDelivery {IDelivery} the updated/created delivery object
   */
  public handleNewDeliveryUpdated(newDelivery: IDelivery) {
    this.router.navigate(['deliveries', newDelivery.id]);
  }
}
