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
import java.util.Objects;

@Service
@SuppressWarnings("null")
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

                Long studentId = Objects.requireNonNull(attendanceDTO.getStudentId(), "Student id is required");
                LocalDate attendanceDate = Objects.requireNonNull(attendanceDTO.getDate(),
                                "Attendance date is required");

                Student student = studentRepository.findById(
                                studentId)
                                .orElseThrow(() -> new StudentNotFoundException(
                                                "Student not found"));

                Attendance attendance = attendanceRepository
                                .findByStudentIdAndDate(studentId, attendanceDate)
                                .stream()
                                .findFirst()
                                .orElseGet(Attendance::new);

                attendance.setDate(attendanceDate);
                attendance.setStatus(attendanceDTO.getStatus());
                attendance.setStudent(student);

                Attendance savedAttendance = attendanceRepository.save(attendance);

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

                Long attendanceId = Objects.requireNonNull(id, "Attendance id is required");
                Long studentId = Objects.requireNonNull(attendanceDTO.getStudentId(), "Student id is required");
                LocalDate attendanceDate = Objects.requireNonNull(attendanceDTO.getDate(),
                                "Attendance date is required");

                Attendance attendance = attendanceRepository.findById(attendanceId)
                                .orElseThrow(() -> new AttendanceNotFoundException(
                                                "Attendance not found"));

                Student student = studentRepository.findById(
                                studentId)
                                .orElseThrow(() -> new StudentNotFoundException(
                                                "Student not found"));

                Attendance targetAttendance = attendanceRepository.findByStudentIdAndDate(studentId, attendanceDate)
                                .stream()
                                .findFirst()
                                .orElse(attendance);

                targetAttendance.setDate(attendanceDate);
                targetAttendance.setStatus(attendanceDTO.getStatus());
                targetAttendance.setStudent(student);

                Attendance updatedAttendance = attendanceRepository.save(targetAttendance);

                if (!updatedAttendance.getId().equals(attendanceId)) {
                        attendanceRepository.delete(attendance);
                }

                return new AttendanceDTO(
                                updatedAttendance.getDate(),
                                updatedAttendance.getStatus(),
                                updatedAttendance.getStudent().getId());
        }

        // Delete Attendance
        public void deleteAttendance(Long id) {

                Attendance attendance = attendanceRepository
                                .findById(Objects.requireNonNull(id, "Attendance id is required"))
                                .orElseThrow(() -> new AttendanceNotFoundException(
                                                "Attendance not found"));

                attendanceRepository.delete(Objects.requireNonNull(attendance));
        }

        // Get Attendance By Student
        @Transactional(readOnly = true)
        public List<AttendanceResponseDTO> getAttendanceByStudent(
                        Long studentId) {
                return attendanceRepository.findByStudentId(Objects.requireNonNull(studentId, "Student id is required"))
                                .stream().map(this::toResponse).toList();
        }

        // Get Attendance By Date
        @Transactional(readOnly = true)
        public List<AttendanceResponseDTO> getAttendanceByDate(
                        LocalDate date) {
                return attendanceRepository.findByDate(Objects.requireNonNull(date, "Attendance date is required"))
                                .stream().map(this::toResponse).toList();
        }

        // Get Attendance By Status
        @Transactional(readOnly = true)
        public List<AttendanceResponseDTO> getAttendanceByStatus(
                        AttendanceStatus status) {
                return attendanceRepository
                                .findByStatus(Objects.requireNonNull(status, "Attendance status is required")).stream()
                                .map(this::toResponse).toList();
        }

        // Get Attendance By Student and Date
        @Transactional(readOnly = true)
        public List<AttendanceResponseDTO> getAttendanceByStudentAndDate(
                        Long studentId,
                        LocalDate date) {
                return attendanceRepository
                                .findByStudentIdAndDate(Objects.requireNonNull(studentId, "Student id is required"),
                                                Objects.requireNonNull(date, "Attendance date is required"))
                                .stream().map(this::toResponse).toList();
        }

        /**
         * Supplies all students belonging to a selected department for attendance
         * marking.
         */
        @Transactional(readOnly = true)
        public List<AttendanceStudentDTO> getStudentsByDepartment(Long departmentId) {
                Long targetDepartmentId = Objects.requireNonNull(departmentId, "Department id is required");
                return studentRepository.findAll().stream()
                                .filter(student -> student.getDepartment() != null
                                                && targetDepartmentId.equals(student.getDepartment().getId()))
                                .map(student -> new AttendanceStudentDTO(
                                                student.getId(), student.getFirstName(), student.getLastName(),
                                                student.getRollNumber(),
                                                student.getUsername(), student.getDepartment().getId(),
                                                student.getDepartment().getName()))
                                .toList();
        }

        private Attendance findAttendance(Long id) {
                return attendanceRepository.findById(Objects.requireNonNull(id, "Attendance id is required"))
                                .orElseThrow(() -> new AttendanceNotFoundException("Attendance not found"));
        }

        private AttendanceResponseDTO toResponse(Attendance attendance) {
                Student student = attendance.getStudent();
                return new AttendanceResponseDTO(
                                attendance.getId(), attendance.getDate(), attendance.getStatus(), student.getId(),
                                student.getFirstName(), student.getLastName(), student.getRollNumber(),
                                student.getUsername(),
                                student.getDepartment().getId(), student.getDepartment().getName());
        }
}
