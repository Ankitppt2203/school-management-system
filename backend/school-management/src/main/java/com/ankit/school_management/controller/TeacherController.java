package com.ankit.school_management.controller;

import com.ankit.school_management.dto.TeacherDTO;
import com.ankit.school_management.entity.Teacher;
import com.ankit.school_management.service.TeacherService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(
            TeacherService teacherService) {

        this.teacherService = teacherService;
    }

    // Create Teacher
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public TeacherDTO addTeacher(
            @Valid
            @RequestBody TeacherDTO teacherDTO) {

        return teacherService.saveTeacher(
                teacherDTO);
    }

    // Get All Teachers
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Teacher> getTeachers() {

        return teacherService.getAllTeachers();
    }

    // Get Teacher By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public Teacher getTeacherById(
            @PathVariable Long id) {

        return teacherService.getTeacherById(id);
    }

    // Update Teacher
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public TeacherDTO updateTeacher(
            @PathVariable Long id,
            @Valid
            @RequestBody TeacherDTO teacherDTO) {

        return teacherService.updateTeacher(
                id,
                teacherDTO);
    }

    // Delete Teacher
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTeacher(
            @PathVariable Long id) {

        teacherService.deleteTeacher(id);

        return "Teacher deleted successfully";
    }

    // Find by Name
    @GetMapping("/name/{name}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Teacher> getTeachersByName(
            @PathVariable String name) {

        return teacherService.getTeachersByName(name);
    }

    // Find by Subject
    @GetMapping("/subject/{subject}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Teacher> getTeachersBySubject(
            @PathVariable String subject) {

        return teacherService.getTeachersBySubject(subject);
    }

    // Find by Salary
    @GetMapping("/salary/{salary}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Teacher> getTeachersBySalary(
            @PathVariable double salary) {

        return teacherService.getTeachersBySalary(salary);
    }

    // Search by Name
    @GetMapping("/search/{name}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Teacher> searchTeachersByName(
            @PathVariable String name) {

        return teacherService.searchTeachersByName(name);
    }

    // Find by Department
    @GetMapping("/department/{departmentId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Teacher> getTeachersByDepartment(
            @PathVariable Long departmentId) {

        return teacherService.getTeachersByDepartment(departmentId);
    }
}