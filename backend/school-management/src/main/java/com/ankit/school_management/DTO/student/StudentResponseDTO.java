package com.ankit.school_management.dto.student;

import java.time.LocalDate;

public class StudentResponseDTO {
    private Long id;
    private String admissionNumber;
    private String rollNumber;
    private String fullName;
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private LocalDate dateOfBirth;
    private Long departmentId;
    private String departmentName;
    private String academicSession;
    private LocalDate admissionDate;
    private String status;
    private java.util.List<Long> courseIds;
    private java.util.List<String> courseNames;
    private String username;
    private java.util.Map<String, String> admissionDetails;

    public StudentResponseDTO() { }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAdmissionNumber() { return admissionNumber; }
    public void setAdmissionNumber(String admissionNumber) { this.admissionNumber = admissionNumber; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
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
    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
    public String getAcademicSession() { return academicSession; }
    public void setAcademicSession(String academicSession) { this.academicSession = academicSession; }
    public LocalDate getAdmissionDate() { return admissionDate; }
    public void setAdmissionDate(LocalDate admissionDate) { this.admissionDate = admissionDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public java.util.List<Long> getCourseIds() { return courseIds; }
    public void setCourseIds(java.util.List<Long> courseIds) { this.courseIds = courseIds; }
    public java.util.List<String> getCourseNames() { return courseNames; }
    public void setCourseNames(java.util.List<String> courseNames) { this.courseNames = courseNames; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public java.util.Map<String, String> getAdmissionDetails() { return admissionDetails; }
    public void setAdmissionDetails(java.util.Map<String, String> admissionDetails) { this.admissionDetails = admissionDetails; }
}
