import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { TransportationOffer } from '../../transportation-offer/transportation-offer';
import { Order } from '../order';
import { OrderService } from '../../../service/order/order.service';
import { TransportationOfferService } from '../../../service/transportation-offer/transportation-offer.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatSelect,
    MatOption,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<OrderFormComponent>);
  readonly dialogData = inject<any>(MAT_DIALOG_DATA);

  dataOrder: Order = this.dialogData.order || {};
  selectedTransportationOffer: TransportationOffer | null = this.dialogData.transportationOffer || null;

  transportationOffers: TransportationOffer[] = [];
  transportationOfferFilterCtrl: FormControl<string> = new FormControl<string>('', { nonNullable: true });
  filteredTransportationOffers: ReplaySubject<TransportationOffer[]> = new ReplaySubject<TransportationOffer[]>(1);

  private _onDestroy = new Subject<void>();

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  constructor(
    private orderService: OrderService,
    private transportationOfferService: TransportationOfferService
  ) {}

  ngAfterViewInit(): void {
    // Fetch transportation offers
    this.transportationOfferService.fetchAllTransportationOffers().subscribe((offers) => {
      this.transportationOffers = offers;
      this.filteredTransportationOffers.next(this.transportationOffers.slice());

      // Set selected offer if available
      if (this.selectedTransportationOffer) {
        const selectedOffer = this.transportationOffers.find(
          (offer) => offer.id_offer === this.selectedTransportationOffer?.id_offer
        );
        if (selectedOffer) {
          this.selectedTransportationOffer = selectedOffer;
          this.dataOrder.transportationOffer = selectedOffer;
        }
      }
    });

    // Filter transportation offers on input change
    this.transportationOfferFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterTransportationOffers();
    });
  }

  addOrEditOrder(order: Order, transportationOffer: TransportationOffer) {
    this.dataOrder.client = transportationOffer.client;
    this.dataOrder.freight_order = transportationOffer.freight_transportation_offer;
    
    if (!this.dataOrder.id_order) {
      this.dataOrder.id_order = 0; // Установите default значение, если id_order не существует
    }
  
    if(this.dataOrder.id_order !== 0) {
      this.orderService.updateOrder(order).subscribe({
        next:(dataOrder) => {
          console.log("Order updated successfully");
          window.location.reload();
        },
        error:(err) => {
          console.error("Error updating order:", err);
          alert("Unable to update order. Please check the data and try again.");
        }
      });
    } else {
      this.orderService.createOrder(order).subscribe({
        next:(dataOrder) => {
          console.log("Order created successfully");
          window.location.reload();
        },
        error:(err) => {
          console.error("Error creating order:", err);
          alert("Unable to create order. Please check the data and try again.");
        }
      });
    }
  }
  

  onTransportationOfferChange(event: MatSelectChange): void {
    this.selectedTransportationOffer = event.value;
  }

  private filterTransportationOffers() {
    const search = this.transportationOfferFilterCtrl.value?.toLowerCase() || '';
    if (!search) {
      this.filteredTransportationOffers.next(this.transportationOffers.slice());
    } else {
      this.filteredTransportationOffers.next(
        this.transportationOffers.filter((offer) =>
          offer.id_offer.toString().toLowerCase().includes(search)
        )
      );
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
