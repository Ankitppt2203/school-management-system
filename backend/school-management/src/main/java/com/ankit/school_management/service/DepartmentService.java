package com.ankit.school_management.service;

import com.ankit.school_management.dto.DepartmentDTO;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.exception.DepartmentNotFoundException;
import com.ankit.school_management.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(
            DepartmentRepository departmentRepository) {

        this.departmentRepository = departmentRepository;
    }

    // Create Department
    public DepartmentDTO saveDepartment(
            DepartmentDTO departmentDTO) {

        Department department = new Department();

        department.setName(
                departmentDTO.getName());

        Department savedDepartment =
                departmentRepository.save(department);

        return new DepartmentDTO(
                savedDepartment.getName());
    }

    // Get All Departments
    public List<Department> getAllDepartments() {

        return departmentRepository.findAll();
    }

    // Get Department By Id
    public Department getDepartmentById(
            Long id) {

        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new DepartmentNotFoundException(
                                "Department with id "
                                        + id
                                        + " not found"));
    }

    // Update Department
    public DepartmentDTO updateDepartment(
            Long id,
            DepartmentDTO departmentDTO) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new DepartmentNotFoundException(
                                        "Department with id "
                                                + id
                                                + " not found"));

        department.setName(
                departmentDTO.getName());

        Department updatedDepartment =
                departmentRepository.save(department);

        return new DepartmentDTO(
                updatedDepartment.getName());
    }

    // Delete Department
    public void deleteDepartment(
            Long id) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new DepartmentNotFoundException(
                                        "Department with id "
                                                + id
                                                + " not found"));

        departmentRepository.delete(department);
    }
}