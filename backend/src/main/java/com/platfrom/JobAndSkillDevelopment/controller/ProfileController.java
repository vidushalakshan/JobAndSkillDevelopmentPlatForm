package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.dto.EducationRequest;
import com.platfrom.JobAndSkillDevelopment.dto.WorkExperienceRequest;
import com.platfrom.JobAndSkillDevelopment.entity.Education;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.entity.WorkExperience;
import com.platfrom.JobAndSkillDevelopment.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // --- Education ---
    @GetMapping("/education")
    public ResponseEntity<List<Education>> getMyEducation() {
        return ResponseEntity.ok(profileService.getMyEducation());
    }

    @PostMapping("/education")
    public ResponseEntity<Education> addEducation(@RequestBody EducationRequest req) {
        return ResponseEntity.ok(profileService.addEducation(req));
    }

    @DeleteMapping("/education/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        profileService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }

    // --- Work Experience ---
    @GetMapping("/experience")
    public ResponseEntity<List<WorkExperience>> getMyExperience() {
        return ResponseEntity.ok(profileService.getMyWorkExperience());
    }

    @PostMapping("/experience")
    public ResponseEntity<WorkExperience> addExperience(@RequestBody WorkExperienceRequest req) {
        return ResponseEntity.ok(profileService.addWorkExperience(req));
    }

    @DeleteMapping("/experience/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        profileService.deleteWorkExperience(id);
        return ResponseEntity.noContent().build();
    }

    // --- Public: Talent Search ---
    @GetMapping("/talents")
    public ResponseEntity<List<User>> getTalents() {
        return ResponseEntity.ok(profileService.getAllPublicProfiles());
    }

    @GetMapping("/talents/{id}")
    public ResponseEntity<User> getTalentProfile(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getPublicProfile(id));
    }
}
