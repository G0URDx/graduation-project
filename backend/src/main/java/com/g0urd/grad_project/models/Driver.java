package com.g0urd.grad_project.models;

import java.sql.Date;

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
@Table(name = "driver")
public class Driver {

    @Id
    @Column(name = "id_driver")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "driver_id_seq")
    @SequenceGenerator(name = "driver_id_seq", sequenceName = "driver_id_seq", allocationSize = 1)
    private Long id_driver;

    @Column(name = "name_native_driver", unique = false, nullable = false)
    private String name_native_driver;

    @Column(name = "name_english_driver", unique = false, nullable = false)
    private String name_english_driver;

    @Column(name = "birthday_driver", unique = false, nullable = false)
    private Date birthday_driver;

    // passport

    @Column(name = "private_number_driver", unique = false, nullable = false)
    private String private_number_driver;

    @Column(name = "work_number_driver", unique = false, nullable = false)
    private String work_number_driver;

    @Column(name = "description_driver", unique = false, nullable = false)
    private String description_driver;

}
