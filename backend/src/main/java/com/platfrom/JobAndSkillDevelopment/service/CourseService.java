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
    private final com.platfrom.JobAndSkillDevelopment.repository.CourseEnrollmentRepository enrollmentRepo;
    private final NotificationService notificationService;

    public CourseService(CourseRepo courseRepo, UserRepo userRepo, com.platfrom.JobAndSkillDevelopment.repository.CourseEnrollmentRepository enrollmentRepo, NotificationService notificationService) {
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.notificationService = notificationService;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Course> getPublishedCourses() {
        return courseRepo.findByPublishedTrue();
    }

    public Course getCourseById(Long id) {
        return courseRepo.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public List<Course> getMyCourses() {
        return courseRepo.findByUser(getCurrentUser());
    }

    public List<com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment> getEnrolledCourses() {
        return enrollmentRepo.findByUser(getCurrentUser());
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
        Course saved = courseRepo.save(course);
        
        if (course.getUser() != null) {
            notificationService.sendNotification(
                course.getUser(),
                "Project Blueprint Published",
                "Your program '" + course.getTitle() + "' has been approved and is now live in the Matrix.",
                com.platfrom.JobAndSkillDevelopment.entity.NotificationType.SYSTEM
            );
        }
        return saved;
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
        
        java.util.Optional<com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment> existing = enrollmentRepo.findByUserAndCourse(user, course);
        if (existing.isEmpty()) {
            com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment enrollment = new com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment();
            enrollment.setUser(user);
            enrollment.setCourse(course);
            enrollment.setStatus("PENDING"); // Approval Workflow
            enrollmentRepo.save(enrollment);

            // Notify Instructor/Admin
            if (course.getUser() != null) {
                notificationService.sendNotification(
                    course.getUser(),
                    "Enrollment Request",
                    user.getUsername() + " has requested access to your course: " + course.getTitle(),
                    com.platfrom.JobAndSkillDevelopment.entity.NotificationType.ENROLLMENT
                );
            }
        }
        
        return course;
    }

    public com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment updateProgress(Long courseId, int progress) {
        User user = getCurrentUser();
        Course course = courseRepo.findById(courseId).orElseThrow();
        com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment enrollment = enrollmentRepo.findByUserAndCourse(user, course)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        
        enrollment.setProgress(progress);
        if (progress >= 100) {
            enrollment.setStatus("COMPLETED");
            enrollment.setCompletedAt(java.time.LocalDateTime.now());
        }
        return enrollmentRepo.save(enrollment);
    }

    public List<com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment> getPendingEnrollments() {
        return enrollmentRepo.findByStatus("PENDING");
    }

    public com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment approveEnrollment(Long enrollmentId) {
        com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment enrollment = enrollmentRepo.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        
        enrollment.setStatus("ENROLLED");
        enrollmentRepo.save(enrollment);

        Course course = enrollment.getCourse();
        course.setEnrollmentCount(course.getEnrollmentCount() + 1);
        courseRepo.save(course);

        notificationService.sendNotification(
            enrollment.getUser(),
            "Access Approved",
            "Your request to access '" + course.getTitle() + "' has been approved. You can now watch the video.",
            com.platfrom.JobAndSkillDevelopment.entity.NotificationType.ENROLLMENT
        );

        return enrollment;
    }

    public void rejectEnrollment(Long enrollmentId) {
        com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment enrollment = enrollmentRepo.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        
                
        notificationService.sendNotification(
            enrollment.getUser(),
            "Access Denied",
            "Your request to access '" + enrollment.getCourse().getTitle() + "' was rejected.",
            com.platfrom.JobAndSkillDevelopment.entity.NotificationType.SYSTEM
        );

        enrollmentRepo.delete(enrollment);
    }
}
