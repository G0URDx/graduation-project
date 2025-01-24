import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../client';
import { ClientService } from '../../../service/client/client.service';
import { TokenService } from '../../../service/token/token.service';
import { CuratorshipService } from '../../../service/curatorship/curatorship.service';
import { Curatorship } from '../../curatorship/curatorship';
import { CuratorshipModule } from '../../curatorship/curatorship.module';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<ClientFormComponent>)
  data = inject<Client>(MAT_DIALOG_DATA)
  currentManagerName: string = '';

  constructor(
    private clientService: ClientService,
    private curatorshipService: CuratorshipService,
    private tokenService: TokenService
  ) {}

  ngAfterViewInit(): void {
    this.currentManagerName = this.tokenService.getUserName();
  }

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
      // Создание клиента
      this.clientService.createClient(client).subscribe({
        next: (data) => {
          console.log("Client created successfully");
  
          // После успешного создания клиента создаем объект Curatorship
          this.createCuratorship(data, this.currentManagerName);
  
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  createCuratorship(client: Client, nameManager: string) {
    const curatorship: Curatorship = {
      id_curatorship: null,
      client: client,
      nameManager: nameManager,
      status_curatorship: 'Холодный клиент',
    };
    curatorship.client = client;  // Привязываем клиента
    curatorship.nameManager = nameManager;  // Имя менеджера
    curatorship.status_curatorship = 'Холодный клиент';  // Статус по умолчанию
  
    // Создаем Curatorship
    this.curatorshipService.createCuratorship(curatorship).subscribe({
      next: (dataCuratorship) => {
        console.log('Curatorship created successfully');
      },
      error: (err) => {
        console.log('Error creating curatorship:', err);
      }
    });
  }
  
}
