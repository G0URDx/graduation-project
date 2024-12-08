package com.g0urd.grad_project.service.TransportationOfferService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.TransportationOffer;
import com.g0urd.grad_project.repository.TransportationOfferRepository;

@Service
public class TransportationOfferServiceImplementation implements TransportationOfferService {

    @Autowired
    private TransportationOfferRepository transportationOfferRepository;

    @Override
    public List<TransportationOffer> fetchAllTransportationOffers() {
        return (List<TransportationOffer>) transportationOfferRepository.findAll();
    }

    @Override
    public TransportationOffer findById(Long id) {
        return transportationOfferRepository.findById(id).get();
    }

    @Override
    public TransportationOffer createTransportationOffer(TransportationOffer transportationOffer) {
        return transportationOfferRepository.save(transportationOffer);
    }

    @SuppressWarnings("null")
    @Override
    public TransportationOffer updateTransportationOffer(TransportationOffer transportationOffer) {
        TransportationOffer transportationOfferObject = transportationOfferRepository
                .findById(transportationOffer.getId_offer()).get();
        if (transportationOfferObject != null) {
            transportationOfferObject.setDate_offer(transportationOffer.getDate_offer());
            transportationOfferObject.setClient(transportationOffer.getClient());
            transportationOfferObject.setCargo(transportationOffer.getCargo());
            transportationOfferObject
                    .setFreight_transportation_offer(transportationOffer.getFreight_transportation_offer());
        }
        return transportationOfferRepository.save(transportationOfferObject);
    }

    @Override
    public Boolean deleteTransportationOffer(Long id) {
        TransportationOffer transportationOfferObject = transportationOfferRepository.findById(id).get();
        if (transportationOfferObject != null) {
            transportationOfferRepository.delete(transportationOfferObject);
            return true;
        }
        return false;
    }

}
