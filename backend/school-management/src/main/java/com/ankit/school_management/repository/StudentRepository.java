package com.ankit.school_management.repository;

import com.ankit.school_management.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // ===============================
    // Unique Checks
    // ===============================

    boolean existsByAdmissionNumber(String admissionNumber);

    boolean existsByRollNumber(String rollNumber);

    Optional<Student> findByAdmissionNumber(String admissionNumber);

    // ===============================
    // Search
    // ===============================

    Page<Student> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            String firstName,
            String lastName,
            Pageable pageable
    );

    // ===============================
    // Filters
    // ===============================

    Page<Student> findByAcademicSession(
            String academicSession,
            Pageable pageable
    );

    Page<Student> findByStatus(
            String status,
            Pageable pageable
    );

    Page<Student> findByDepartmentId(
            Long departmentId,
            Pageable pageable
    );
}