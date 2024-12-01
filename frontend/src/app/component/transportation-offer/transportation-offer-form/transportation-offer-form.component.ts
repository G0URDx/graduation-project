import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatOption, provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TransportationOffer } from '../transportation-offer';
import { TransportationOfferService } from '../../../service/transportation-offer/transportation-offer.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ClientService } from '../../../service/client/client.service';
import { Client } from '../../client/client';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-transportation-offer-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule, MatSelect, MatOption, NgxMatSelectSearchModule, ReactiveFormsModule
  ],
  templateUrl: './transportation-offer-form.component.html',
  styleUrl: './transportation-offer-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransportationOfferFormComponent implements AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<TransportationOfferFormComponent>)
  data = inject<TransportationOffer>(MAT_DIALOG_DATA)

  // Mat-Select-Search variables
  clients: Client[] = [];
  public clientFilterCtrl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  public filteredClients: ReplaySubject<Client[]> = new ReplaySubject<Client[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  constructor(private transportationOfferService: TransportationOfferService, private clientService: ClientService) {}

  ngAfterViewInit(): void {
    this.clientService.fetchAllClient().subscribe((clientData) => {
      this.clients = clientData;
      this.filteredClients.next(this.clients.slice());
    });
    this.clientFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterClients();
      });
  }

  addOrEditTransportationOffer(transportationOffer: TransportationOffer) {
    if(transportationOffer.id_offer !== 0) {
      this.transportationOfferService.updateTransportationOffer(transportationOffer).subscribe({
        next:(data) => {
          console.log("Transportation offer update Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.transportationOfferService.createTransportationOffer(transportationOffer).subscribe({
        next:(data) => {
          console.log("Transportation offer created Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }

  protected filterClients() {
    if (!this.clients) {
      return;
    }

    // Получаем поисковую строку
    let search = this.clientFilterCtrl.value;
    if (!search) {
      this.filteredClients.next(this.clients.slice()); // Без фильтрации
      return;
    } else {
      search = search.toLowerCase();
    }

    // Применяем фильтр
    this.filteredClients.next(
      this.clients.filter((client) => client.name_client.toLowerCase().indexOf(search) > -1)
    );
  }
}
