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

@Component({
  selector: 'app-transportation-offer-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './transportation-offer-home.component.html',
  styleUrl: './transportation-offer-home.component.scss'
})
export class TransportationOfferHomeComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id_offer', 'date_offer', 'client', 'location_load_transportation_offer', 'location_unload_transportation_offer', 'freight_transportation_offer', 'edit', 'delete'];
  dataSource = new MatTableDataSource<TransportationOffer>();
  transportationOffers: TransportationOffer[]=[];
  filteredTransportationOffers: TransportationOffer[]=[];

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
  location_load_transportation_offer: String = '';
  location_unload_transportation_offer: String = '';
  freight_transportation_offer: any = undefined;

  transportationOffer: TransportationOffer = {
    id_offer: 0,
    date_offer: new Date(0),
    client: this.client,
    location_load_transportation_offer: '',
    location_unload_transportation_offer: '',
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
      transportationOffer.location_load_transportation_offer.toLowerCase().includes(input.toLowerCase()) ||
      transportationOffer.location_unload_transportation_offer.toLowerCase().includes(input.toLowerCase()) ||
      transportationOffer.freight_transportation_offer.toString().toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<TransportationOffer>(this.filteredTransportationOffers);
  }

  openTransportationOfferDialog(transportationOffer: TransportationOffer): void {
    const dialogRef = this.dialog.open(TransportationOfferFormComponent, {
      data:transportationOffer
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.transportationOffer.id_offer = result.id_offer;
        this.transportationOffer.date_offer = result.date_offer;
        this.transportationOffer.client = result.id_client;
        this.transportationOffer.location_load_transportation_offer = result.location_load_transportation_offer;
        this.transportationOffer.location_unload_transportation_offer = result.location_unload_transportation_offer;
        this.transportationOffer.freight_transportation_offer = result.freight_transportation_offer;
      }
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
