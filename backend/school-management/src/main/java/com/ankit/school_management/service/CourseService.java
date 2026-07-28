package com.ankit.school_management.service;

import com.ankit.school_management.dto.CourseDTO;
import com.ankit.school_management.entity.Course;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.exception.CourseNotFoundException;
import com.ankit.school_management.exception.StudentNotFoundException;
import com.ankit.school_management.repository.CourseRepository;
import com.ankit.school_management.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public CourseService(
            CourseRepository courseRepository,
            StudentRepository studentRepository) {

        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    // Create Course
    public CourseDTO saveCourse(
            CourseDTO courseDTO) {

        Course course = new Course();

        course.setName(courseDTO.getName());

        Course savedCourse =
                courseRepository.save(course);

        return new CourseDTO(
                savedCourse.getName());
    }

    // Get All Courses
    public List<Course> getAllCourses() {

        return courseRepository.findAll();
    }

    // Get Course By Id
    public Course getCourseById(
            Long id) {

        return courseRepository.findById(id)
                .orElseThrow(() ->
                        new CourseNotFoundException(
                                "Course not found"));
    }

    // Update Course
    public CourseDTO updateCourse(
            Long id,
            CourseDTO courseDTO) {

        Course course =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new CourseNotFoundException(
                                        "Course not found"));

        course.setName(courseDTO.getName());

        Course updatedCourse =
                courseRepository.save(course);

        return new CourseDTO(
                updatedCourse.getName());
    }

    // Delete Course
    public void deleteCourse(
            Long id) {

        Course course =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new CourseNotFoundException(
                                        "Course not found"));

        courseRepository.delete(course);
    }

    // Find Course By Name
    public List<Course> getCoursesByName(
            String name) {

        return courseRepository.findByName(name);
    }

    // Search Course By Name
    public List<Course> searchCoursesByName(
            String name) {

        return courseRepository.findByNameContaining(name);
    }

    // Add Course To Student
    public Student addCourseToStudent(
            Long studentId,
            Long courseId) {

        Student student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new StudentNotFoundException(
                                        "Student not found"));

        Course course =
                courseRepository.findById(courseId)
                        .orElseThrow(() ->
                                new CourseNotFoundException(
                                        "Course not found"));

        student.getCourses().add(course);

        return studentRepository.save(student);
    }

    // Remove Course From Student
    public Student removeCourseFromStudent(
            Long studentId,
            Long courseId) {

        Student student =
                studentRepository.findById(studentId)
                        .orElseThrow(() ->
                                new StudentNotFoundException(
                                        "Student not found"));

        Course course =
                courseRepository.findById(courseId)
                        .orElseThrow(() ->
                                new CourseNotFoundException(
                                        "Course not found"));

        student.getCourses().remove(course);

        return studentRepository.save(student);
    }
}