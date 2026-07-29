package com.ankit.school_management.dto;

import java.util.List;

/** Safe JSON response that avoids serializing lazy JPA relationships. */
public record DepartmentResponseDTO(Long id, String name, long studentCount, long teacherCount,
                                    List<String> studentNames, List<String> teacherNames) { }
