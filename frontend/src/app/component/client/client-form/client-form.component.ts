import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../client';
import { ClientService } from '../../../service/client/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  readonly dialogRef = inject(MatDialogRef<ClientFormComponent>)
  data = inject<Client>(MAT_DIALOG_DATA)

  constructor(private clientService: ClientService) {}

  addOrEditClient(client: Client) {
    if(client.id_client !== 0) {
      this.clientService.updateClient(client).subscribe({
        next:(data) => {
          console.log("Client update Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.clientService.createClient(client).subscribe({
        next:(data) => {
          console.log("Client created Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }
  
}
