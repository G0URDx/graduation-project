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
@Table(name = "trailer")
public class Trailer {

    @Id
    @Column(name = "id_trailer")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trailer_id_seq")
    @SequenceGenerator(name = "trailer_id_seq", sequenceName = "trailer_id_seq", allocationSize = 1)
    private Long id_trailer;

    @Column(name = "name_trailer", unique = false, nullable = false)
    private String name_trailer;

    @Column(name = "number_trailer", unique = false, nullable = false)
    private String number_trailer;

    @Column(name = "year_trailer", unique = false, nullable = false)
    private String year_trailer;

}
