package com.ankit.school_management.controller;

import com.ankit.school_management.dto.student.StudentRequestDTO;
import com.ankit.school_management.dto.student.StudentResponseDTO;
import com.ankit.school_management.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // ==========================
    // CREATE STUDENT
    // ==========================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<StudentResponseDTO> createStudent(
            @Valid @RequestBody StudentRequestDTO requestDTO) {

        StudentResponseDTO response = studentService.saveStudent(requestDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // ==========================
    // GET ALL STUDENTS
    // ==========================

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping
    public ResponseEntity<Page<StudentResponseDTO>> getAllStudents(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "firstName") String sortBy,

            @RequestParam(defaultValue = "asc") String direction,

            @RequestParam(required = false) Long departmentId) {

        return ResponseEntity.ok(
                studentService.getStudents(
                        page,
                        size,
                        sortBy,
                        direction,
                        departmentId));
    }

    // ==========================
    // NEXT ADMISSION NUMBER
    // ==========================

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/next-admission-number")
    public ResponseEntity<String> getNextAdmissionNumber() {
        return ResponseEntity.ok(studentService.getNextAdmissionNumber());
    }

    // ==========================
    // GET STUDENT BY ID
    // ==========================

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> getStudentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentService.getStudentById(id));
    }

    // ==========================
    // UPDATE STUDENT
    // ==========================

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> updateStudent(

            @PathVariable Long id,

            @Valid @RequestBody StudentRequestDTO requestDTO) {

        return ResponseEntity.ok(
                studentService.updateStudent(id, requestDTO));
    }

    // ==========================
    // DELETE STUDENT
    // ==========================

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok("Student deleted successfully.");
    }
}
