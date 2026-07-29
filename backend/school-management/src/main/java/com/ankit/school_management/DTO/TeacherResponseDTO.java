package com.ankit.school_management.dto;

public record TeacherResponseDTO(Long id, String name, String subject, double salary,
                                 Long departmentId, String departmentName, String username,
                                 java.util.Map<String, String> profileDetails) { }
