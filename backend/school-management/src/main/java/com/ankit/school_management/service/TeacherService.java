package com.ankit.school_management.service;

import com.ankit.school_management.dto.TeacherDTO;
import com.ankit.school_management.dto.TeacherResponseDTO;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.entity.Teacher;
import com.ankit.school_management.entity.User;
import com.ankit.school_management.entity.Role;
import com.ankit.school_management.exception.DepartmentNotFoundException;
import com.ankit.school_management.exception.TeacherNotFoundException;
import com.ankit.school_management.repository.DepartmentRepository;
import com.ankit.school_management.repository.TeacherRepository;
import com.ankit.school_management.repository.UserRepository;
import com.ankit.school_management.exception.DuplicateResourceException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public TeacherService(
            TeacherRepository teacherRepository,
            DepartmentRepository departmentRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {

        this.teacherRepository = teacherRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Create Teacher
    @Transactional
    public TeacherDTO saveTeacher(
            TeacherDTO teacherDTO) {

        Department department =
                departmentRepository.findById(
                                teacherDTO.getDepartmentId())
                        .orElseThrow(() ->
                                new DepartmentNotFoundException(
                                        "Department not found"));

        Teacher teacher = new Teacher();

        teacher.setName(teacherDTO.getName());
        teacher.setSubject(teacherDTO.getSubject());
        teacher.setSalary(teacherDTO.getSalary());
        teacher.setDepartment(department);
        teacher.setProfileDetails(teacherDTO.getProfileDetails() == null ? new java.util.HashMap<>() : new java.util.HashMap<>(teacherDTO.getProfileDetails()));

        Teacher savedTeacher =
                teacherRepository.save(teacher);
        createTeacherAccount(savedTeacher, teacherDTO);

        return new TeacherDTO(
                savedTeacher.getName(),
                savedTeacher.getSubject(),
                savedTeacher.getSalary(),
                savedTeacher.getDepartment().getId());
    }

    // Get All Teachers
    @Transactional(readOnly = true)
    public List<TeacherResponseDTO> getAllTeachers() {
        return teacherRepository.findAll().stream().map(this::toResponse).toList();
    }

    // Get Teacher By Id
    @Transactional(readOnly = true)
    public TeacherResponseDTO getTeacherById(Long id) {
        return toResponse(findTeacher(id));
    }

    // Update Teacher
    public TeacherDTO updateTeacher(
            Long id,
            TeacherDTO teacherDTO) {

        Teacher teacher =
                teacherRepository.findById(id)
                        .orElseThrow(() ->
                                new TeacherNotFoundException(
                                        "Teacher not found"));

        Department department =
                departmentRepository.findById(
                                teacherDTO.getDepartmentId())
                        .orElseThrow(() ->
                                new DepartmentNotFoundException(
                                        "Department not found"));

        teacher.setName(teacherDTO.getName());
        teacher.setSubject(teacherDTO.getSubject());
        teacher.setSalary(teacherDTO.getSalary());
        teacher.setDepartment(department);
        teacher.setProfileDetails(teacherDTO.getProfileDetails() == null ? new java.util.HashMap<>() : new java.util.HashMap<>(teacherDTO.getProfileDetails()));

        Teacher updatedTeacher =
                teacherRepository.save(teacher);

        return new TeacherDTO(
                updatedTeacher.getName(),
                updatedTeacher.getSubject(),
                updatedTeacher.getSalary(),
                updatedTeacher.getDepartment().getId());
    }

    // Delete Teacher
    public void deleteTeacher(Long id) {
        teacherRepository.delete(findTeacher(id));
    }

    // Search by Name
    public List<Teacher> getTeachersByName(
            String name) {

        return teacherRepository.findByName(name);
    }

    // Search by Subject
    public List<Teacher> getTeachersBySubject(
            String subject) {

        return teacherRepository.findBySubject(subject);
    }

    // Search by Salary
    public List<Teacher> getTeachersBySalary(
            double salary) {

        return teacherRepository.findBySalaryGreaterThan(salary);
    }

    // Search by Name (Like)
    public List<Teacher> searchTeachersByName(
            String name) {

        return teacherRepository.findByNameContaining(name);
    }

    // Search by Department
    public List<Teacher> getTeachersByDepartment(
            Long departmentId) {

        return teacherRepository.findByDepartmentId(departmentId);
    }

    private Teacher findTeacher(Long id) {
        return teacherRepository.findById(id).orElseThrow(() -> new TeacherNotFoundException("Teacher not found"));
    }

    private TeacherResponseDTO toResponse(Teacher teacher) {
        return new TeacherResponseDTO(teacher.getId(), teacher.getName(), teacher.getSubject(), teacher.getSalary(),
                teacher.getDepartment().getId(), teacher.getDepartment().getName(), teacher.getUsername(),
                teacher.getProfileDetails() == null ? java.util.Map.of() : java.util.Map.copyOf(teacher.getProfileDetails()));
    }

    private void createTeacherAccount(Teacher teacher, TeacherDTO request) {
        if (request.getPassword() == null || request.getPassword().isBlank()) return;
        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username is required when creating a teacher account");
        }
        if (userRepository.findByUsername(request.getUsername().trim()).isPresent()) {
            throw new DuplicateResourceException("Username already exists");
        }
        teacher.setUsername(request.getUsername().trim());
        userRepository.save(new User(request.getUsername().trim(), passwordEncoder.encode(request.getPassword()), Role.TEACHER));
    }
}
