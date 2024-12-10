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
@Table(name = "client")
public class Client {

    @Id
    @Column(name = "id_client")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "client_id_seq")
    @SequenceGenerator(name = "client_id_seq", sequenceName = "client_id_seq", allocationSize = 1)
    private Long id_client;

    @Column(name = "name_client", unique = false, nullable = false)
    private String name_client;

    @Column(name = "location_client", unique = false, nullable = false)
    private String location_client;

    @Column(name = "work_number_client", unique = false, nullable = false)
    private String work_number_client;

    @Column(name = "tax_number_client", unique = false, nullable = false)
    private String tax_number_client;

    @Column(name = "employee_client", unique = false, nullable = false)
    private String employee_client;

    @Column(name = "description_client", unique = false, nullable = false)
    private String description_client;

    // @Column(name = "agreement_client", unique = false, nullable = false)
    // private String agreement_client;

    // @Column(name = "id_curator", unique = false, nullable = false)
    // private String id_curator;
}
