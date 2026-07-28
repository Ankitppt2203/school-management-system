package com.ankit.school_management.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ExamDTO {

    @NotBlank(
            message = "Subject cannot be empty")
    private String subject;

    @Min(
            value = 1,
            message = "Max marks must be greater than 0")
    private int maxMarks;

    public ExamDTO() {
    }

    public ExamDTO(
            String subject,
            int maxMarks) {

        this.subject = subject;
        this.maxMarks = maxMarks;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(
            String subject) {
        this.subject = subject;
    }

    public int getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(
            int maxMarks) {
        this.maxMarks = maxMarks;
    }
}