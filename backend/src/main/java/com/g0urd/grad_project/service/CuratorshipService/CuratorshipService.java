package com.g0urd.grad_project.service.CuratorshipService;

import java.util.List;

import com.g0urd.grad_project.models.Curatorship;

public interface CuratorshipService {

    List<Curatorship> fetchAllCuratorships();

    Curatorship findById(Long id);

    Curatorship createCuratorship(Curatorship curatorship);

    Curatorship updateCuratorship(Curatorship curatorship);

    Boolean deleteCuratorship(Long id);

    void deleteByClientId(Long clientId);

}
