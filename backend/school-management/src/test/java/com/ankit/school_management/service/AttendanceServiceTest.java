package com.ankit.school_management.service;

import com.ankit.school_management.dto.AttendanceDTO;
import com.ankit.school_management.entity.Attendance;
import com.ankit.school_management.entity.AttendanceStatus;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.repository.AttendanceRepository;
import com.ankit.school_management.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;
import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings("null")
class AttendanceServiceTest {

    @Mock
    private AttendanceRepository attendanceRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private AttendanceService attendanceService;

    @Test
    void saveAttendanceUpdatesExistingRecordForSameStudentAndDate() {
        Student student = student(1L);
        Attendance existing = new Attendance();
        existing.setDate(LocalDate.of(2026, 8, 5));
        existing.setStatus(AttendanceStatus.ABSENT);
        existing.setStudent(student);

        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        when(attendanceRepository.findByStudentIdAndDate(1L, LocalDate.of(2026, 8, 5)))
                .thenReturn(java.util.List.of(existing));
        when(attendanceRepository.save(any(Attendance.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AttendanceDTO response = attendanceService.saveAttendance(
                new AttendanceDTO(LocalDate.of(2026, 8, 5), AttendanceStatus.PRESENT, 1L));

        assertEquals(LocalDate.of(2026, 8, 5), response.getDate());
        assertEquals(AttendanceStatus.PRESENT, response.getStatus());
        assertEquals(1L, response.getStudentId());
    }

    private Student student(Long id) {
        Student student = new Student();
        student.setFirstName("Ankit");
        student.setLastName("Kumar");
        student.setAdmissionNumber("GPS01");
        student.setAcademicSession("2025-26");
        student.setAdmissionDate(LocalDate.of(2025, 4, 1));
        Department department = new Department();
        department.setId(1L);
        department.setName("Computer Science");
        student.setDepartment(department);
        try {
            Field idField = Student.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(student, id);
        } catch (ReflectiveOperationException ex) {
            throw new IllegalStateException(ex);
        }
        return student;
    }
}