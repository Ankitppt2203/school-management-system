package com.ankit.school_management.service;

import com.ankit.school_management.dto.ExamDTO;
import com.ankit.school_management.entity.Exam;
import com.ankit.school_management.exception.ExamNotFoundException;
import com.ankit.school_management.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    private final ExamRepository examRepository;

    public ExamService(
            ExamRepository examRepository) {

        this.examRepository = examRepository;
    }

    // Create Exam
    public ExamDTO saveExam(
            ExamDTO examDTO) {

        Exam exam = new Exam();

        exam.setSubject(examDTO.getSubject());
        exam.setMaxMarks(examDTO.getMaxMarks());

        Exam savedExam =
                examRepository.save(exam);

        return new ExamDTO(
                savedExam.getSubject(),
                savedExam.getMaxMarks());
    }

    // Get All Exams
    public List<Exam> getAllExams() {

        return examRepository.findAll();
    }

    // Get Exam By Id
    public Exam getExamById(
            Long id) {

        return examRepository.findById(id)
                .orElseThrow(() ->
                        new ExamNotFoundException(
                                "Exam not found"));
    }

    // Update Exam
    public ExamDTO updateExam(
            Long id,
            ExamDTO examDTO) {

        Exam exam =
                examRepository.findById(id)
                        .orElseThrow(() ->
                                new ExamNotFoundException(
                                        "Exam not found"));

        exam.setSubject(examDTO.getSubject());
        exam.setMaxMarks(examDTO.getMaxMarks());

        Exam updatedExam =
                examRepository.save(exam);

        return new ExamDTO(
                updatedExam.getSubject(),
                updatedExam.getMaxMarks());
    }

    // Delete Exam
    public void deleteExam(
            Long id) {

        Exam exam =
                examRepository.findById(id)
                        .orElseThrow(() ->
                                new ExamNotFoundException(
                                        "Exam not found"));

        examRepository.delete(exam);
    }

    // Find By Subject
    public List<Exam> getExamsBySubject(
            String subject) {

        return examRepository.findBySubject(subject);
    }

    // Search By Subject
    public List<Exam> searchExamsBySubject(
            String subject) {

        return examRepository.findBySubjectContaining(subject);
    }

    // Find By Max Marks
    public List<Exam> getExamsByMaxMarks(
            int maxMarks) {

        return examRepository.findByMaxMarks(maxMarks);
    }
}