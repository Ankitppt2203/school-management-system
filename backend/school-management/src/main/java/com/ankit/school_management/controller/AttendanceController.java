package com.ankit.school_management.controller;

import com.ankit.school_management.dto.AttendanceDTO;
import com.ankit.school_management.entity.Attendance;
import com.ankit.school_management.entity.AttendanceStatus;
import com.ankit.school_management.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {

        this.attendanceService = attendanceService;
    }

    // Create Attendance
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public AttendanceDTO addAttendance(
            @Valid
            @RequestBody AttendanceDTO attendanceDTO) {

        return attendanceService.saveAttendance(attendanceDTO);
    }

    // Get All Attendance
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Attendance> getAttendance() {

        return attendanceService.getAllAttendance();
    }

    // Get Attendance By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public Attendance getAttendanceById(
            @PathVariable Long id) {

        return attendanceService.getAttendanceById(id);
    }

    // Update Attendance
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public AttendanceDTO updateAttendance(
            @PathVariable Long id,
            @Valid
            @RequestBody AttendanceDTO attendanceDTO) {

        return attendanceService.updateAttendance(
                id,
                attendanceDTO);
    }

    // Delete Attendance
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return "Attendance deleted successfully";
    }

    // Get Attendance By Student
    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Attendance> getAttendanceByStudent(
            @PathVariable Long studentId) {

        return attendanceService.getAttendanceByStudent(studentId);
    }

    // Get Attendance By Date
    @GetMapping("/date/{date}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Attendance> getAttendanceByDate(
            @PathVariable LocalDate date) {

        return attendanceService.getAttendanceByDate(date);
    }

    // Get Attendance By Status
    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Attendance> getAttendanceByStatus(
            @PathVariable AttendanceStatus status) {

        return attendanceService.getAttendanceByStatus(status);
    }

    // Get Attendance By Student and Date
    @GetMapping("/student/{studentId}/date/{date}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Attendance> getAttendanceByStudentAndDate(
            @PathVariable Long studentId,
            @PathVariable LocalDate date) {

        return attendanceService.getAttendanceByStudentAndDate(
                studentId,
                date);
    }
}