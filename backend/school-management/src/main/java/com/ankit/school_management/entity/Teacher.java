package com.ankit.school_management.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;
import java.util.HashMap;

@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Teacher name cannot be empty")
    private String name;

    @NotBlank(message = "Subject cannot be empty")
    private String subject;

    @Min(value = 1, message = "Salary must be greater than 0")
    private double salary;

    @Column(unique = true)
    private String username;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "teacher_profile_details", joinColumns = @JoinColumn(name = "teacher_id"))
    @MapKeyColumn(name = "detail_key")
    @Column(name = "detail_value", length = 2000)
    private Map<String, String> profileDetails = new HashMap<>();

    @JsonBackReference("department-teacher")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    public Teacher() {
    }

    public Teacher(
            String name,
            String subject,
            double salary,
            Department department) {

        this.name = name;
        this.subject = subject;
        this.salary = salary;
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Map<String, String> getProfileDetails() { return profileDetails; }
    public void setProfileDetails(Map<String, String> profileDetails) { this.profileDetails = profileDetails; }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}
