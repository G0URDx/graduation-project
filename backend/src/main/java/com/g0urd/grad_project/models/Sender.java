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
@Table(name = "sender")
public class Sender {

    @Id
    @Column(name = "id_sender")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sender_id_seq")
    @SequenceGenerator(name = "sender_id_seq", sequenceName = "sender_id_seq", allocationSize = 1)
    private Long id_sender;

    @Column(name = "name_sender", unique = false, nullable = false)
    private String name_sender;

    @Column(name = "location_sender", unique = false, nullable = false)
    private String location_sender;

}
