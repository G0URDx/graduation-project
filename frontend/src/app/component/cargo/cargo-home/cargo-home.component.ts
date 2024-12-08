import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Cargo } from '../cargo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sender } from '../../sender/sender';
import { Customs } from '../../customs/customs';
import { Recipient } from '../../recipient/recipient';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CargoService } from '../../../service/cargo/cargo.service';
import { CargoFormComponent } from '../cargo-form/cargo-form.component';

@Component({
  selector: 'app-cargo-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './cargo-home.component.html',
  styleUrl: './cargo-home.component.scss'
})
export class CargoHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_cargo', 'name_cargo', 'ldm_cargo', 'price_cargo', 'gross_cargo', 'max_height_cargo', 'size_cargo', 'quantity_cargo', 
    'danger_cargo', 'sender', 'location_load_cargo', 'date_load_cargo', 'customs', 'date_customs_cargo', 'recipient', 'location_unload_cargo',
    'date_unload_cargo'];
  dataSource = new MatTableDataSource<Cargo>();
  cargos: Cargo[]=[];
  filteredCargos: Cargo[]=[];

  /* Cargo dialog */
  id_cargo: any = undefined;
  name_cargo: String = '';
  ldm_cargo: any = undefined;
  price_cargo: any = undefined;
  gross_cargo: any = undefined;
  max_height_cargo: any = undefined;
  size_cargo: String = '';
  quantity_cargo: any = undefined;
  danger_cargo: any = undefined;
  sender: Sender = {
    id_sender: 0,
    name_sender: '',
    location_sender: '',
  };
  location_load_cargo: String = '';
  date_load_cargo: Date = new Date(0);
  customs: Customs = {
    id_customs: 0,
    name_customs: '',
    location_customs: '',
  };
  date_customs_cargo: Date = new Date(0);
  recipient: Recipient = {
    id_recipient: 0,
    name_recipient: '',
    location_recipient: '',
  };
  location_unload_cargo: String = '';
  date_unload_cargo: Date = new Date(0);

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
    customs: this.customs,
    date_customs_cargo: new Date(0),
    recipient: this.recipient,
    location_unload_cargo: '',
    date_unload_cargo: new Date(0),
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private cargoService: CargoService) {}

  ngAfterViewInit(): void {
    this.cargoService.fetchAllCargos().subscribe((data) => {
      this.cargos = data;
      this.dataSource = new MatTableDataSource<Cargo>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchCargo(input: any) {
    this.filteredCargos = this.cargos.filter(cargo => 
      cargo.id_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.name_cargo.toLowerCase().includes(input.toLowerCase()) ||
      cargo.ldm_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.price_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.gross_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.max_height_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.size_cargo.toLowerCase().includes(input.toLowerCase()) ||
      cargo.quantity_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.danger_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.sender.name_sender.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.location_load_cargo.toLowerCase().includes(input.toLowerCase()) ||
      cargo.date_load_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.customs.name_customs.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.date_customs_cargo.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.recipient.name_recipient.toString().toLowerCase().includes(input.toLowerCase()) ||
      cargo.location_unload_cargo.toLowerCase().includes(input.toLowerCase()) ||
      cargo.date_unload_cargo.toString().toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Cargo>(this.filteredCargos);
  }

  openCargoDialog(cargo: Cargo): void {
    const dialogRef = this.dialog.open(CargoFormComponent, {
      data:cargo
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.cargo.id_cargo = result.id_cargo;
        this.cargo.name_cargo = result.name_cargo;
        this.cargo.ldm_cargo = result.ldm_cargo;
        this.cargo.price_cargo = result.price_cargo;
        this.cargo.gross_cargo = result.gross_cargo;
        this.cargo.max_height_cargo = result.max_height_cargo;
        this.cargo.size_cargo = result.size_cargo;
        this.cargo.quantity_cargo = result.quantity_cargo;
        this.cargo.danger_cargo = result.danger_cargo;
        this.cargo.sender = result.sender;
        this.cargo.location_load_cargo = result.location_load_cargo;
        this.cargo.date_load_cargo = result.date_load_cargo;
        this.cargo.customs = result.customs;
        this.cargo.date_customs_cargo = result.date_customs_cargo;
        this.cargo.recipient = result.recipient;
        this.cargo.location_unload_cargo = result.location_unload_cargo;
        this.cargo.date_unload_cargo = result.date_unload_cargo;
      }
    })
  }

  deleteCargo(id_cargo: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.cargoService.deleteCargo(id_cargo).subscribe((data) => {
        this.cargos = this.cargos.filter(item => item.id_cargo!=id_cargo);
      })
      window.location.reload();
    }
  }
}
