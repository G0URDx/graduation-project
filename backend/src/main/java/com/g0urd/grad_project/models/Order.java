package com.g0urd.grad_project.models;

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
@Table(name = "orders")
public class Order {

    @Id
    @Column(name = "id_order")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_id_seq")
    @SequenceGenerator(name = "order_id_seq", sequenceName = "order_id_seq", allocationSize = 1)
    private Long id_order;

    // private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_transportation_offer", nullable = false)
    private TransportationOffer transportationOffer;

    @Column(name = "id_client_order", unique = false, nullable = false)
    private String id_client_order;

    @Column(name = "payment_terms_order", unique = false, nullable = false)
    private String payment_terms_order;

    @Column(name = "freight_order", unique = false, nullable = false)
    private Double freight_order;

    @Column(name = "account_currency_order", unique = false, nullable = false)
    private String account_currency_order;

    @Column(name = "payment_currency_order", unique = false, nullable = false)
    private String payment_currency_order;

    @Column(name = "description_order", unique = false, nullable = false)
    private String description_order;

    // documents

}
