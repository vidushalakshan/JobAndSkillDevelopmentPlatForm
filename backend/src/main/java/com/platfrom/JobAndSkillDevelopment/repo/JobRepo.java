package com.platfrom.JobAndSkillDevelopment.repo;

import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.JobStatus;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepo extends JpaRepository<JobPost, Long> {
    List<JobPost> findByStatus(JobStatus status);
    List<JobPost> findByUser(User user);
}
