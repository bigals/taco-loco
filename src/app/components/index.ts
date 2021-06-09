import { HeaderComponent } from './header/header.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { SHARED_COMPONENTS } from './shared';
import { DeliveryCardComponent } from './delivery-card/delivery-card.component';

export const COMPONENTS = [
  DeliveryFormComponent,
  HeaderComponent,
  DeliveryCardComponent,
  ...SHARED_COMPONENTS,
];

export * from './delivery-form/delivery-form.component';
export * from './delivery-card/delivery-card.component';
export * from './header/header.component';
export * from './shared';
