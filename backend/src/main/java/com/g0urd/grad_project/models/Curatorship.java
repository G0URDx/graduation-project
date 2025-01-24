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
@Table(name = "curatorship")
public class Curatorship {

    @Id
    @Column(name = "id_curatorship")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "curatorship_id_seq")
    @SequenceGenerator(name = "curatorship_id_seq", sequenceName = "curatorship_id_seq", allocationSize = 1)
    private Long id_curatorship;

    @Column(name = "name_manager", unique = false, nullable = false)
    private String nameManager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @Column(name = "status_curatorship", unique = false, nullable = false)
    private String status_curatorship;

}
