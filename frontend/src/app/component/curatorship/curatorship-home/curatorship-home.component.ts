import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curatorship } from '../curatorship';
import { Client } from '../../client/client';
import { MatDialog } from '@angular/material/dialog';
import { CuratorshipService } from '../../../service/curatorship/curatorship.service';
import { CuratorshipFormComponent } from '../curatorship-form/curatorship-form.component';

@Component({
  selector: 'app-curatorship-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './curatorship-home.component.html',
  styleUrl: './curatorship-home.component.scss'
})
export class CuratorshipHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_curatorship', 'nameManager', 'client', 'status_curatorship', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Curatorship>();
  curatorships: Curatorship[]=[];
  filteredCuratorships: Curatorship[]=[];

  id_curatorship: any = undefined;
  nameManager: String = '';
  client: Client = {
    id_client: 0,
    name_client: '',
    location_client: '',
    work_number_client: '',
    tax_number_client: '',
    employee_client: '',
    description_client: '',
  }
  status_curatorship: String = '';

  curatorship: Curatorship = {
    id_curatorship: this.id_curatorship,
    nameManager: this.nameManager,
    client: this.client,
    status_curatorship: this.status_curatorship
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private curatorshipService: CuratorshipService) {}

  ngAfterViewInit(): void {
    this.curatorshipService.fetchAllCuratorships().subscribe((data) => {
      this.curatorships = data;
      this.dataSource = new MatTableDataSource<Curatorship>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchCuratorship(input: any) {
    this.filteredCuratorships = this.curatorships.filter(curatorship => 
      curatorship.id_curatorship.toString().toLowerCase().includes(input.toLowerCase()) ||
      curatorship.nameManager.toLowerCase().includes(input.toLowerCase()) ||
      curatorship.client.name_client.toLowerCase().includes(input.toLowerCase()) ||
      curatorship.status_curatorship.toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Curatorship>(this.filteredCuratorships);
  }

  openCuratorshipDialog(curatorship: Curatorship): void {
    const dialogRef = this.dialog.open(CuratorshipFormComponent, {
      data:this.curatorship
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.curatorship.id_curatorship = result.id_curatorship;
        this.curatorship.nameManager = result.nameManager;
        this.curatorship.client = result.client;
        this.curatorship.status_curatorship = result.status_curatorship;
      }
    })
  }  
  
  deleteCuratorship(id_curatorship: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.curatorshipService.deleteCuratorship(id_curatorship).subscribe((data) => {
        this.curatorships = this.curatorships.filter(item => item.id_curatorship!=id_curatorship);
      })
      window.location.reload();
    }
  }

}
