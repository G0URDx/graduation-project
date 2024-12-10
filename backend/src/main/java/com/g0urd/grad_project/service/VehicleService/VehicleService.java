package com.g0urd.grad_project.service.VehicleService;

import java.util.List;
import com.g0urd.grad_project.models.Vehicle;

public interface VehicleService {

    List<Vehicle> fetchAllVehicles();

    Vehicle findById(Long id);

    Vehicle createVehicle(Vehicle vehicle);

    Vehicle updateVehicle(Vehicle vehicle);

    Boolean deleteVehicle(Long id);

}
