import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TransportationOffer } from '../transportation-offer';
import { TransportationOfferService } from '../../../service/transportation-offer/transportation-offer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ClientService } from '../../../service/client/client.service';
import { Client } from '../../client/client';

@Component({
  selector: 'app-transportation-offer-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule, MatSelect, MatOption
  ],
  templateUrl: './transportation-offer-form.component.html',
  styleUrl: './transportation-offer-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransportationOfferFormComponent implements AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<TransportationOfferFormComponent>)
  data = inject<TransportationOffer>(MAT_DIALOG_DATA)

  clients: Client[] = []

  constructor(private transportationOfferService: TransportationOfferService, private clientService: ClientService) {}

  ngAfterViewInit(): void {
    this.clientService.fetchAllClient().subscribe((clientdata) => {
      this.clients = clientdata;
    })
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
}
