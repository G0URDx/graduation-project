import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customs } from '../customs';
import { MatDialog } from '@angular/material/dialog';
import { CustomsService } from '../../../service/customs/customs.service';
import { CustomsFormComponent } from '../customs-form/customs-form.component';

@Component({
  selector: 'app-customs-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './customs-home.component.html',
  styleUrl: './customs-home.component.scss'
})
export class CustomsHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_customs', 'name_customs', 'location_customs', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Customs>();
  customs: Customs[]=[];
  filteredCustoms: Customs[]=[];

  /* Customs dialog */
  id_customs: any = undefined;
  name_customs: String = '';
  location_customs: String = '';

  customes: Customs = {
    id_customs: 0,
    name_customs: '',
    location_customs: ''
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private customsService: CustomsService) {}

  ngAfterViewInit(): void {
    this.customsService.fetchAllCustoms().subscribe((data) => {
      this.customs = data;
      this.dataSource = new MatTableDataSource<Customs>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchCustoms(input: any) {
    this.filteredCustoms = this.customs.filter(customes => 
      customes.id_customs.toString().toLowerCase().includes(input.toLowerCase()) ||
      customes.name_customs.toLowerCase().includes(input.toLowerCase()) ||
      customes.location_customs.toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Customs>(this.filteredCustoms);
  }

  openCustomsDialog(customes: Customs): void {
    const dialogRef = this.dialog.open(CustomsFormComponent, {
      data:customes
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.customes.id_customs = result.id_customs;
        this.customes.name_customs = result.name_customs;
        this.customes.location_customs = result.location_customs;
      }
    })
  }

  deleteCustoms(id_customs: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.customsService.deleteCustoms(id_customs).subscribe((data) => {
        this.customs = this.customs.filter(item => item.id_customs!=id_customs);
      })
      window.location.reload();
    }
  }

}
