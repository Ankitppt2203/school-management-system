package com.ankit.school_management.controller;

import com.ankit.school_management.dto.ExamDTO;
import com.ankit.school_management.entity.Exam;
import com.ankit.school_management.service.ExamService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(
            ExamService examService) {

        this.examService = examService;
    }

    // Create Exam
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ExamDTO addExam(
            @Valid
            @RequestBody ExamDTO examDTO) {

        return examService.saveExam(examDTO);
    }

    // Get All Exams
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Exam> getExams() {

        return examService.getAllExams();
    }

    // Get Exam By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public Exam getExamById(
            @PathVariable Long id) {

        return examService.getExamById(id);
    }

    // Update Exam
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ExamDTO updateExam(
            @PathVariable Long id,
            @Valid
            @RequestBody ExamDTO examDTO) {

        return examService.updateExam(
                id,
                examDTO);
    }

    // Delete Exam
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteExam(
            @PathVariable Long id) {

        examService.deleteExam(id);

        return "Exam deleted successfully";
    }

    // Find By Subject
    @GetMapping("/subject/{subject}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Exam> getExamsBySubject(
            @PathVariable String subject) {

        return examService.getExamsBySubject(subject);
    }

    // Search By Subject
    @GetMapping("/search/{subject}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Exam> searchExamsBySubject(
            @PathVariable String subject) {

        return examService.searchExamsBySubject(subject);
    }

    // Find By Max Marks
    @GetMapping("/max-marks/{maxMarks}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Exam> getExamsByMaxMarks(
            @PathVariable int maxMarks) {

        return examService.getExamsByMaxMarks(maxMarks);
    }
}