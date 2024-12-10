package com.g0urd.grad_project.service.DriverService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Driver;
import com.g0urd.grad_project.repository.DriverRepository;

@Service
public class DriverServiceImplementation implements DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Override
    public List<Driver> fetchAllDrivers() {
        return (List<Driver>) driverRepository.findAll();
    }

    @Override
    public Driver findById(Long id) {
        return driverRepository.findById(id).get();
    }

    @Override
    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    @SuppressWarnings("null")
    @Override
    public Driver updateDriver(Driver driver) {
        Driver driverObject = driverRepository.findById(driver.getId_driver()).get();
        if (driverObject != null) {
            driverObject.setName_native_driver(driver.getName_native_driver());
            driverObject.setName_english_driver(driver.getName_english_driver());
            driverObject.setBirthday_driver(driver.getBirthday_driver());
            driverObject.setPrivate_number_driver(driver.getPrivate_number_driver());
            driverObject.setWork_number_driver(driver.getWork_number_driver());
            driverObject.setDescription_driver(driver.getDescription_driver());
        }
        return driverRepository.save(driverObject);
    }

    @Override
    public Boolean deleteDriver(Long id) {
        Driver driverObject = driverRepository.findById(id).get();
        if (driverObject != null) {
            driverRepository.delete(driverObject);
            return true;
        }
        return false;
    }

}
