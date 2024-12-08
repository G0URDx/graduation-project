import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Customs } from '../customs';
import { CustomsService } from '../../../service/customs/customs.service';

@Component({
  selector: 'app-customs-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './customs-form.component.html',
  styleUrl: './customs-form.component.scss'
})
export class CustomsFormComponent {

  readonly dialogRef = inject(MatDialogRef<CustomsFormComponent>)
  data = inject<Customs>(MAT_DIALOG_DATA)

  constructor(private customsService: CustomsService) {}

  addOrEditCustoms(customes: Customs) {
    if(customes.id_customs !== 0) {
      this.customsService.updateCustoms(customes).subscribe({
        next:(data) => {
          console.log("Customs update Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.customsService.createCustoms(customes).subscribe({
        next:(data) => {
          console.log("Customs created Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }
}
