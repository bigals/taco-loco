import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DeliveriesComponent,
  DeliveryDetailComponent,
  DeliveryEditComponent,
  NotFoundComponent,
} from './containers';

const routes: Routes = [
  {
    path: 'deliveries',
    component: DeliveriesComponent,
  },
  {
    path: 'deliveries/:id',
    component: DeliveryDetailComponent,
    pathMatch: 'full',
  },
  {
    path: 'deliveries/edit/:id',
    component: DeliveryEditComponent,
  },
  {
    path: '',
    redirectTo: '/deliveries',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
