import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Trailer } from '../trailer';
import { TrailerService } from '../../../service/trailer/trailer.service';

@Component({
  selector: 'app-trailer-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './trailer-form.component.html',
  styleUrl: './trailer-form.component.scss'
})
export class TrailerFormComponent {

  readonly dialogRef = inject(MatDialogRef<TrailerFormComponent>)
  data = inject<Trailer>(MAT_DIALOG_DATA)

  constructor(private trailerService: TrailerService) {}

  addOrEditTrailer(trailer: Trailer) {
    if(trailer.id_trailer !== 0) {
      this.trailerService.updateTrailer(trailer).subscribe({
        next:(data) => {
          console.log("Trailer update Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.trailerService.createTrailer(trailer).subscribe({
        next:(data) => {
          console.log("Trailer created Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }

}
