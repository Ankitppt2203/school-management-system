package com.ankit.school_management.dto.student;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class StudentRequestDTO {

    @NotBlank(message = "Admission number is required")
    private String admissionNumber;
    private String rollNumber;
    @NotBlank(message = "First name is required")
    private String firstName;
    private String middleName;
    @NotBlank(message = "Last name is required")
    private String lastName;
    private String gender;
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;
    @NotBlank(message = "Academic session is required")
    private String academicSession;
    @NotNull(message = "Admission date is required")
    private LocalDate admissionDate;
    private String status;
    @NotNull(message = "Department is required")
    private Long departmentId;
    private java.util.List<Long> courseIds;
    @Size(min = 6, message = "Password must contain at least 6 characters")
    private String password;
    private String username;
    private java.util.Map<String, String> admissionDetails;

    public StudentRequestDTO() { }

    public StudentRequestDTO(String admissionNumber, String rollNumber, String firstName, String middleName,
                             String lastName, String gender, LocalDate dateOfBirth, String academicSession,
                             LocalDate admissionDate, String status, Long departmentId) {
        this.admissionNumber = admissionNumber;
        this.rollNumber = rollNumber;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.academicSession = academicSession;
        this.admissionDate = admissionDate;
        this.status = status;
        this.departmentId = departmentId;
    }
    public String getAdmissionNumber() { return admissionNumber; }
    public void setAdmissionNumber(String admissionNumber) { this.admissionNumber = admissionNumber; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getMiddleName() { return middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getAcademicSession() { return academicSession; }
    public void setAcademicSession(String academicSession) { this.academicSession = academicSession; }
    public LocalDate getAdmissionDate() { return admissionDate; }
    public void setAdmissionDate(LocalDate admissionDate) { this.admissionDate = admissionDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
    public java.util.List<Long> getCourseIds() { return courseIds; }
    public void setCourseIds(java.util.List<Long> courseIds) { this.courseIds = courseIds; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public java.util.Map<String, String> getAdmissionDetails() { return admissionDetails; }
    public void setAdmissionDetails(java.util.Map<String, String> admissionDetails) { this.admissionDetails = admissionDetails; }
}
