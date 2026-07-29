package com.ankit.school_management.service;

import com.ankit.school_management.dto.student.StudentRequestDTO;
import com.ankit.school_management.dto.student.StudentResponseDTO;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.exception.DuplicateResourceException;
import com.ankit.school_management.exception.StudentNotFoundException;
import com.ankit.school_management.repository.DepartmentRepository;
import com.ankit.school_management.repository.StudentRepository;
import com.ankit.school_management.repository.CourseRepository;
import com.ankit.school_management.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    @Mock private StudentRepository studentRepository;
    @Mock private DepartmentRepository departmentRepository;
    @Mock private CourseRepository courseRepository;
    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @InjectMocks private StudentService studentService;

    @Test
    void savesStudentUsingRedesignedRequestAndReturnsFullName() {
        Department department = department(1L, "Computer Science");
        StudentRequestDTO request = request("ADM-001", "R-1", 1L);
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(studentRepository.existsByAdmissionNumber("ADM-001")).thenReturn(false);
        when(studentRepository.existsByRollNumber("R-1")).thenReturn(false);
        when(studentRepository.save(any(Student.class))).thenAnswer(invocation -> invocation.getArgument(0));

        StudentResponseDTO response = studentService.saveStudent(request);

        assertEquals("Ankit Kumar", response.getFullName());
        assertEquals("Computer Science", response.getDepartmentName());
        ArgumentCaptor<Student> studentCaptor = ArgumentCaptor.forClass(Student.class);
        verify(studentRepository).save(studentCaptor.capture());
        assertEquals("Ankit", studentCaptor.getValue().getFirstName());
        assertEquals("Kumar", studentCaptor.getValue().getLastName());
    }

    @Test
    void rejectsDuplicateAdmissionNumber() {
        StudentRequestDTO request = request("ADM-001", "R-1", 1L);
        when(studentRepository.existsByAdmissionNumber("ADM-001")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> studentService.saveStudent(request));
    }

    @Test
    void throwsWhenStudentIsMissing() {
        when(studentRepository.findById(100L)).thenReturn(Optional.empty());

        StudentNotFoundException exception = assertThrows(StudentNotFoundException.class,
                () -> studentService.getStudentById(100L));

        assertEquals("Student with id 100 not found", exception.getMessage());
    }

    @Test
    void updatesExistingStudent() {
        Department oldDepartment = department(1L, "Computer Science");
        Department newDepartment = department(2L, "Mechanical Engineering");
        Student student = new Student();
        student.setAdmissionNumber("ADM-001");
        student.setRollNumber("R-1");
        student.setFirstName("Ankit");
        student.setLastName("Kumar");
        student.setAcademicSession("2025-26");
        student.setAdmissionDate(LocalDate.of(2025, 4, 1));
        student.setDepartment(oldDepartment);
        StudentRequestDTO request = request("ADM-002", "R-2", 2L);
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        when(departmentRepository.findById(2L)).thenReturn(Optional.of(newDepartment));
        when(studentRepository.existsByAdmissionNumber("ADM-002")).thenReturn(false);
        when(studentRepository.existsByRollNumber("R-2")).thenReturn(false);
        when(studentRepository.save(student)).thenReturn(student);

        StudentResponseDTO response = studentService.updateStudent(1L, request);

        assertEquals("ADM-002", response.getAdmissionNumber());
        assertEquals(2L, response.getDepartmentId());
    }

    private StudentRequestDTO request(String admissionNumber, String rollNumber, Long departmentId) {
        return new StudentRequestDTO(admissionNumber, rollNumber, "Ankit", null, "Kumar", "MALE",
                LocalDate.of(2002, 1, 1), "2025-26", LocalDate.of(2025, 4, 1), "ACTIVE", departmentId);
    }

    private Department department(Long id, String name) {
        Department department = new Department();
        department.setId(id);
        department.setName(name);
        return department;
    }
}
