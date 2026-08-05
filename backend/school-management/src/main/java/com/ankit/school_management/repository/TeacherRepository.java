package com.ankit.school_management.repository;

import com.ankit.school_management.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository
        extends JpaRepository<Teacher, Long> {

    java.util.Optional<Teacher> findByUsername(String username);

    List<Teacher> findByName(String name);

    List<Teacher> findBySubject(String subject);

    List<Teacher> findBySalaryGreaterThan(
            double salary);

    List<Teacher> findByNameContaining(
            String name);

    List<Teacher> findByNameAndSubject(
            String name,
            String subject);

    List<Teacher> findByDepartmentId(
            Long departmentId);
}
