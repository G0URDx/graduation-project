package com.g0urd.grad_project.service.VehicleService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Vehicle;
import com.g0urd.grad_project.repository.VehicleRepository;

@Service
public class VehicleServiceImplementation implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public List<Vehicle> fetchAllVehicles() {
        return (List<Vehicle>) vehicleRepository.findAll();
    }

    @Override
    public Vehicle findById(Long id) {
        return vehicleRepository.findById(id).get();
    }

    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @SuppressWarnings("null")
    @Override
    public Vehicle updateVehicle(Vehicle vehicle) {
        Vehicle vehicleObject = vehicleRepository.findById(vehicle.getId_vehicle()).get();
        if (vehicleObject != null) {
            vehicleObject.setName_vehicle(vehicle.getName_vehicle());
            vehicleObject.setNumber_vehicle(vehicle.getNumber_vehicle());
            vehicleObject.setYear_vehicle(vehicle.getYear_vehicle());
            vehicleObject.setEco_vehicle(vehicle.getEco_vehicle());
        }
        return vehicleRepository.save(vehicleObject);
    }

    @Override
    public Boolean deleteVehicle(Long id) {
        Vehicle vehicleObject = vehicleRepository.findById(id).get();
        if (vehicleObject != null) {
            vehicleRepository.delete(vehicleObject);
            return true;
        }
        return false;
    }

}
