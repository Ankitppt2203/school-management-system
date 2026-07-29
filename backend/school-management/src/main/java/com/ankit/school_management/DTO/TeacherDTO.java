package com.ankit.school_management.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

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
    private String username;
    @Size(min = 6, message = "Password must contain at least 6 characters")
    private String password;
    private java.util.Map<String, String> profileDetails;

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
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public java.util.Map<String, String> getProfileDetails() { return profileDetails; }
    public void setProfileDetails(java.util.Map<String, String> profileDetails) { this.profileDetails = profileDetails; }
}
