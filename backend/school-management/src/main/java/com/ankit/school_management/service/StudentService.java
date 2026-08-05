package com.ankit.school_management.service;

import com.ankit.school_management.dto.student.StudentRequestDTO;
import com.ankit.school_management.dto.student.StudentResponseDTO;
import com.ankit.school_management.entity.Department;
import com.ankit.school_management.entity.Student;
import com.ankit.school_management.entity.Course;
import com.ankit.school_management.entity.Role;
import com.ankit.school_management.entity.User;
import com.ankit.school_management.exception.DepartmentNotFoundException;
import com.ankit.school_management.exception.DuplicateResourceException;
import com.ankit.school_management.exception.StudentNotFoundException;
import com.ankit.school_management.repository.DepartmentRepository;
import com.ankit.school_management.repository.StudentRepository;
import com.ankit.school_management.repository.CourseRepository;
import com.ankit.school_management.repository.UserRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Set;
import static java.util.Objects.requireNonNull;

@Service
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class StudentService {

    private static final String ADMISSION_PREFIX = "GPS";
    private static final Pattern ADMISSION_NUMBER_PATTERN = Pattern.compile("^GPS(\\d+)$", Pattern.CASE_INSENSITIVE);
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of(
            "admissionNumber", "rollNumber", "firstName", "lastName", "academicSession", "admissionDate", "status");

    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository, DepartmentRepository departmentRepository,
            CourseRepository courseRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Page<StudentResponseDTO> getStudents(int page, int size, String sortBy, String direction,
            Long departmentId) {
        int validatedPage = Math.max(page, 0);
        int validatedSize = Math.min(Math.max(size, 1), 100);
        String validatedSort = ALLOWED_SORT_FIELDS.contains(sortBy) ? sortBy : "firstName";
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(validatedPage, validatedSize, Sort.by(sortDirection, validatedSort));
        if (departmentId == null) {
            return studentRepository.findAll(pageable).map(this::toResponse);
        }
        Specification<Student> specification = (root, query, criteriaBuilder) -> criteriaBuilder
                .equal(root.get("department").get("id"), departmentId);
        return studentRepository.findAll(specification, pageable).map(this::toResponse);
    }

    public String getNextAdmissionNumber() {
        return generateNextAdmissionNumber();
    }

    public StudentResponseDTO getStudentById(Long id) {
        return toResponse(findStudent(requireNonNull(id, "Student id is required")));
    }

    @Transactional
    public synchronized StudentResponseDTO saveStudent(StudentRequestDTO request) {
        request.setAdmissionNumber(reserveNextAdmissionNumber());
        Student student = new Student();
        Long departmentId = requireNonNull(request.getDepartmentId(), "Department is required");
        applyRequest(student, request, findDepartment(departmentId));
        Student saved = requireNonNull(studentRepository.save(student));
        createStudentAccount(saved, request.getUsername(), request.getPassword());
        return toResponse(saved);
    }

    @Transactional
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO request) {
        Student student = findStudent(requireNonNull(id, "Student id is required"));
        request.setAdmissionNumber(resolveAdmissionNumber(request.getAdmissionNumber(), student));
        validateUniqueFields(request, student);
        Long departmentId = requireNonNull(request.getDepartmentId(), "Department is required");
        applyRequest(student, request, findDepartment(departmentId));
        Student saved = requireNonNull(studentRepository.save(student));
        return toResponse(saved);
    }

    @Transactional
    public void deleteStudent(Long id) {
        Student student = findStudent(requireNonNull(id, "Student id is required"));
        studentRepository.delete(requireNonNull(student));
    }

    private Student findStudent(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student with id " + id + " not found"));
    }

    private Department findDepartment(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(
                        () -> new DepartmentNotFoundException("Department with id " + departmentId + " not found"));
    }

    private void validateUniqueFields(StudentRequestDTO request, Student existingStudent) {
        if ((existingStudent == null || !request.getAdmissionNumber().equals(existingStudent.getAdmissionNumber()))
                && studentRepository.existsByAdmissionNumber(request.getAdmissionNumber())) {
            throw new DuplicateResourceException("Admission number already exists");
        }
    }

    private void applyRequest(Student student, StudentRequestDTO request, Department department) {
        student.setAdmissionNumber(request.getAdmissionNumber().trim());
        student.setRollNumber(blankToNull(request.getRollNumber()));
        student.setFirstName(request.getFirstName().trim());
        student.setMiddleName(blankToNull(request.getMiddleName()));
        student.setLastName(request.getLastName().trim());
        student.setGender(blankToNull(request.getGender()));
        student.setDateOfBirth(request.getDateOfBirth());
        student.setAcademicSession(request.getAcademicSession().trim());
        student.setAdmissionDate(request.getAdmissionDate());
        student.setStatus(
                request.getStatus() == null || request.getStatus().isBlank() ? "ACTIVE" : request.getStatus().trim());
        if (request.getUsername() != null && !request.getUsername().isBlank())
            student.setUsername(request.getUsername().trim());
        student.setDepartment(department);
        // Mutate managed collections in place. Replacing them causes Hibernate to
        // reinsert existing many-to-many/detail rows and can violate unique keys.
        java.util.List<Course> selectedCourses = findCourses(request.getCourseIds());
        if (student.getCourses() == null) {
            student.setCourses(new java.util.ArrayList<>(selectedCourses));
        } else {
            student.getCourses().clear();
            student.getCourses().addAll(selectedCourses);
        }
        java.util.Map<String, String> details = request.getAdmissionDetails() == null
                ? java.util.Map.of()
                : request.getAdmissionDetails();
        if (student.getAdmissionDetails() == null) {
            student.setAdmissionDetails(new java.util.HashMap<>(details));
        } else {
            student.getAdmissionDetails().clear();
            student.getAdmissionDetails().putAll(details);
        }
    }

    private StudentResponseDTO toResponse(Student student) {
        StudentResponseDTO response = new StudentResponseDTO();
        response.setId(student.getId());
        response.setAdmissionNumber(student.getAdmissionNumber());
        response.setRollNumber(student.getRollNumber());
        response.setFullName(student.getFullName());
        response.setFirstName(student.getFirstName());
        response.setMiddleName(student.getMiddleName());
        response.setLastName(student.getLastName());
        response.setGender(student.getGender());
        response.setDateOfBirth(student.getDateOfBirth());
        response.setAcademicSession(student.getAcademicSession());
        response.setAdmissionDate(student.getAdmissionDate());
        response.setStatus(student.getStatus());
        response.setDepartmentId(student.getDepartment().getId());
        response.setDepartmentName(student.getDepartment().getName());
        java.util.List<Course> courses = student.getCourses() == null ? java.util.List.of() : student.getCourses();
        java.util.List<Long> courseIds = new java.util.ArrayList<>();
        java.util.List<String> courseNames = new java.util.ArrayList<>();
        for (Course course : courses) {
            courseIds.add(course.getId());
            courseNames.add(course.getName());
        }
        response.setCourseIds(courseIds);
        response.setCourseNames(courseNames);
        response.setUsername(student.getUsername());
        response.setAdmissionDetails(student.getAdmissionDetails() == null ? java.util.Map.of()
                : java.util.Map.copyOf(student.getAdmissionDetails()));
        return response;
    }

    private java.util.List<Course> findCourses(java.util.List<Long> courseIds) {
        if (courseIds == null || courseIds.isEmpty())
            return new java.util.ArrayList<>();
        java.util.List<Course> courses = courseRepository.findAllById(courseIds);
        if (courses.size() != courseIds.stream().distinct().count()) {
            throw new com.ankit.school_management.exception.CourseNotFoundException(
                    "One or more selected courses do not exist");
        }
        return new java.util.ArrayList<>(courses);
    }

    private void createStudentAccount(Student student, String requestedUsername, String password) {
        if (password == null || password.isBlank())
            return;
        String username = requestedUsername == null || requestedUsername.isBlank() ? student.getAdmissionNumber()
                : requestedUsername.trim();
        student.setUsername(username);
        if (userRepository.findByUsername(username).isPresent()) {
            throw new DuplicateResourceException("An account already exists for admission number " + username);
        }
        userRepository.save(new User(username, passwordEncoder.encode(password), Role.STUDENT));
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private String resolveAdmissionNumber(String requestedAdmissionNumber, Student existingStudent) {
        if (requestedAdmissionNumber != null && !requestedAdmissionNumber.isBlank()) {
            return requestedAdmissionNumber.trim();
        }
        if (existingStudent != null && existingStudent.getAdmissionNumber() != null
                && !existingStudent.getAdmissionNumber().isBlank()) {
            return existingStudent.getAdmissionNumber();
        }
        return generateNextAdmissionNumber();
    }

    private synchronized String reserveNextAdmissionNumber() {
        String admissionNumber = generateNextAdmissionNumber();
        while (studentRepository.existsByAdmissionNumber(admissionNumber)) {
            admissionNumber = generateNextAdmissionNumber();
        }
        return admissionNumber;
    }

    private String generateNextAdmissionNumber() {
        int nextSequence = 0;
        for (Student student : studentRepository
                .findByAdmissionNumberStartingWithIgnoreCaseOrderByIdDesc(ADMISSION_PREFIX)) {
            int sequence = extractAdmissionSequence(student.getAdmissionNumber());
            if (sequence > nextSequence) {
                nextSequence = sequence;
            }
        }
        nextSequence++;
        return String.format(Locale.ROOT, "%s%02d", ADMISSION_PREFIX, nextSequence);
    }

    private int extractAdmissionSequence(String admissionNumber) {
        if (admissionNumber == null) {
            return 0;
        }
        Matcher matcher = ADMISSION_NUMBER_PATTERN.matcher(admissionNumber.trim());
        if (!matcher.matches()) {
            return 0;
        }
        return Integer.parseInt(matcher.group(1));
    }
}
