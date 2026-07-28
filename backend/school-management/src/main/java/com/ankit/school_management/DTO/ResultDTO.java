package com.ankit.school_management.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ResultDTO {

    @Min(
            value = 0,
            message = "Marks cannot be negative")
    @Max(
            value = 100,
            message = "Marks cannot be greater than 100")
    private int marks;

    @NotNull(
            message = "Student Id is required")
    private Long studentId;

    @NotNull(
            message = "Exam Id is required")
    private Long examId;

    public ResultDTO() {
    }

    public ResultDTO(
            int marks,
            Long studentId,
            Long examId) {

        this.marks = marks;
        this.studentId = studentId;
        this.examId = examId;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(
            int marks) {
        this.marks = marks;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(
            Long studentId) {
        this.studentId = studentId;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(
            Long examId) {
        this.examId = examId;
    }
}