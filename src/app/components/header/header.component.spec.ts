import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    })
      .overrideComponent(HeaderComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create, and default to not have filter, or new button', () => {
    expect(component).toBeTruthy();
    expect(component.initialFilter).toBe('');
    expect(component.wantsFilter).toBeFalsy();
    expect(component.wantsNewBtn).toBeFalsy();
  });

  it('should emit changes to the filter, when the input is typed in (800ms debounce)', (done) => {
    component.initialFilter = 'My Cool Filter';
    component.wantsFilter = true;
    component.wantsNewBtn = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const headerDe = fixture.debugElement;
      const filter = headerDe.query(By.css('input[data-cy="filter"]'));
      // Should be empty before ngOnChanges fires initially
      expect(filter?.properties.value).toEqual('');

      component.ngOnChanges({
        initialFilter: new SimpleChange(null, component.initialFilter, true),
      });

      //Should initialize the filter after ngOnChanges
      expect(filter.properties.value).toEqual(component.initialFilter);

      filter.nativeElement.value = 'New Filter Value is Rad!';
      filter.nativeElement.dispatchEvent(new Event('input'));
      done();
    });
  });
});
