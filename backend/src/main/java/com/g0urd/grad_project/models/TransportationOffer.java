package com.g0urd.grad_project.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "transportation_offer")
public class TransportationOffer {

    @Id
    @Column(name = "id_transportation_offer")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_offer;

    @Column(name = "date_offer", unique = false, nullable = false)
    private Date date_offer;

    // private String id_manager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @Column(name = "location_load_transportation_offer", unique = false, nullable = false)
    private String location_load_transportation_offer;

    @Column(name = "location_unload_transportation_offer", unique = false, nullable = false)
    private String location_unload_transportation_offer;

    @Column(name = "freight_transportation_offer", unique = false, nullable = false)
    private Double freight_transportation_offer;

}
