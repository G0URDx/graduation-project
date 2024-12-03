package com.g0urd.grad_project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.g0urd.grad_project.models.Sender;

@Repository
public interface SenderRepository extends CrudRepository<Sender, Long> {

}
