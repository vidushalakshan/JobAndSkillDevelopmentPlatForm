package com.platfrom.JobAndSkillDevelopment.repo;

import com.platfrom.JobAndSkillDevelopment.entity.Course;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepo extends JpaRepository<Course, Long> {
    List<Course> findByPublishedTrue();
    List<Course> findByUser(User user);
    List<Course> findByPublishedFalse();
    List<Course> findByCategoryAndPublishedTrue(String category);
}
