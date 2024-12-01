import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '../client';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../service/client/client.service';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_client', 'name_client', 'location_client', 'work_number_client', 'tax_number_client', 'employee_client', 'description_client', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Client>();
  clients: Client[]=[];
  filteredClients: Client[]=[];

  /* Client dialog */
  id_client: any = undefined;
  name_client: String = '';
  location_client: String = '';
  work_number_client: String = '';
  tax_number_client: String = '';
  employee_client: String = '';
  description_client: String = '';

  client: Client = {
    id_client: 0,
    name_client: '',
    location_client: '',
    work_number_client: '',
    tax_number_client: '',
    employee_client: '',
    description_client: '',
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private clientService: ClientService) {}

  ngAfterViewInit(): void {
    this.clientService.fetchAllClient().subscribe((data) => {
      this.clients = data;
      this.dataSource = new MatTableDataSource<Client>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchClient(input: any) {
    this.filteredClients = this.clients.filter(client => 
      client.id_client.toString().toLowerCase().includes(input.toLowerCase()) ||
      client.name_client.toLowerCase().includes(input.toLowerCase()) ||
      client.location_client.toLowerCase().includes(input.toLowerCase()) ||
      client.work_number_client.toLowerCase().includes(input.toLowerCase()) ||
      client.tax_number_client.toLowerCase().includes(input.toLowerCase()) ||
      client.employee_client.toLowerCase().includes(input.toLowerCase()) ||
      client.description_client.toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Client>(this.filteredClients);
  }

  openClientDialog(client: Client): void {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data:client
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.client.id_client = result.id_client;
        this.client.name_client = result.name_client;
        this.client.location_client = result.location_client;
        this.client.work_number_client = result.work_number_client;
        this.client.tax_number_client = result.tax_number_client;
        this.client.employee_client = result.employee_client;
        this.client.description_client = result.description_client;
      }
    })
  }

  deleteClient(id_client: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.clientService.deleteClient(id_client).subscribe((data) => {
        this.clients = this.clients.filter(item => item.id_client!=id_client);
      })
      window.location.reload();
    }
  }

}
