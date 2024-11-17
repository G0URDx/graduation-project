import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TransportationOffer } from '../transportation-offer';
import { TransportationOfferService } from '../../../service/transportation-offer/transportation-offer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transportation-offer-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule
  ],
  templateUrl: './transportation-offer-form.component.html',
  styleUrl: './transportation-offer-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransportationOfferFormComponent {
  readonly dialogRef = inject(MatDialogRef<TransportationOfferFormComponent>)
  data = inject<TransportationOffer>(MAT_DIALOG_DATA)

  constructor(private transportationOfferService: TransportationOfferService) {}

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
