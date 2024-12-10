package com.g0urd.grad_project.service.TrailerService;

import java.util.List;

import com.g0urd.grad_project.models.Trailer;

public interface TrailerService {

    List<Trailer> fetchAllTrailers();

    Trailer findById(Long id);

    Trailer createTrailer(Trailer trailer);

    Trailer updateTrailer(Trailer trailer);

    Boolean deleteTrailer(Long id);

}
