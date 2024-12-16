import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { TransportationOffer } from '../transportation-offer';
import { TransportationOfferService } from '../../../service/transportation-offer/transportation-offer.service';
import { TransportationOfferFormComponent } from '../transportation-offer-form/transportation-offer-form.component';
import { Client } from '../../client/client';
import { Cargo } from '../../cargo/cargo';
import { Sender } from '../../sender/sender';
import { Customs } from '../../customs/customs';
import { Recipient } from '../../recipient/recipient';
import { CargoService } from '../../../service/cargo/cargo.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../service/order/order.service';
import { OrderFormComponent } from '../../order/order-form/order-form.component';

@Component({
  selector: 'app-transportation-offer-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
  templateUrl: './transportation-offer-home.component.html',
  styleUrl: './transportation-offer-home.component.scss'
})
export class TransportationOfferHomeComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id_offer', 'date_offer', 'name_manager', 'client', 'cargo', 'freight_transportation_offer', 'createOrder', 'edit', 'delete'];
  dataSource = new MatTableDataSource<TransportationOffer>();
  transportationOffers: TransportationOffer[]=[];
  filteredTransportationOffers: TransportationOffer[]=[];

  // Blank objects for transportation offer
  sender: Sender = {
    id_sender: 0,
    name_sender: '',
    location_sender: '',
  };
  customes: Customs = {
    id_customs: 0,
    name_customs: '',
    location_customs: ''
  };
  recipient: Recipient = {
    id_recipient: 0,
    name_recipient: '',
    location_recipient: '',
  };

  /* Transportation offer dialog */
  date_offer: Date = new Date(0);
  name_manager: String = '';
  client: Client = {
    id_client: 0,
    name_client: '',
    location_client: '',
    work_number_client: '',
    tax_number_client: '',
    employee_client: '',
    description_client: '',
  }
  cargo: Cargo = {
    id_cargo: null,
    name_cargo: '',
    ldm_cargo: null,
    price_cargo: null,
    gross_cargo: null,
    max_height_cargo: null,
    size_cargo: '',
    quantity_cargo: null,
    danger_cargo: false,
    sender: this.sender,
    location_load_cargo: '',
    date_load_cargo: new Date(0),
    customs: this.customes,
    date_customs_cargo: new Date(0),
    recipient: this.recipient,
    location_unload_cargo: '',
    date_unload_cargo: new Date(0),
  }
  freight_transportation_offer: any = undefined;

  transportationOffer: TransportationOffer = {
    id_offer: 0,
    date_offer: new Date(0),
    name_manager: this.name_manager,
    client: this.client,
    cargo: this.cargo,
    freight_transportation_offer: this.freight_transportation_offer,
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private transportationOfferService: TransportationOfferService, private cargoService: CargoService, private orderService: OrderService) {}

  ngAfterViewInit(): void {
    this.transportationOfferService.fetchAllTransportationOffers().subscribe((offers) => {
      // Fetch all orders to check for related offers
      this.orderService.fetchAllOrders().subscribe((orders) => {
        const orderOfferIds = orders.map(order => order.transportationOffer.id_offer);

        // Mark offers as linked or not linked
        this.transportationOffers = offers.map(offer => ({
          ...offer,
          hasOrder: orderOfferIds.includes(offer.id_offer),
        }));

        this.dataSource = new MatTableDataSource<TransportationOffer>(this.transportationOffers);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  searchTransportationOffer(input: any) {
    this.filteredTransportationOffers = this.transportationOffers.filter(transportationOffer => 
      transportationOffer.id_offer.toString().toLowerCase().includes(input.toLowerCase()) ||
      transportationOffer.date_offer.toString().toLowerCase().includes(input.toLowerCase()) ||
      transportationOffer.client.name_client.toString().toLowerCase().includes(input.toLowerCase()) ||
      transportationOffer.cargo.id_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      transportationOffer.freight_transportation_offer.toString().toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<TransportationOffer>(this.filteredTransportationOffers);
  }

  openTransportationOfferDialog(transportationOffer: TransportationOffer): void {
    const dialogRef = this.dialog.open(TransportationOfferFormComponent, {
      data: {
        transportationOffer: { ...transportationOffer }, // Передача копии объекта
        cargo: { ...transportationOffer.cargo } // Передача копии груза
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedOfferIndex = this.transportationOffers.findIndex(
          offer => offer.id_offer === result.transportationOffer.id_offer
        );
        if (updatedOfferIndex >= 0) {
          this.transportationOffers[updatedOfferIndex] = result.transportationOffer;
        } else {
          this.transportationOffers.push(result.transportationOffer);
        }
        this.dataSource.data = this.transportationOffers; // Обновление данных таблицы
      }
    });
  }

  openOrderDialog(transportationOffer: TransportationOffer): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: {
        transportationOffer: { ...transportationOffer }, // Передача копии предложения
      },
      width: '800px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.order) {
        transportationOffer.hasOrder = true; // Устанавливаем флаг, что заказ создан
        console.log('Order created successfully:', result.order);
      }
    });
  }
  

  deleteTransportationOffer(id_offer: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if (isConfirmed) {
      // Удаление предложения на перевозку
      this.transportationOfferService.deleteTransportationOffer(id_offer).pipe(
        tap(() => {
          // После удаления предложения на перевозку, удалить связанное cargo
          const offerIndex = this.transportationOffers.findIndex(item => item.id_offer === id_offer);
          const cargoToDelete = this.transportationOffers[offerIndex]?.cargo;

          if (cargoToDelete) {
            this.cargoService.deleteCargo(cargoToDelete.id_cargo).subscribe({
              next: () => {
                console.log("Cargo deleted successfully");
              },
              error: (err) => {
                console.error("Error deleting cargo:", err);
              }
            });
          }

          // Обновить список предложений на перевозку, исключая удаленное
          this.transportationOffers.splice(offerIndex, 1);
          this.dataSource.data = [...this.transportationOffers]; // Обновление источника данных таблицы
        })
      ).subscribe({
        error: (err) => {
          console.error("Error deleting transportation offer:", err);
        }
      });
      
      window.location.reload();
    }
  }

}
