package com.ankit.school_management.dto;

import com.ankit.school_management.entity.Result;

import java.util.List;

public class ReportCardDTO {

    private String studentName;
    private double percentage;
    private List<Result> results;

    public ReportCardDTO() {
    }

    public ReportCardDTO(
            String studentName,
            double percentage,
            List<Result> results) {

        this.studentName = studentName;
        this.percentage = percentage;
        this.results = results;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(
            String studentName) {
        this.studentName = studentName;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(
            double percentage) {
        this.percentage = percentage;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(
            List<Result> results) {
        this.results = results;
    }
}