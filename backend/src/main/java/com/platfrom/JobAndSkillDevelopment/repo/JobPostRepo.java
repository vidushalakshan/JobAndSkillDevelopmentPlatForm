package com.platfrom.JobAndSkillDevelopment.repo;

import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JobPostRepo extends JpaRepository<JobPost, Long> {
    @Query(value = "SELECT * FROM jobpost WHERE id =?1",nativeQuery = true )
    JobPost findJobPostById(Long id);
}
