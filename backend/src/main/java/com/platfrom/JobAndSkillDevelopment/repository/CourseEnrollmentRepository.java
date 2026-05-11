package com.platfrom.JobAndSkillDevelopment.repository;

import com.platfrom.JobAndSkillDevelopment.entity.CourseEnrollment;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, Long> {
    List<CourseEnrollment> findByUser(User user);
    Optional<CourseEnrollment> findByUserAndCourse(User user, Course course);
    List<CourseEnrollment> findByStatus(String status);
}
