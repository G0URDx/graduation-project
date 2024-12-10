package com.g0urd.grad_project.service.TrailerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Trailer;
import com.g0urd.grad_project.repository.TrailerRepository;

@Service
public class TrailerServiceImplemetation implements TrailerService {

    @Autowired
    private TrailerRepository trailerRepository;

    @Override
    public List<Trailer> fetchAllTrailers() {
        return (List<Trailer>) trailerRepository.findAll();
    }

    @Override
    public Trailer findById(Long id) {
        return trailerRepository.findById(id).get();
    }

    @Override
    public Trailer createTrailer(Trailer trailer) {
        return trailerRepository.save(trailer);
    }

    @SuppressWarnings("null")
    @Override
    public Trailer updateTrailer(Trailer trailer) {
        Trailer trailerObject = trailerRepository.findById(trailer.getId_trailer()).get();
        if (trailerObject != null) {
            trailerObject.setName_trailer(trailer.getName_trailer());
            trailerObject.setNumber_trailer(trailer.getNumber_trailer());
            trailerObject.setYear_trailer(trailer.getYear_trailer());
        }
        return trailerRepository.save(trailerObject);
    }

    @Override
    public Boolean deleteTrailer(Long id) {
        Trailer trailerObject = trailerRepository.findById(id).get();
        if (trailerObject != null) {
            trailerRepository.delete(trailerObject);
            return true;
        }
        return false;
    }

}
