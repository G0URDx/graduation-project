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
@Table(name = "cargo")
public class Cargo {

    @Id
    @Column(name = "id_cargo")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cargo_id_seq")
    @SequenceGenerator(name = "cargo_id_seq", sequenceName = "cargo_id_seq", allocationSize = 1)
    private Long id_cargo;

    @Column(name = "name_cargo", unique = false, nullable = false)
    private String name_cargo;

    @Column(name = "ldm_cargo", unique = false, nullable = false)
    private Double ldm_cargo;

    @Column(name = "price_cargo", unique = false, nullable = false)
    private Double price_cargo;

    @Column(name = "gross_cargo", unique = false, nullable = false)
    private Double gross_cargo;

    @Column(name = "max_height_cargo", unique = false, nullable = false)
    private Double max_height_cargo;

    @Column(name = "size_cargo", unique = false, nullable = false)
    private String size_cargo;

    @Column(name = "quantity_cargo", unique = false, nullable = false)
    private Double quantity_cargo;

    @Column(name = "danger_cargo", unique = false, nullable = false)
    private Boolean danger_cargo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sender", nullable = false)
    private Sender sender;

    @Column(name = "location_load_cargo", unique = false, nullable = false)
    private String location_load_cargo;

    @Column(name = "date_load_cargo", unique = false, nullable = false)
    private Date date_load_cargo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_customs", nullable = false)
    private Customs customs;

    @Column(name = "date_customs_cargo", unique = false, nullable = false)
    private Date date_customs_cargo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_recipient", nullable = false)
    private Recipient recipient;

    @Column(name = "location_unload_cargo", unique = false, nullable = false)
    private String location_unload_cargo;

    @Column(name = "date_unload_cargo", unique = false, nullable = false)
    private Date date_unload_cargo;

}
