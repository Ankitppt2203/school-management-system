package com.ankit.school_management.dto;

import jakarta.validation.constraints.NotBlank;

public class CourseDTO {

    @NotBlank(
            message = "Course name cannot be empty")
    private String name;

    public CourseDTO() {
    }

    public CourseDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name) {
        this.name = name;
    }
}