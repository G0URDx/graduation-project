package com.g0urd.grad_project.dto;

import lombok.Data;

@Data
public class ClientRequest {
    private String name_client;
    private String location_client;
    private String work_number_client;
    private String tax_number_client;
    private String employee_client;
    private String description_client;
    private String nameManager;
}
