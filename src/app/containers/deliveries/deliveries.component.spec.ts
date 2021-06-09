import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DeliveriesComponent } from './deliveries.component';

describe('DeliveriesComponent', () => {
  let component: DeliveriesComponent;
  let fixture: ComponentFixture<DeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveriesComponent],
      imports: [HttpClientModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create, and define its breadcrumb path', () => {
    expect(component).toBeTruthy();
    expect(component.breadcrumbs).toBeDefined();
    expect(component.breadcrumbs).toEqual([
      { title: 'Deliveries', routePath: '/' },
    ]);
    expect(component.filterVal).toEqual('');
  });
});
