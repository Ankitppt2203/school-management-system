package com.ankit.school_management.dto;

/** A student displayed in the department-filtered attendance roster. */
public record AttendanceStudentDTO(
        Long id,
        String firstName,
        String lastName,
        String rollNumber,
        String userId,
        Long departmentId,
        String departmentName) { }
