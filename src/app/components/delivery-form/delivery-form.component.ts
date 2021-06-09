import { Location } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDelivery } from 'src/app/models';

interface IDeliveryForm {
  customerName: string;
  customerAddress: string;
}

@Component({
  selector: 'taco-loco-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryFormComponent implements OnChanges {
  @Input()
  public delivery: IDelivery = {} as IDelivery;
  @Output()
  public onFormSubmit: EventEmitter<IDelivery> = new EventEmitter<IDelivery>();
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: Location) {
    this.formGroup = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerAddress: ['', Validators.required],
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.delivery && this.formGroup) {
      this.formGroup.controls.customerName.patchValue(
        changes.delivery.currentValue.customer,
        {
          emitEvent: false,
        }
      );
      this.formGroup.controls.customerAddress.patchValue(
        changes.delivery.currentValue.address,
        { emitEvent: false }
      );
    }
  }

  /**
   * Handles emitting the updated Delivery to the parent
   * so that the API can be notified of the change
   * @param formVal {IDeliveryFrom} The raw form value
   */
  public submitFormChanges(formVal: IDeliveryForm) {
    this.onFormSubmit.emit(
      this.delivery.id
        ? {
            id: this.delivery.id,
            customer: formVal.customerName,
            address: formVal.customerAddress,
          }
        : {
            customer: formVal.customerName,
            address: formVal.customerAddress,
          }
    );
  }

  /**
   * Handles click of the cancel button, to preform a
   * simple history back navigate
   */
  public dimissFormEdit() {
    this.location.back();
  }
}
