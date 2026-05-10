package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.dto.CourseRequest;
import com.platfrom.JobAndSkillDevelopment.dto.CourseResponseDTO;
import com.platfrom.JobAndSkillDevelopment.entity.Course;
import com.platfrom.JobAndSkillDevelopment.mapper.DtoMapper;
import com.platfrom.JobAndSkillDevelopment.responses.ApiResponse;
import com.platfrom.JobAndSkillDevelopment.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    private final CourseService courseService;
    private final DtoMapper dtoMapper;

    public CourseController(CourseService courseService, DtoMapper dtoMapper) {
        this.courseService = courseService;
        this.dtoMapper = dtoMapper;
    }

    @GetMapping("/published")
    public ResponseEntity<ApiResponse<List<CourseResponseDTO>>> getPublishedCourses() {
        List<CourseResponseDTO> courses = courseService.getPublishedCourses().stream()
                .map(dtoMapper::toCourseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(courses, "Course catalog retrieved."));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponseDTO>> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(ApiResponse.success(dtoMapper.toCourseDTO(course), "Project data synchronized."));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<CourseResponseDTO>>> getMyCourses() {
        List<CourseResponseDTO> courses = courseService.getMyCourses().stream()
                .map(dtoMapper::toCourseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(courses, "Personal learning tracks retrieved."));
    }

    @GetMapping("/enrolled")
    public ResponseEntity<ApiResponse<List<com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment>>> getEnrolledCourses() {
        return ResponseEntity.ok(ApiResponse.success(courseService.getEnrolledCourses(), "Active enrollments retrieved."));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponseDTO>> createCourse(@RequestBody CourseRequest req) {
        Course course = courseService.createCourse(req);
        return ResponseEntity.ok(ApiResponse.success(dtoMapper.toCourseDTO(course), "Course proposed successfully."));
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<ApiResponse<CourseResponseDTO>> enroll(@PathVariable Long id) {
        Course course = courseService.enrollInCourse(id);
        return ResponseEntity.ok(ApiResponse.success(dtoMapper.toCourseDTO(course), "Enrollment protocol complete."));
    }

    @PostMapping("/{id}/progress")
    public ResponseEntity<ApiResponse<com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment>> updateProgress(@PathVariable Long id, @RequestParam int progress) {
        return ResponseEntity.ok(ApiResponse.success(courseService.updateProgress(id, progress), "Milestone synced to cloud."));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<CourseResponseDTO>>> getAllCourses() {
        List<CourseResponseDTO> courses = courseService.getAllCourses().stream()
                .map(dtoMapper::toCourseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(courses, "Master project list retrieved."));
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CourseResponseDTO>> publishCourse(@PathVariable Long id) {
        Course course = courseService.publishCourse(id);
        return ResponseEntity.ok(ApiResponse.success(dtoMapper.toCourseDTO(course), "Course is now live."));
    }

    @PutMapping("/{id}/unpublish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CourseResponseDTO>> unpublishCourse(@PathVariable Long id) {
        Course course = courseService.unpublishCourse(id);
        return ResponseEntity.ok(ApiResponse.success(dtoMapper.toCourseDTO(course), "Course moved to draft."));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Course permanently removed."));
    }
}
