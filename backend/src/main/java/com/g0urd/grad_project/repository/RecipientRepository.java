package com.g0urd.grad_project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.g0urd.grad_project.models.Recipient;

@Repository
public interface RecipientRepository extends CrudRepository<Recipient, Long> {

}
