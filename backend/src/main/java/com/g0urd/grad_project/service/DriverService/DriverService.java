package com.g0urd.grad_project.service.DriverService;

import java.util.List;

import com.g0urd.grad_project.models.Driver;

public interface DriverService {

    List<Driver> fetchAllDrivers();

    Driver findById(Long id);

    Driver createDriver(Driver driver);

    Driver updateDriver(Driver driver);

    Boolean deleteDriver(Long id);

}
