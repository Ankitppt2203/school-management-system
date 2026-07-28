package com.ankit.school_management.service;

import com.ankit.school_management.dto.student.StudentRequestDTO;
import com.ankit.school_management.dto.student.StudentResponseDTO;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.exception.DepartmentNotFoundException;
import com.ankit.school_management.exception.DuplicateResourceException;
import com.ankit.school_management.exception.StudentNotFoundException;
import com.ankit.school_management.repository.DepartmentRepository;
import com.ankit.school_management.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional(readOnly = true)
public class StudentService {

    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of(
            "admissionNumber", "rollNumber", "firstName", "lastName", "academicSession", "admissionDate", "status");

    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;

    public StudentService(StudentRepository studentRepository, DepartmentRepository departmentRepository) {
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
    }

    public Page<StudentResponseDTO> getStudents(int page, int size, String sortBy, String direction) {
        int validatedPage = Math.max(page, 0);
        int validatedSize = Math.min(Math.max(size, 1), 100);
        String validatedSort = ALLOWED_SORT_FIELDS.contains(sortBy) ? sortBy : "firstName";
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(validatedPage, validatedSize, Sort.by(sortDirection, validatedSort));
        return studentRepository.findAll(pageable).map(this::toResponse);
    }

    public StudentResponseDTO getStudentById(Long id) {
        return toResponse(findStudent(id));
    }

    @Transactional
    public StudentResponseDTO saveStudent(StudentRequestDTO request) {
        validateUniqueFields(request, null);
        Student student = new Student();
        applyRequest(student, request, findDepartment(request.getDepartmentId()));
        return toResponse(studentRepository.save(student));
    }

    @Transactional
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO request) {
        Student student = findStudent(id);
        validateUniqueFields(request, student);
        applyRequest(student, request, findDepartment(request.getDepartmentId()));
        return toResponse(studentRepository.save(student));
    }

    @Transactional
    public void deleteStudent(Long id) {
        studentRepository.delete(findStudent(id));
    }

    private Student findStudent(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student with id " + id + " not found"));
    }

    private Department findDepartment(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new DepartmentNotFoundException("Department with id " + departmentId + " not found"));
    }

    private void validateUniqueFields(StudentRequestDTO request, Student existingStudent) {
        if ((existingStudent == null || !request.getAdmissionNumber().equals(existingStudent.getAdmissionNumber()))
                && studentRepository.existsByAdmissionNumber(request.getAdmissionNumber())) {
            throw new DuplicateResourceException("Admission number already exists");
        }
        if (request.getRollNumber() != null && !request.getRollNumber().isBlank()
                && (existingStudent == null || !request.getRollNumber().equals(existingStudent.getRollNumber()))
                && studentRepository.existsByRollNumber(request.getRollNumber())) {
            throw new DuplicateResourceException("Roll number already exists");
        }
    }

    private void applyRequest(Student student, StudentRequestDTO request, Department department) {
        student.setAdmissionNumber(request.getAdmissionNumber().trim());
        student.setRollNumber(blankToNull(request.getRollNumber()));
        student.setFirstName(request.getFirstName().trim());
        student.setMiddleName(blankToNull(request.getMiddleName()));
        student.setLastName(request.getLastName().trim());
        student.setGender(blankToNull(request.getGender()));
        student.setDateOfBirth(request.getDateOfBirth());
        student.setAcademicSession(request.getAcademicSession().trim());
        student.setAdmissionDate(request.getAdmissionDate());
        student.setStatus(request.getStatus() == null || request.getStatus().isBlank() ? "ACTIVE" : request.getStatus().trim());
        student.setDepartment(department);
    }

    private StudentResponseDTO toResponse(Student student) {
        StudentResponseDTO response = new StudentResponseDTO();
        response.setId(student.getId());
        response.setAdmissionNumber(student.getAdmissionNumber());
        response.setRollNumber(student.getRollNumber());
        response.setFullName(student.getFullName());
        response.setFirstName(student.getFirstName());
        response.setMiddleName(student.getMiddleName());
        response.setLastName(student.getLastName());
        response.setGender(student.getGender());
        response.setDateOfBirth(student.getDateOfBirth());
        response.setAcademicSession(student.getAcademicSession());
        response.setAdmissionDate(student.getAdmissionDate());
        response.setStatus(student.getStatus());
        response.setDepartmentId(student.getDepartment().getId());
        response.setDepartmentName(student.getDepartment().getName());
        return response;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
