package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.dto.EducationRequest;
import com.platfrom.JobAndSkillDevelopment.dto.WorkExperienceRequest;
import com.platfrom.JobAndSkillDevelopment.entity.Education;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.entity.WorkExperience;
import com.platfrom.JobAndSkillDevelopment.repo.EducationRepo;
import com.platfrom.JobAndSkillDevelopment.repo.UserRepo;
import com.platfrom.JobAndSkillDevelopment.repo.WorkExperienceRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    private final EducationRepo educationRepo;
    private final WorkExperienceRepo workExperienceRepo;
    private final UserRepo userRepo;
    private final NotificationService notificationService;

    public ProfileService(EducationRepo educationRepo, WorkExperienceRepo workExperienceRepo, UserRepo userRepo, NotificationService notificationService) {
        this.educationRepo = educationRepo;
        this.workExperienceRepo = workExperienceRepo;
        this.userRepo = userRepo;
        this.notificationService = notificationService;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // --- EDUCATION ---
    public List<Education> getMyEducation() {
        return educationRepo.findByUser(getCurrentUser());
    }

    public Education addEducation(EducationRequest req) {
        Education edu = new Education();
        edu.setInstitution(req.getInstitution());
        edu.setDegree(req.getDegree());
        edu.setFieldOfStudy(req.getFieldOfStudy());
        edu.setStartYear(req.getStartYear());
        edu.setEndYear(req.isCurrent() ? null : req.getEndYear());
        edu.setDescription(req.getDescription());
        edu.setCurrent(req.isCurrent());
        edu.setUser(getCurrentUser());
        return educationRepo.save(edu);
    }

    public void deleteEducation(Long id) {
        educationRepo.deleteById(id);
    }

    // --- WORK EXPERIENCE ---
    public List<WorkExperience> getMyWorkExperience() {
        return workExperienceRepo.findByUser(getCurrentUser());
    }

    public WorkExperience addWorkExperience(WorkExperienceRequest req) {
        WorkExperience exp = new WorkExperience();
        exp.setCompany(req.getCompany());
        exp.setRole(req.getRole());
        exp.setDescription(req.getDescription());
        exp.setStartDate(req.getStartDate());
        exp.setEndDate(req.isCurrent() ? null : req.getEndDate());
        exp.setCurrent(req.isCurrent());
        exp.setLocation(req.getLocation());
        exp.setUser(getCurrentUser());
        return workExperienceRepo.save(exp);
    }

    public void deleteWorkExperience(Long id) {
        workExperienceRepo.deleteById(id);
    }

    // --- PUBLIC PROFILE (for Talent Search) ---
    public List<User> getAllPublicProfiles() {
        return java.util.stream.StreamSupport.stream(userRepo.findAll().spliterator(), false)
                .filter(u -> u.getRole() != null && u.getRole().name().equals("USER"))
                .toList();
    }

    public User getPublicProfile(Long userId) {
        User targetUser = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        try {
            User viewer = getCurrentUser();
            if (!viewer.getId().equals(targetUser.getId())) {
                notificationService.sendNotification(
                    targetUser,
                    "Profile View",
                    viewer.getUsername() + " viewed your profile.",
                    com.platfrom.JobAndSkillDevelopment.entity.NotificationType.PROFILE_VIEW
                );
            }
        } catch (Exception e) {
            // Viewer is anonymous or system error, skip notification
        }
        
        return targetUser;
    }
}
