package com.ankit.school_management.controller;

import com.ankit.school_management.dto.student.StudentRequestDTO;
import com.ankit.school_management.dto.student.StudentResponseDTO;
import com.ankit.school_management.service.StudentService;
import com.ankit.school_management.security.JwtFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = StudentController.class, properties = "jwt.secret=test-secret-key-with-at-least-32-bytes")
@AutoConfigureMockMvc(addFilters = false)
@SuppressWarnings("null")
class StudentControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private StudentService studentService;
    @MockitoBean
    private JwtFilter jwtFilter;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "ADMIN")
    void createsStudentWithNewDtoContract() throws Exception {
        StudentRequestDTO request = request();
        when(studentService.saveStudent(any(StudentRequestDTO.class))).thenReturn(response());

        mockMvc.perform(post("/students").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.fullName").value("Ankit Kumar"))
                .andExpect(jsonPath("$.admissionNumber").value("ADM-001"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void returnsPagedStudentResponses() throws Exception {
        when(studentService.getStudents(anyInt(), anyInt(), anyString(), anyString(), any()))
                .thenReturn(new PageImpl<>(List.of(response())));

        mockMvc.perform(get("/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].fullName").value("Ankit Kumar"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void returnsNextAdmissionNumber() throws Exception {
        when(studentService.getNextAdmissionNumber()).thenReturn("GPS01");

        mockMvc.perform(get("/students/next-admission-number"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("GPS01"));
    }

    @Test
    @WithMockUser(roles = "TEACHER")
    void returnsStudentByIdUsingResponseDto() throws Exception {
        when(studentService.getStudentById(1L)).thenReturn(response());

        mockMvc.perform(get("/students/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Ankit"));
    }

    private StudentRequestDTO request() {
        return new StudentRequestDTO("ADM-001", "R-1", "Ankit", null, "Kumar", "MALE",
                LocalDate.of(2002, 1, 1), "2025-26", LocalDate.of(2025, 4, 1), "ACTIVE", 1L);
    }

    private StudentResponseDTO response() {
        StudentResponseDTO response = new StudentResponseDTO();
        response.setId(1L);
        response.setAdmissionNumber("ADM-001");
        response.setFullName("Ankit Kumar");
        response.setFirstName("Ankit");
        response.setLastName("Kumar");
        response.setDepartmentId(1L);
        return response;
    }
}
