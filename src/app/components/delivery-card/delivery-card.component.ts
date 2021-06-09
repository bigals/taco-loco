import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IDelivery } from 'src/app/models';

@Component({
  selector: 'taco-loco-delivery-card',
  templateUrl: './delivery-card.component.html',
  styleUrls: ['./delivery-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryCardComponent {
  @Input()
  public delivery: IDelivery | undefined;
  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Handles emiting the delete event up to the parents, to update the service/state
   * @param event {Event} the javascript event to prevent bubble up of click
   * @param id {number} the id of the delivery we want to delete
   */
  public emitDeleteEvent(event: Event, id: number | undefined) {
    event.stopPropagation();

    this.onDelete.emit(id);
  }
}
