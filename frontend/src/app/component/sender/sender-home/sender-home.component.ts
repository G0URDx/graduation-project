import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sender } from '../sender';
import { MatDialog } from '@angular/material/dialog';
import { SenderService } from '../../../service/sender/sender.service';
import { SenderFormComponent } from '../sender-form/sender-form.component';

@Component({
  selector: 'app-sender-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './sender-home.component.html',
  styleUrl: './sender-home.component.scss'
})
export class SenderHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_sender', 'name_sender', 'location_sender', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Sender>();
  senders: Sender[]=[];
  filteredSenders: Sender[]=[];

  /* Sender dialog */
  id_sender: any = undefined;
  name_sender: String = '';
  location_sender: String = '';

  sender: Sender = {
    id_sender: 0,
    name_sender: '',
    location_sender: '',
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private senderService: SenderService) {}

  ngAfterViewInit(): void {
    this.senderService.fetchAllSenders().subscribe((data) => {
      this.senders = data;
      this.dataSource = new MatTableDataSource<Sender>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchSender(input: any) {
    this.filteredSenders = this.senders.filter(sender => 
      sender.id_sender.toString().toLowerCase().includes(input.toLowerCase()) ||
      sender.name_sender.toLowerCase().includes(input.toLowerCase()) ||
      sender.location_sender.toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Sender>(this.filteredSenders);
  }

  openSenderDialog(sender: Sender): void {
    const dialogRef = this.dialog.open(SenderFormComponent, {
      data:sender
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.sender.id_sender = result.id_sender;
        this.sender.name_sender = result.name_sender;
        this.sender.location_sender = result.location_sender;
      }
    })
  }

  deleteSender(id_sender: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.senderService.deleteSender(id_sender).subscribe((data) => {
        this.senders = this.senders.filter(item => item.id_sender!=id_sender);
      })
      window.location.reload();
    }
  }

}
