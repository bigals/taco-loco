import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IBreadCrumbs } from 'src/app/models';

@Component({
  selector: 'taco-loco-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  public breadcrumbs: IBreadCrumbs[] = [{ title: 'Uh Oh!', routePath: '/' }];

  constructor() {}
}
