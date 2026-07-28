package com.ankit.school_management.controller;

import com.ankit.school_management.dto.DepartmentDTO;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(
            DepartmentService departmentService) {

        this.departmentService = departmentService;
    }

    // Create Department
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DepartmentDTO createDepartment(
            @Valid
            @RequestBody DepartmentDTO departmentDTO) {

        return departmentService.saveDepartment(
                departmentDTO);
    }

    // Get All Departments
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Department> getAllDepartments() {

        return departmentService.getAllDepartments();
    }

    // Get Department By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public Department getDepartmentById(
            @PathVariable Long id) {

        return departmentService.getDepartmentById(id);
    }

    // Update Department
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public DepartmentDTO updateDepartment(
            @PathVariable Long id,
            @Valid
            @RequestBody DepartmentDTO departmentDTO) {

        return departmentService.updateDepartment(
                id,
                departmentDTO);
    }

    // Delete Department
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteDepartment(
            @PathVariable Long id) {

        departmentService.deleteDepartment(id);

        return "Department deleted successfully";
    }
}