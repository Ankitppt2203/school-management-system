package com.ankit.school_management.service;

import com.ankit.school_management.dto.TeacherDTO;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.entity.Teacher;
import com.ankit.school_management.exception.DepartmentNotFoundException;
import com.ankit.school_management.exception.TeacherNotFoundException;
import com.ankit.school_management.repository.DepartmentRepository;
import com.ankit.school_management.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final DepartmentRepository departmentRepository;

    public TeacherService(
            TeacherRepository teacherRepository,
            DepartmentRepository departmentRepository) {

        this.teacherRepository = teacherRepository;
        this.departmentRepository = departmentRepository;
    }

    // Create Teacher
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

        Teacher savedTeacher =
                teacherRepository.save(teacher);

        return new TeacherDTO(
                savedTeacher.getName(),
                savedTeacher.getSubject(),
                savedTeacher.getSalary(),
                savedTeacher.getDepartment().getId());
    }

    // Get All Teachers
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    // Get Teacher By Id
    public Teacher getTeacherById(Long id) {

        return teacherRepository.findById(id)
                .orElseThrow(() ->
                        new TeacherNotFoundException(
                                "Teacher not found"));
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

        Teacher teacher =
                teacherRepository.findById(id)
                        .orElseThrow(() ->
                                new TeacherNotFoundException(
                                        "Teacher not found"));

        teacherRepository.delete(teacher);
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
}