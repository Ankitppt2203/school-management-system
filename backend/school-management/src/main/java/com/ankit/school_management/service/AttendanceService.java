package com.ankit.school_management.service;

import com.ankit.school_management.dto.AttendanceDTO;
import com.ankit.school_management.entity.Attendance;
import com.ankit.school_management.entity.AttendanceStatus;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.exception.AttendanceNotFoundException;
import com.ankit.school_management.exception.StudentNotFoundException;
import com.ankit.school_management.repository.AttendanceRepository;
import com.ankit.school_management.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository,
            StudentRepository studentRepository) {

        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
    }

    // Create Attendance
    public AttendanceDTO saveAttendance(
            AttendanceDTO attendanceDTO) {

        Student student =
                studentRepository.findById(
                                attendanceDTO.getStudentId())
                        .orElseThrow(() ->
                                new StudentNotFoundException(
                                        "Student not found"));

        Attendance attendance = new Attendance();

        attendance.setDate(attendanceDTO.getDate());
        attendance.setStatus(attendanceDTO.getStatus());
        attendance.setStudent(student);

        Attendance savedAttendance =
                attendanceRepository.save(attendance);

        return new AttendanceDTO(
                savedAttendance.getDate(),
                savedAttendance.getStatus(),
                savedAttendance.getStudent().getId());
    }

    // Get All Attendance
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // Get Attendance By Id
    public Attendance getAttendanceById(
            Long id) {

        return attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new AttendanceNotFoundException(
                                "Attendance not found"));
    }

    // Update Attendance
    public AttendanceDTO updateAttendance(
            Long id,
            AttendanceDTO attendanceDTO) {

        Attendance attendance =
                attendanceRepository.findById(id)
                        .orElseThrow(() ->
                                new AttendanceNotFoundException(
                                        "Attendance not found"));

        Student student =
                studentRepository.findById(
                                attendanceDTO.getStudentId())
                        .orElseThrow(() ->
                                new StudentNotFoundException(
                                        "Student not found"));

        attendance.setDate(attendanceDTO.getDate());
        attendance.setStatus(attendanceDTO.getStatus());
        attendance.setStudent(student);

        Attendance updatedAttendance =
                attendanceRepository.save(attendance);

        return new AttendanceDTO(
                updatedAttendance.getDate(),
                updatedAttendance.getStatus(),
                updatedAttendance.getStudent().getId());
    }

    // Delete Attendance
    public void deleteAttendance(Long id) {

        Attendance attendance =
                attendanceRepository.findById(id)
                        .orElseThrow(() ->
                                new AttendanceNotFoundException(
                                        "Attendance not found"));

        attendanceRepository.delete(attendance);
    }

    // Get Attendance By Student
    public List<Attendance> getAttendanceByStudent(
            Long studentId) {

        return attendanceRepository.findByStudentId(studentId);
    }

    // Get Attendance By Date
    public List<Attendance> getAttendanceByDate(
            LocalDate date) {

        return attendanceRepository.findByDate(date);
    }

    // Get Attendance By Status
    public List<Attendance> getAttendanceByStatus(
            AttendanceStatus status) {

        return attendanceRepository.findByStatus(status);
    }

    // Get Attendance By Student and Date
    public List<Attendance> getAttendanceByStudentAndDate(
            Long studentId,
            LocalDate date) {

        return attendanceRepository.findByStudentIdAndDate(
                studentId,
                date);
    }
}