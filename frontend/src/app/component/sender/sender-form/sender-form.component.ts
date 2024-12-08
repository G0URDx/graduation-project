import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Sender } from '../sender';
import { SenderService } from '../../../service/sender/sender.service';

@Component({
  selector: 'app-sender-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './sender-form.component.html',
  styleUrl: './sender-form.component.scss'
})
export class SenderFormComponent {

  readonly dialogRef = inject(MatDialogRef<SenderFormComponent>)
  data = inject<Sender>(MAT_DIALOG_DATA)

  constructor(private senderService: SenderService) {}

  addOrEditSender(sender: Sender) {
    if(sender.id_sender !== 0) {
      this.senderService.updateSender(sender).subscribe({
        next:(data) => {
          console.log("Sender update Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.senderService.createSender(sender).subscribe({
        next:(data) => {
          console.log("Sender created Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }

}
