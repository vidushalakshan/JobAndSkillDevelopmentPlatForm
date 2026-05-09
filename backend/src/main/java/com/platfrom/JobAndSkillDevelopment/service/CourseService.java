package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.dto.CourseRequest;
import com.platfrom.JobAndSkillDevelopment.entity.Course;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.repo.CourseRepo;
import com.platfrom.JobAndSkillDevelopment.repo.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepo courseRepo;
    private final UserRepo userRepo;

    public CourseService(CourseRepo courseRepo, UserRepo userRepo) {
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Course> getPublishedCourses() {
        return courseRepo.findByPublishedTrue();
    }

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public List<Course> getMyCourses() {
        return courseRepo.findByUser(getCurrentUser());
    }

    public List<Course> getEnrolledCourses() {
        User user = getCurrentUser();
        return courseRepo.findAll().stream()
                .filter(c -> c.getEnrolledUsers().contains(user))
                .toList();
    }

    public Course createCourse(CourseRequest req) {
        User user = getCurrentUser();
        Course course = new Course();
        course.setTitle(req.getTitle());
        course.setDescription(req.getDescription());
        course.setCategory(req.getCategory());
        course.setInstructor(req.getInstructor() != null ? req.getInstructor() : user.getUsername());
        course.setLevel(req.getLevel());
        course.setDuration(req.getDuration());
        course.setPrice(req.getPrice());
        course.setThumbnail(req.getThumbnail());
        course.setSyllabus(req.getSyllabus());
        course.setVideoUrl(req.getVideoUrl());
        course.setUser(user);
        course.setPublished(false); // Needs admin approval
        return courseRepo.save(course);
    }

    public Course publishCourse(Long id) {
        Course course = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setPublished(true);
        return courseRepo.save(course);
    }

    public Course unpublishCourse(Long id) {
        Course course = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setPublished(false);
        return courseRepo.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepo.deleteById(id);
    }

    public Course enrollInCourse(Long id) {
        Course course = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        User user = getCurrentUser();
        
        if (!course.getEnrolledUsers().contains(user)) {
            course.getEnrolledUsers().add(user);
            course.setEnrollmentCount(course.getEnrollmentCount() + 1);
        }
        
        return courseRepo.save(course);
    }
}
