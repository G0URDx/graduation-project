import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TransportationOffer } from '../../transportation-offer/transportation-offer';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { Order } from '../order';
import { OrderService } from '../../../service/order/order.service';
import { TransportationOfferService } from '../../../service/transportation-offer/transportation-offer.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule, MatSelect, MatOption, NgxMatSelectSearchModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements AfterViewInit {

  readonly dialogRef = inject(MatDialogRef<OrderFormComponent>);
  readonly dialogData = inject<any>(MAT_DIALOG_DATA);

  dataOrder: Order = this.dialogData.order;

  // Mat-Select-Search variables for Order
  transportationOffers: TransportationOffer[] = [];
  public transportationOfferFilterCtrl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  public filteredTransportationOffers: ReplaySubject<TransportationOffer[]> = new ReplaySubject<TransportationOffer[]>(1);
  // End of Mat-Select-Search variables for Order

  // Mat-Select-Search settings
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  // End of Mat-Select-Search settings

  constructor(
    private orderService: OrderService,
    private transportationOfferService: TransportationOfferService,
  ) {}

  ngAfterViewInit(): void {
    if (!this.dataOrder.transportationOffer) {
      this.dataOrder.transportationOffer = { 
        id_offer: 0,
        date_offer: new Date(0),
        client: { 
          id_client: 0, 
          name_client: '',
          location_client: '', 
          work_number_client: '', 
          tax_number_client: '', 
          employee_client: '', 
          description_client: '' 
        }, 
        cargo: {
          id_cargo: 0,
          name_cargo: '',
          ldm_cargo: 0,
          price_cargo: 0,
          gross_cargo: 0,
          max_height_cargo: 0,
          size_cargo: '',
          quantity_cargo: 0,
          danger_cargo: false,
          sender: {
            id_sender: 0,
            name_sender: '',
            location_sender: ''
          },
          location_load_cargo: '',
          date_load_cargo: new Date(0),
          customs: {
            id_customs: 0,
            name_customs: '',
            location_customs: ''
          },
          date_customs_cargo: new Date(0),
          recipient: {
            id_recipient: 0,
            name_recipient: '',
            location_recipient: ''
          },
          location_unload_cargo: '',
          date_unload_cargo: new Date(0)
        },
        freight_transportation_offer: 0
      };
    }
  
    // Fetching all transportation offers for Mat-Select-Search
    this.transportationOfferService.fetchAllTransportationOffers().subscribe((transportationOfferData) => {
      this.transportationOffers = transportationOfferData;
      this.filteredTransportationOffers.next(this.transportationOffers.slice());
      
      if (this.dataOrder.transportationOffer) {
        const selectedOffer = this.transportationOffers.find(
          offer => offer.id_offer === this.dataOrder.transportationOffer.id_offer
        );
        
        if (selectedOffer) {
          this.selectedTransportationOffer = selectedOffer;
          this.dataOrder.transportationOffer = selectedOffer; // Обновляем данные
        }
      }
    });
  
    this.transportationOfferFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterTransportationOffers();
    });
  }
  

  addOrEditOrder(order: Order, transportationOffer: TransportationOffer) {
    this.dataOrder.client = transportationOffer.client;
    this.dataOrder.freight_order = transportationOffer.freight_transportation_offer
    if(order.id_order !== 0) {
      this.orderService.updateOrder(order).subscribe({
        next:(dataOrder) => {
          console.log("Order update Successfully")
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.orderService.createOrder(order).subscribe({
        next:(dataOrder) => {
          console.log("Order created Successfully")
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }

  // Filter method
  protected filterItems<T>(
    items: T[] | undefined,
    filterCtrl: { value: string | null },
    filteredItems: { next: (value: T[]) => void },
    nameField: keyof T
  ) {
    if (!items) {
      return;
    }
  
    let search = filterCtrl.value;
    if (!search) {
      filteredItems.next(items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    filteredItems.next(
      items.filter((item) => {
        const name = (item[nameField] as unknown as string).toLowerCase();
        return name.indexOf(search) > -1;
      })
    );
  }
  // End of Filter method

  // Custom filter methods
  protected filterTransportationOffers() {
    this.filterItems(this.transportationOffers, this.transportationOfferFilterCtrl, this.filteredTransportationOffers, 'id_offer');
  }
  // End of Custom filter methods

  selectedTransportationOffer: TransportationOffer | null = null;
    onTransportationOfferChange(event: MatSelectChange): void {
      this.selectedTransportationOffer = event.value;
  }
}
