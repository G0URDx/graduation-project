import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Vehicle } from '../vehicle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from '../../../service/vehicle/vehicle.service';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicle-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './vehicle-home.component.html',
  styleUrl: './vehicle-home.component.scss'
})
export class VehicleHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_vehicle', 'name_vehicle', 'number_vehicle', 'year_vehicle', 'eco_vehicle', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Vehicle>();
  vehicles: Vehicle[]=[];
  filteredVehicles: Vehicle[]=[];

  /* Sender dialog */
  id_vehicle: any = undefined
  name_vehicle: String = '';
  number_vehicle: String = '';
  year_vehicle: String = '';
  eco_vehicle: any = undefined;

  vehicle: Vehicle = {
    id_vehicle: 0,
    name_vehicle: '',
    number_vehicle: '',
    year_vehicle: '',
    eco_vehicle: 0,
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private vehicleService: VehicleService) {}

  ngAfterViewInit(): void {
    this.vehicleService.fetchAllVehicles().subscribe((data) => {
      this.vehicles = data;
      this.dataSource = new MatTableDataSource<Vehicle>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchVehicle(input: any) {
    this.filteredVehicles = this.vehicles.filter(vehicle => 
      vehicle.id_vehicle.toString().toLowerCase().includes(input.toLowerCase()) ||
      vehicle.name_vehicle.toLowerCase().includes(input.toLowerCase()) ||
      vehicle.number_vehicle.toLowerCase().includes(input.toLowerCase()) ||
      vehicle.year_vehicle.toLowerCase().includes(input.toLowerCase()) ||
      vehicle.eco_vehicle.toString().toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Vehicle>(this.filteredVehicles);
  }

  openVehicleDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      data:vehicle
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.vehicle.id_vehicle = result.id_vehicle;
        this.vehicle.name_vehicle = result.name_vehicle;
        this.vehicle.number_vehicle = result.number_vehicle;
        this.vehicle.year_vehicle = result.year_vehicle;
        this.vehicle.eco_vehicle = result.eco_vehicle;
      }
    })
  }

  deleteVehicle(id_vehicle: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.vehicleService.deleteVehicle(id_vehicle).subscribe((data) => {
        this.vehicles = this.vehicles.filter(item => item.id_vehicle!=id_vehicle);
      })
      window.location.reload();
    }
  }

}
