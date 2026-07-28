package com.ankit.school_management.dto;

import com.ankit.school_management.entity.AttendanceStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class AttendanceDTO {

    @NotNull(message = "Attendance date is required")
    private LocalDate date;

    @NotNull(message = "Attendance status is required")
    private AttendanceStatus status;

    @NotNull(message = "Student Id is required")
    private Long studentId;

    public AttendanceDTO() {
    }

    public AttendanceDTO(
            LocalDate date,
            AttendanceStatus status,
            Long studentId) {

        this.date = date;
        this.status = status;
        this.studentId = studentId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
}