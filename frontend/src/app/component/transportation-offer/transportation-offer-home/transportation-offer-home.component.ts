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

@Component({
  selector: 'app-transportation-offer-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './transportation-offer-home.component.html',
  styleUrl: './transportation-offer-home.component.scss'
})
export class TransportationOfferHomeComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id_offer', 'date_offer', 'client', 'cargo', 'freight_transportation_offer', 'edit', 'delete'];
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
    id_cargo: 0,
    name_cargo: '',
    ldm_cargo: 0,
    price_cargo: 0,
    gross_cargo: 0,
    max_height_cargo: 0,
    size_cargo: '',
    quantity_cargo: 0,
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
    client: this.client,
    cargo: this.cargo,
    freight_transportation_offer: this.freight_transportation_offer,
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private transportationOfferService: TransportationOfferService) {}

  ngAfterViewInit(): void {
    this.transportationOfferService.fetchAllTransportationOffers().subscribe((data) => {
      this.transportationOffers = data;
      this.dataSource = new MatTableDataSource<TransportationOffer>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
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
        transportationOffer: transportationOffer,
        cargo: transportationOffer.cargo || {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.transportationOffer.id_offer = result.id_offer;
        this.transportationOffer.date_offer = result.date_offer;
        this.transportationOffer.client = result.client;
        this.transportationOffer.cargo = result.cargo;
        this.transportationOffer.freight_transportation_offer = result.freight_transportation_offer;
      }
      const updatedOfferIndex = this.transportationOffers.findIndex(
        offer => offer.id_offer === result.transportationOffer.id_offer
      );
      if (updatedOfferIndex >= 0) {
        this.transportationOffers[updatedOfferIndex] = result.transportationOffer;
      } else {
        this.transportationOffers.push(result.transportationOffer);
      }
      this.dataSource.data = this.transportationOffers; // Обновление данных таблицы
      console.log('Dialog result:', result);
    })
  }

  deleteTransportationOffer(id_offer: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.transportationOfferService.deleteTransportationOffer(id_offer).subscribe((data) => {
        this.transportationOffers = this.transportationOffers.filter(item => item.id_offer!=id_offer);
      })
      window.location.reload();
    }
  }

}
