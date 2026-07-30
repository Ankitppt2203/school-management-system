package com.ankit.school_management.dto;

import com.ankit.school_management.entity.AttendanceStatus;

import java.time.LocalDate;

/** Attendance data enriched with the student information needed by the attendance roster. */
public record AttendanceResponseDTO(
        Long id,
        LocalDate date,
        AttendanceStatus status,
        Long studentId,
        String firstName,
        String lastName,
        String rollNumber,
        String userId,
        Long departmentId,
        String departmentName) { }
