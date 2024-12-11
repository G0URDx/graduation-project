import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../../../service/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule,],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss'
})
export class VehicleFormComponent {

  readonly dialogRef = inject(MatDialogRef<VehicleFormComponent>)
  data = inject<Vehicle>(MAT_DIALOG_DATA)

  constructor(private vehicleService: VehicleService) {}

  addOrEditVehicle(vehicle: Vehicle) {
    if(vehicle.id_vehicle !== 0) {
      this.vehicleService.updateVehicle(vehicle).subscribe({
        next:(data) => {
          console.log("Vehicle update Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.vehicleService.createVehicle(vehicle).subscribe({
        next:(data) => {
          console.log("Vehicle created Successfully")
          window.location.reload();
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }

}
