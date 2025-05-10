package com.platfrom.JobAndSkillDevelopment.repo;

import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobPostRepo extends JpaRepository<JobPost, Long> {
    @Query(value = "SELECT * FROM jobpost WHERE user_id =?1",nativeQuery = true )
    JobPost findJobPostById(Long id);

    @Query("SELECT j FROM JobPost j JOIN FETCH j.user")
    List<JobPost> findAllWithUser();
}
