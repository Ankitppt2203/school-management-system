package com.ankit.school_management.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@Entity
@Table(
        name = "students",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_student_admission_number", columnNames = "admission_number")
        }
)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===============================
    // Student Identity
    // ===============================

    @NotBlank(message = "Admission number is required")
    @Column(name = "admission_number", nullable = false, unique = true)
    private String admissionNumber;

    @Column(name = "roll_number", unique = true)
    private String rollNumber;

    @NotBlank(message = "First name is required")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @NotBlank(message = "Last name is required")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    // ===============================
    // Personal Information
    // ===============================

    @Column(name = "gender")
    private String gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    // ===============================
    // Academic Information
    // ===============================

    @NotBlank(message = "Academic session is required")
    @Column(name = "academic_session", nullable = false)
    private String academicSession;

    @Column(name = "admission_date", nullable = false)
    private LocalDate admissionDate;

    @Column(name = "student_status")
    private String status = "ACTIVE";

    @Column(name = "username", unique = true)
    private String username;

    /** Additional admission, parent, contact, medical, transport and hostel details. */
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "student_admission_details", joinColumns = @JoinColumn(name = "student_id"))
    @MapKeyColumn(name = "detail_key")
    @Column(name = "detail_value", length = 2000)
    private Map<String, String> admissionDetails = new HashMap<>();

    // ===============================
    // Relationships
    // ===============================

    @JsonBackReference("department-student")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @JsonManagedReference("student-course")
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "student_course",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses = new ArrayList<>();

    @JsonManagedReference("student-attendance")
    @OneToMany(
            mappedBy = "student",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<Attendance> attendanceRecords;

    @JsonManagedReference("student-result")
    @OneToMany(
            mappedBy = "student",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<Result> results;

    // ===============================
    // Constructors
    // ===============================

    public Student() {
    }

    // ===============================
    // Getters and Setters
    // ===============================

    public Long getId() {
        return id;
    }

    public String getAdmissionNumber() {
        return admissionNumber;
    }

    public void setAdmissionNumber(String admissionNumber) {
        this.admissionNumber = admissionNumber;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAcademicSession() {
        return academicSession;
    }

    public void setAcademicSession(String academicSession) {
        this.academicSession = academicSession;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Map<String, String> getAdmissionDetails() { return admissionDetails; }
    public void setAdmissionDetails(Map<String, String> admissionDetails) { this.admissionDetails = admissionDetails; }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public List<Attendance> getAttendanceRecords() {
        return attendanceRecords;
    }

    public void setAttendanceRecords(List<Attendance> attendanceRecords) {
        this.attendanceRecords = attendanceRecords;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public String getFullName() {
        return String.join(" ", firstName, middleName == null ? "" : middleName.trim(), lastName)
                .trim()
                .replaceAll("\\s+", " ");
    }
}
