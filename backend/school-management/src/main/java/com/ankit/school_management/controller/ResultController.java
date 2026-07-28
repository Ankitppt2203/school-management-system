package com.ankit.school_management.controller;

import com.ankit.school_management.dto.ReportCardDTO;
import com.ankit.school_management.dto.ResultDTO;
import com.ankit.school_management.entity.Result;
import com.ankit.school_management.service.ResultService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(
            ResultService resultService) {

        this.resultService = resultService;
    }

    // Create Result
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Result addResult(
            @Valid
            @RequestBody ResultDTO resultDTO) {

        return resultService.saveResult(resultDTO);
    }

    // Get All Results
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Result> getResults() {

        return resultService.getAllResults();
    }

    // Get Result By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public Result getResultById(
            @PathVariable Long id) {

        return resultService.getResultById(id);
    }

    // Delete Result
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteResult(
            @PathVariable Long id) {

        resultService.deleteResult(id);

        return "Result deleted successfully";
    }

    // Get Results By Student
    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Result> getResultsByStudent(
            @PathVariable Long studentId) {

        return resultService.getResultsByStudent(studentId);
    }

    // Get Results By Exam
    @GetMapping("/exam/{examId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Result> getResultsByExam(
            @PathVariable Long examId) {

        return resultService.getResultsByExam(examId);
    }

    // Get Results By Grade
    @GetMapping("/grade/{grade}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Result> getResultsByGrade(
            @PathVariable String grade) {

        return resultService.getResultsByGrade(grade);
    }

    // Calculate Percentage
    @GetMapping("/student/{studentId}/percentage")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public double getPercentage(
            @PathVariable Long studentId) {

        return resultService.calculatePercentage(studentId);
    }

    // Generate Report Card
    @GetMapping("/student/{studentId}/report")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ReportCardDTO getReportCard(
            @PathVariable Long studentId) {

        return resultService.getReportCard(studentId);
    }
}