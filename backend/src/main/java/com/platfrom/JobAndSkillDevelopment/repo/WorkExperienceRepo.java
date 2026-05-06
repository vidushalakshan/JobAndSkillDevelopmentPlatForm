package com.platfrom.JobAndSkillDevelopment.repo;

import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.entity.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkExperienceRepo extends JpaRepository<WorkExperience, Long> {
    List<WorkExperience> findByUser(User user);
    void deleteByUser(User user);
}
