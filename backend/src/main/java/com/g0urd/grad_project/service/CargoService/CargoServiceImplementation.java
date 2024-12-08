package com.g0urd.grad_project.service.CargoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Cargo;
import com.g0urd.grad_project.repository.CargoRepository;

@Service
public class CargoServiceImplementation implements CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    @Override
    public List<Cargo> fetchAllCargos() {
        return (List<Cargo>) cargoRepository.findAll();
    }

    @Override
    public Cargo findById(Long id) {
        return cargoRepository.findById(id).get();
    }

    @Override
    public Cargo createCargo(Cargo cargo) {
        return cargoRepository.save(cargo);
    }

    @SuppressWarnings("null")
    @Override
    public Cargo updateCargo(Cargo cargo) {
        Cargo cargoObject = cargoRepository.findById(cargo.getId_cargo()).get();
        if (cargoObject != null) {
            cargoObject.setName_cargo(cargo.getName_cargo());
            cargoObject.setLdm_cargo(cargo.getLdm_cargo());
            cargoObject.setPrice_cargo(cargo.getPrice_cargo());
            cargoObject.setGross_cargo(cargo.getGross_cargo());
            cargoObject.setMax_height_cargo(cargo.getMax_height_cargo());
            cargoObject.setSize_cargo(cargo.getSize_cargo());
            cargoObject.setQuantity_cargo(cargo.getQuantity_cargo());
            cargoObject.setDanger_cargo(cargo.getDanger_cargo());
            cargoObject.setSender(cargo.getSender());
            cargoObject.setLocation_load_cargo(cargo.getLocation_load_cargo());
            cargoObject.setDate_load_cargo(cargo.getDate_load_cargo());
            cargoObject.setCustoms(cargo.getCustoms());
            cargoObject.setDate_customs_cargo(cargo.getDate_customs_cargo());
            cargoObject.setRecipient(cargo.getRecipient());
            cargoObject.setLocation_unload_cargo(cargo.getLocation_unload_cargo());
            cargoObject.setDate_unload_cargo(cargo.getDate_unload_cargo());
        }
        return cargoRepository.save(cargoObject);
    }

    @Override
    public Boolean deleteCargo(Long id) {
        Cargo cargoObject = cargoRepository.findById(id).get();
        if (cargoObject != null) {
            cargoRepository.delete(cargoObject);
            return true;
        }
        return false;
    }

}
