import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Trailer } from '../trailer';
import { TrailerService } from '../../../service/trailer/trailer.service';
import { MatDialog } from '@angular/material/dialog';
import { TrailerFormComponent } from '../trailer-form/trailer-form.component';

@Component({
  selector: 'app-trailer-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './trailer-home.component.html',
  styleUrl: './trailer-home.component.scss'
})
export class TrailerHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_trailer', 'name_trailer', 'number_trailer', 'year_trailer', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Trailer>();
  trailers: Trailer[]=[];
  filteredTrailers: Trailer[]=[];

  /* Trailer dialog */
  id_trailer: any = undefined;
  name_trailer: String = '';
  number_trailer: String = '';
  year_trailer: String = '';

  trailer: Trailer = {
    id_trailer: 0,
    name_trailer: '',
    number_trailer: '',
    year_trailer: '',
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private trailerService: TrailerService) {}

  ngAfterViewInit(): void {
    this.trailerService.fetchAllTrailers().subscribe((data) => {
      this.trailers = data;
      this.dataSource = new MatTableDataSource<Trailer>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchTrailer(input: any) {
    this.filteredTrailers = this.trailers.filter(trailer => 
      trailer.id_trailer.toString().toLowerCase().includes(input.toLowerCase()) ||
      trailer.name_trailer.toLowerCase().includes(input.toLowerCase()) ||
      trailer.number_trailer.toLowerCase().includes(input.toLowerCase()) ||
      trailer.year_trailer.toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Trailer>(this.filteredTrailers);
  }

  openTrailerDialog(trailer: Trailer): void {
    const dialogRef = this.dialog.open(TrailerFormComponent, {
      data:trailer
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.trailer.id_trailer = result.id_trailer;
        this.trailer.name_trailer = result.name_trailer;
        this.trailer.number_trailer = result.number_trailer;
        this.trailer.year_trailer = result.year_trailer;
      }
    })
  }

  deleteTrailer(id_trailer: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.trailerService.deleteTrailer(id_trailer).subscribe((data) => {
        this.trailers = this.trailers.filter(item => item.id_trailer!=id_trailer);
      })
      window.location.reload();
    }
  }

}
