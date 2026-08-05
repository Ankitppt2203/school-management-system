package com.ankit.school_management.repository;

import com.ankit.school_management.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {

        // ===============================
        // Unique Checks
        // ===============================

        boolean existsByAdmissionNumber(String admissionNumber);

        Optional<Student> findByAdmissionNumber(String admissionNumber);

        Optional<Student> findByUsername(String username);

        List<Student> findByAdmissionNumberStartingWithIgnoreCaseOrderByIdDesc(String admissionNumberPrefix);

        // ===============================
        // Search
        // ===============================

        Page<Student> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                        String firstName,
                        String lastName,
                        Pageable pageable);

        // ===============================
        // Filters
        // ===============================

        Page<Student> findByAcademicSession(
                        String academicSession,
                        Pageable pageable);

        Page<Student> findByStatus(
                        String status,
                        Pageable pageable);

        Page<Student> findByDepartmentId(
                        Long departmentId,
                        Pageable pageable);

        List<Student> findByCoursesId(Long courseId);
}
