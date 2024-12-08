import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recipient } from '../recipient';
import { MatDialog } from '@angular/material/dialog';
import { RecipientService } from '../../../service/recipient/recipient.service';
import { RecipientFormComponent } from '../recipient-form/recipient-form.component';

@Component({
  selector: 'app-recipient-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './recipient-home.component.html',
  styleUrl: './recipient-home.component.scss'
})
export class RecipientHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_recipient', 'name_recipient', 'location_recipient', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Recipient>();
  recipients: Recipient[]=[];
  filteredRecipients: Recipient[]=[];

  /* Recipient dialog */
  id_recipient: any = undefined;
  name_recipient: String = '';
  location_recipient: String = '';

  recipient: Recipient = {
    id_recipient: 0,
    name_recipient: '',
    location_recipient: '',
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private recipientService: RecipientService) {}

  ngAfterViewInit(): void {
    this.recipientService.fetchAllRecipients().subscribe((data) => {
      this.recipients = data;
      this.dataSource = new MatTableDataSource<Recipient>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchRecipient(input: any) {
    this.filteredRecipients = this.recipients.filter(recipient => 
      recipient.id_recipient.toString().toLowerCase().includes(input.toLowerCase()) ||
      recipient.name_recipient.toLowerCase().includes(input.toLowerCase()) ||
      recipient.location_recipient.toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Recipient>(this.filteredRecipients);
  }

  openRecipientDialog(recipient: Recipient): void {
    const dialogRef = this.dialog.open(RecipientFormComponent, {
      data:recipient
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.recipient.id_recipient = result.id_recipient;
        this.recipient.name_recipient = result.name_recipient;
        this.recipient.location_recipient = result.location_recipient;
      }
    })
  }

  deleteRecipient(id_recipient: Number) {
    const isConfirmed = window.confirm("Delete item?");
    if(isConfirmed){
      this.recipientService.deleteRecipient(id_recipient).subscribe((data) => {
        this.recipients = this.recipients.filter(item => item.id_recipient!=id_recipient);
      })
      window.location.reload();
    }
  }

}
