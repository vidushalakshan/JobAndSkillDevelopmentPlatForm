package com.platfrom.JobAndSkillDevelopment.repo;

import com.platfrom.JobAndSkillDevelopment.entity.Education;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EducationRepo extends JpaRepository<Education, Long> {
    List<Education> findByUser(User user);
    void deleteByUser(User user);
}
