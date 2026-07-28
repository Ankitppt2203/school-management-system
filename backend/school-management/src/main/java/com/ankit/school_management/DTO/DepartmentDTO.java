package com.ankit.school_management.dto;

import jakarta.validation.constraints.NotBlank;

public class DepartmentDTO {

    @NotBlank(message = "Department name cannot be empty")
    private String name;

    public DepartmentDTO() {
    }

    public DepartmentDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}