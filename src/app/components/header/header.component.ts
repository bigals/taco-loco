import {
  Component,
  OnChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IBreadCrumbs } from 'src/app/models';

@UntilDestroy()
@Component({
  selector: 'taco-loco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnChanges {
  @Input()
  public breadcrumbs: IBreadCrumbs[] = [];
  @Input()
  public initialFilter: string = '';
  @Input()
  public wantsFilter: boolean = false;
  @Input()
  public wantsNewBtn: boolean = false;
  @Output()
  public filterChange: EventEmitter<string> = new EventEmitter<string>(
    undefined
  );

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      filter: [this.initialFilter],
    });

    this.formGroup.controls.filter.valueChanges
      .pipe(untilDestroyed(this), debounceTime(800))
      .subscribe((value: string) => {
        this.filterChange.emit(value);
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.initialFilter) {
      this.formGroup.controls.filter.patchValue(
        changes.initialFilter.currentValue
      );
    }
  }
}
