package com.g0urd.grad_project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.g0urd.grad_project.models.Cargo;

@Repository
public interface CargoRepository extends CrudRepository<Cargo, Long> {

}
