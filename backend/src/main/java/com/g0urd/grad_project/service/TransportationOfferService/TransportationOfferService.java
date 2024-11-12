package com.g0urd.grad_project.service.TransportationOfferService;

import java.util.List;

import com.g0urd.grad_project.models.TransportationOffer;

public interface TransportationOfferService {

    List<TransportationOffer> fetchAllTransportationOffers();

    TransportationOffer findById(Long id);

    TransportationOffer createTransportationOffer(TransportationOffer transportationOffer);

    TransportationOffer updateTransportationOffer(TransportationOffer transportationOffer);

    Boolean deleteTransportationOffer(Long id);

}
