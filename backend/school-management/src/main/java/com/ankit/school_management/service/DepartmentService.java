package com.ankit.school_management.service;

import com.ankit.school_management.dto.DepartmentDTO;
import com.ankit.school_management.dto.DepartmentResponseDTO;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.exception.DepartmentNotFoundException;
import com.ankit.school_management.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional(readOnly = true)
    public List<DepartmentResponseDTO> getAllDepartments() {
        return departmentRepository.findAll().stream().map(this::toResponse).toList();
    }

    // Get Department By Id
    @Transactional(readOnly = true)
    public DepartmentResponseDTO getDepartmentById(
            Long id) {
        return toResponse(findDepartment(id));
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

        departmentRepository.delete(findDepartment(id));
    }

    private Department findDepartment(Long id) {
        return departmentRepository.findById(id).orElseThrow(() ->
                new DepartmentNotFoundException("Department with id " + id + " not found"));
    }

    private DepartmentResponseDTO toResponse(Department department) {
        List<com.ankit.school_management.entity.Student> students = department.getStudents() == null ? List.of() : department.getStudents();
        List<com.ankit.school_management.entity.Teacher> teachers = department.getTeachers() == null ? List.of() : department.getTeachers();
        return new DepartmentResponseDTO(department.getId(), department.getName(), students.size(), teachers.size(),
                students.stream().map(com.ankit.school_management.entity.Student::getFullName).toList(),
                teachers.stream().map(com.ankit.school_management.entity.Teacher::getName).toList());
    }
}
