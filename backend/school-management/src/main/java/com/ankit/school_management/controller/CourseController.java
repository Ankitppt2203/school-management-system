package com.ankit.school_management.controller;

import com.ankit.school_management.dto.CourseDTO;
import com.ankit.school_management.entity.Course;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(
            CourseService courseService) {

        this.courseService = courseService;
    }

    // Create Course
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CourseDTO addCourse(
            @Valid
            @RequestBody CourseDTO courseDTO) {

        return courseService.saveCourse(courseDTO);
    }

    // Get All Courses
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Course> getCourses() {

        return courseService.getAllCourses();
    }

    // Get Course By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public Course getCourseById(
            @PathVariable Long id) {

        return courseService.getCourseById(id);
    }

    // Update Course
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public CourseDTO updateCourse(
            @PathVariable Long id,
            @Valid
            @RequestBody CourseDTO courseDTO) {

        return courseService.updateCourse(
                id,
                courseDTO);
    }

    // Delete Course
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteCourse(
            @PathVariable Long id) {

        courseService.deleteCourse(id);

        return "Course deleted successfully";
    }

    // Find Course By Name
    @GetMapping("/name/{name}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Course> getCoursesByName(
            @PathVariable String name) {

        return courseService.getCoursesByName(name);
    }

    // Search Course By Name
    @GetMapping("/search/{name}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Course> searchCoursesByName(
            @PathVariable String name) {

        return courseService.searchCoursesByName(name);
    }

    // Add Course To Student
    @PostMapping("/students/{studentId}/{courseId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Student addCourseToStudent(
            @PathVariable Long studentId,
            @PathVariable Long courseId) {

        return courseService.addCourseToStudent(
                studentId,
                courseId);
    }

    // Remove Course From Student
    @DeleteMapping("/students/{studentId}/{courseId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Student removeCourseFromStudent(
            @PathVariable Long studentId,
            @PathVariable Long courseId) {

        return courseService.removeCourseFromStudent(
                studentId,
                courseId);
    }
}