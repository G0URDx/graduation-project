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
import jakarta.persistence.SequenceGenerator;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transportation_offer_id_seq")
    @SequenceGenerator(name = "transportation_offer_id_seq", sequenceName = "transportation_offer_id_seq", allocationSize = 1)
    private Long id_offer;

    @Column(name = "date_offer", unique = false, nullable = false)
    private Date date_offer;

    @Column(name = "name_manager", unique = false, nullable = false)
    private String nameManager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cargo", nullable = false)
    private Cargo cargo;

    @Column(name = "freight_transportation_offer", unique = false, nullable = false)
    private Double freight_transportation_offer;

}
