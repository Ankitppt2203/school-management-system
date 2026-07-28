package com.ankit.school_management.service;

import com.ankit.school_management.dto.ReportCardDTO;
import com.ankit.school_management.dto.ResultDTO;
import com.ankit.school_management.entity.Exam;
import com.ankit.school_management.entity.Result;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.exception.ExamNotFoundException;
import com.ankit.school_management.exception.ResultNotFoundException;
import com.ankit.school_management.exception.StudentNotFoundException;
import com.ankit.school_management.repository.ExamRepository;
import com.ankit.school_management.repository.ResultRepository;
import com.ankit.school_management.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ResultService {

    private final ResultRepository resultRepository;
    private final StudentRepository studentRepository;
    private final ExamRepository examRepository;

    public ResultService(
            ResultRepository resultRepository,
            StudentRepository studentRepository,
            ExamRepository examRepository) {

        this.resultRepository = resultRepository;
        this.studentRepository = studentRepository;
        this.examRepository = examRepository;
    }

    // Create Result
    @Transactional
    public Result saveResult(
            ResultDTO resultDTO) {

        Student student =
                studentRepository.findById(
                                resultDTO.getStudentId())
                        .orElseThrow(() ->
                                new StudentNotFoundException(
                                        "Student not found"));

        Exam exam =
                examRepository.findById(
                                resultDTO.getExamId())
                        .orElseThrow(() ->
                                new ExamNotFoundException(
                                        "Exam not found"));

        Result result = new Result();

        result.setMarks(resultDTO.getMarks());

        result.setGrade(
                calculateGrade(
                        resultDTO.getMarks()));

        result.setStudent(student);
        result.setExam(exam);

        return resultRepository.save(result);
    }

    // Get All Results
    public List<Result> getAllResults() {

        return resultRepository.findAll();
    }

    // Get Result By Id
    public Result getResultById(
            Long id) {

        return resultRepository.findById(id)
                .orElseThrow(() ->
                        new ResultNotFoundException(
                                "Result not found"));
    }

    // Delete Result
    @Transactional
    public void deleteResult(
            Long id) {

        Result result =
                resultRepository.findById(id)
                        .orElseThrow(() ->
                                new ResultNotFoundException(
                                        "Result not found"));

        resultRepository.delete(result);
    }

    // Get Results By Student
    public List<Result> getResultsByStudent(
            Long studentId) {

        return resultRepository.findByStudentId(studentId);
    }

    // Get Results By Exam
    public List<Result> getResultsByExam(
            Long examId) {

        return resultRepository.findByExamId(examId);
    }

    // Get Results By Grade
    public List<Result> getResultsByGrade(
            String grade) {

        return resultRepository.findByGrade(grade);
    }

    // Calculate Percentage
    public double calculatePercentage(
            Long studentId) {

        List<Result> results =
                resultRepository.findByStudentId(studentId);

        int totalMarks = 0;
        int totalMaxMarks = 0;

        for (Result result : results) {

            totalMarks += result.getMarks();

            totalMaxMarks +=
                    result.getExam().getMaxMarks();
        }

        if (totalMaxMarks == 0) {
            return 0;
        }

        return ((double) totalMarks / totalMaxMarks) * 100;
    }

    // Generate Report Card
   public ReportCardDTO getReportCard(Long studentId) {

    Student student = studentRepository.findById(studentId)
            .orElseThrow(() ->
                    new StudentNotFoundException("Student not found"));

    List<Result> results =
            resultRepository.findByStudentId(studentId);

    double percentage =
            calculatePercentage(studentId);

    return new ReportCardDTO(
            student.getFullName(),
            percentage,
            results);
}
    // Grade Calculation
    private String calculateGrade(
            int marks) {

        if (marks >= 90)
            return "A+";

        else if (marks >= 80)
            return "A";

        else if (marks >= 70)
            return "B";

        else if (marks >= 60)
            return "C";

        else
            return "F";
    }
}
