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
@Table(name = "recipient")
public class Recipient {

    @Id
    @Column(name = "id_recipient")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recipient_id_seq")
    @SequenceGenerator(name = "recipient_id_seq", sequenceName = "recipient_id_seq", allocationSize = 1)
    private Long id_recipient;

    @Column(name = "name_recipient", unique = false, nullable = false)
    private String name_recipient;

    @Column(name = "location_recipient", unique = false, nullable = false)
    private String location_recipient;

}
