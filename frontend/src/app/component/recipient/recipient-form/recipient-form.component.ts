import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Recipient } from '../recipient';
import { RecipientService } from '../../../service/recipient/recipient.service';

@Component({
  selector: 'app-recipient-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './recipient-form.component.html',
  styleUrl: './recipient-form.component.scss'
})
export class RecipientFormComponent {
  
  readonly dialogRef = inject(MatDialogRef<RecipientFormComponent>)
  data = inject<Recipient>(MAT_DIALOG_DATA)

  constructor(private recipientService: RecipientService) {}

  addOrEditRecipient(recipient: Recipient) {
    if(recipient.id_recipient !== 0) {
      this.recipientService.updateRecipient(recipient).subscribe({
        next:(data) => {
          console.log("Recipient update Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.recipientService.createRecipient(recipient).subscribe({
        next:(data) => {
          console.log("Recipient created Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }

}
