package com.g0urd.grad_project.service.CargoService;

import java.util.List;

import com.g0urd.grad_project.models.Cargo;

public interface CargoService {

    List<Cargo> fetchAllCargos();

    Cargo findById(Long id);

    Cargo createCargo(Cargo cargo);

    Cargo updateCargo(Cargo cargo);

    Boolean deleteCargo(Long id);

}
