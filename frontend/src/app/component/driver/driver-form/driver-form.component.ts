import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DriverService } from '../../../service/driver/driver.service';
import { Driver } from '../driver';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverFormComponent {

  readonly dialogRef = inject(MatDialogRef<DriverFormComponent>)
  data = inject<Driver>(MAT_DIALOG_DATA)

  constructor(private driverService: DriverService) {}

  addOrEditDriver(driver: Driver) {
    if(driver.id_driver !== 0) {
      this.driverService.updateDriver(driver).subscribe({
        next:(data) => {
          console.log("Driver update Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.driverService.createDriver(driver).subscribe({
        next:(data) => {
          console.log("Driver created Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }

}
