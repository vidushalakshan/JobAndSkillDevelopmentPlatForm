package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.dto.CourseRequest;
import com.platfrom.JobAndSkillDevelopment.entity.Course;
import com.platfrom.JobAndSkillDevelopment.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // Public - browse published courses
    @GetMapping("/published")
    public ResponseEntity<List<Course>> getPublishedCourses() {
        return ResponseEntity.ok(courseService.getPublishedCourses());
    }

    // Authenticated - get own courses
    @GetMapping("/my")
    public ResponseEntity<List<Course>> getMyCourses() {
        return ResponseEntity.ok(courseService.getMyCourses());
    }

    // Authenticated - create a course (goes to admin for approval)
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody CourseRequest req) {
        return ResponseEntity.ok(courseService.createCourse(req));
    }

    // Authenticated - enroll in a course
    @PostMapping("/{id}/enroll")
    public ResponseEntity<Course> enroll(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.enrollInCourse(id));
    }

    // Admin only endpoints
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Course> publishCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.publishCourse(id));
    }

    @PutMapping("/{id}/unpublish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Course> unpublishCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.unpublishCourse(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
