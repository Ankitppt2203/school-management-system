package com.ankit.school_management.service;

import com.ankit.school_management.dto.AttendanceDTO;
import com.ankit.school_management.dto.AttendanceResponseDTO;
import com.ankit.school_management.dto.AttendanceStudentDTO;
import com.ankit.school_management.entity.Attendance;
import com.ankit.school_management.entity.AttendanceStatus;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.exception.AttendanceNotFoundException;
import com.ankit.school_management.exception.StudentNotFoundException;
import com.ankit.school_management.repository.AttendanceRepository;
import com.ankit.school_management.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional(readOnly = true)
    public List<AttendanceResponseDTO> getAllAttendance() {
        return attendanceRepository.findAll().stream().map(this::toResponse).toList();
    }

    // Get Attendance By Id
    @Transactional(readOnly = true)
    public AttendanceResponseDTO getAttendanceById(
            Long id) {
        return toResponse(findAttendance(id));
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
    @Transactional(readOnly = true)
    public List<AttendanceResponseDTO> getAttendanceByStudent(
            Long studentId) {
        return attendanceRepository.findByStudentId(studentId).stream().map(this::toResponse).toList();
    }

    // Get Attendance By Date
    @Transactional(readOnly = true)
    public List<AttendanceResponseDTO> getAttendanceByDate(
            LocalDate date) {
        return attendanceRepository.findByDate(date).stream().map(this::toResponse).toList();
    }

    // Get Attendance By Status
    @Transactional(readOnly = true)
    public List<AttendanceResponseDTO> getAttendanceByStatus(
            AttendanceStatus status) {
        return attendanceRepository.findByStatus(status).stream().map(this::toResponse).toList();
    }

    // Get Attendance By Student and Date
    @Transactional(readOnly = true)
    public List<AttendanceResponseDTO> getAttendanceByStudentAndDate(
            Long studentId,
            LocalDate date) {
        return attendanceRepository.findByStudentIdAndDate(studentId, date).stream().map(this::toResponse).toList();
    }

    /** Supplies all students belonging to a selected department for attendance marking. */
    @Transactional(readOnly = true)
    public List<AttendanceStudentDTO> getStudentsByDepartment(Long departmentId) {
        return studentRepository.findAll().stream()
                .filter(student -> student.getDepartment() != null && departmentId.equals(student.getDepartment().getId()))
                .map(student -> new AttendanceStudentDTO(
                        student.getId(), student.getFirstName(), student.getLastName(), student.getRollNumber(),
                        student.getUsername(), student.getDepartment().getId(), student.getDepartment().getName()))
                .toList();
    }

    private Attendance findAttendance(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new AttendanceNotFoundException("Attendance not found"));
    }

    private AttendanceResponseDTO toResponse(Attendance attendance) {
        Student student = attendance.getStudent();
        return new AttendanceResponseDTO(
                attendance.getId(), attendance.getDate(), attendance.getStatus(), student.getId(),
                student.getFirstName(), student.getLastName(), student.getRollNumber(), student.getUsername(),
                student.getDepartment().getId(), student.getDepartment().getName());
    }
}
