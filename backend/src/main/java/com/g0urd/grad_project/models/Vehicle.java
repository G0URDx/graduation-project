package com.g0urd.grad_project.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @Column(name = "id_vehicle")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "vehicle_id_seq")
    @SequenceGenerator(name = "vehicle_id_seq", sequenceName = "vehicle_id_seq", allocationSize = 1)
    private Long id_vehicle;

    @Column(name = "name_vehicle", unique = false, nullable = false)
    private String name_vehicle;

    @Column(name = "number_vehicle", unique = false, nullable = false)
    private String number_vehicle;

    @Column(name = "year_vehicle", unique = false, nullable = false)
    private String year_vehicle;

    @Column(name = "eco_vehicle", unique = false, nullable = false)
    private Integer eco_vehicle;

}
