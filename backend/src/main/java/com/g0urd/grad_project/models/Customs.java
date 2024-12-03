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
@Table(name = "customs")
public class Customs {

    @Id
    @Column(name = "id_customs")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customs_id_seq")
    @SequenceGenerator(name = "customs_id_seq", sequenceName = "customs_id_seq", allocationSize = 1)
    private Long id_customs;

    @Column(name = "name_customs", unique = false, nullable = false)
    private String name_customs;

    @Column(name = "location_customs", unique = false, nullable = false)
    private String location_customs;

}
