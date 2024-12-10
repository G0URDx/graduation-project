import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Driver } from '../driver';
import { MatDialog } from '@angular/material/dialog';
import { DriverService } from '../../../service/driver/driver.service';
import { DriverFormComponent } from '../driver-form/driver-form.component';

@Component({
  selector: 'app-driver-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './driver-home.component.html',
  styleUrl: './driver-home.component.scss'
})
export class DriverHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_driver', 'name_native_driver', 'name_english_driver', 'birthday_driver', 'private_number_driver', 'work_number_driver', 'description_driver', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Driver>();
  drivers: Driver[]=[];
  filteredDrivers: Driver[]=[];

  /* Driver dialog */
  id_driver: any = undefined;
  name_native_driver: String = '';
  name_english_driver: String = '';
  birthday_driver: Date = new Date(0);
  private_number_driver: String = '';
  work_number_driver: String = '';
  description_driver: String = '';

  driver: Driver = {
    id_driver: 0,
    name_native_driver: '',
    name_english_driver: '',
    birthday_driver: new Date(0),
    private_number_driver: '',
    work_number_driver: '',
    description_driver: '',
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private driverService: DriverService) {}

  ngAfterViewInit(): void {
    this.driverService.fetchAllDrivers().subscribe((data) => {
      this.drivers = data;
      this.dataSource = new MatTableDataSource<Driver>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchDriver(input: any) {
    this.filteredDrivers = this.drivers.filter(driver => 
      driver.id_driver.toString().toLowerCase().includes(input.toLowerCase()) ||
      driver.name_native_driver.toLowerCase().includes(input.toLowerCase()) ||
      driver.name_english_driver.toLowerCase().includes(input.toLowerCase()) ||
      driver.birthday_driver.toString().toLowerCase().includes(input.toLowerCase()) ||
      driver.private_number_driver.toLowerCase().includes(input.toLowerCase()) ||
      driver.work_number_driver.toLowerCase().includes(input.toLowerCase()) ||
      driver.description_driver.toLowerCase().includes(input.toLowerCase()) 
    );
    this.dataSource = new MatTableDataSource<Driver>(this.filteredDrivers);
  }

  openDriverDialog(driver: Driver): void {
    const dialogRef = this.dialog.open(DriverFormComponent, {
      data:driver
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.driver.id_driver = result.id_driver;
        this.driver.name_native_driver = result.name_native_driver;
        this.driver.name_english_driver = result.name_english_driver;
        this.driver.birthday_driver = result.birthday_driver;
        this.driver.private_number_driver = result.private_number_driver;
        this.driver.work_number_driver = result.work_number_driver;
        this.driver.description_driver = result.description_driver;
      }
    })
  }

  deleteDriver(id_driver: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.driverService.deleteDriver(id_driver).subscribe((data) => {
        this.drivers = this.drivers.filter(item => item.id_driver!=id_driver);
      })
      window.location.reload();
    }
  }

}
