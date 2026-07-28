package com.ankit.school_management.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TeacherDTO {

    @NotBlank(message = "Teacher name cannot be empty")
    private String name;

    @NotBlank(message = "Subject cannot be empty")
    private String subject;

    @Min(
            value = 1,
            message = "Salary must be greater than 0")
    private double salary;

    @NotNull(
            message = "Department Id is required")
    private Long departmentId;

    public TeacherDTO() {
    }

    public TeacherDTO(
            String name,
            String subject,
            double salary,
            Long departmentId) {

        this.name = name;
        this.subject = subject;
        this.salary = salary;
        this.departmentId = departmentId;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(
            String subject) {
        this.subject = subject;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(
            double salary) {
        this.salary = salary;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(
            Long departmentId) {
        this.departmentId = departmentId;
    }
}