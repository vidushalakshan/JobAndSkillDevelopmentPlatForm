package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.entity.JobApplication;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.service.JobApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/apply")
@CrossOrigin(origins = "http://localhost:5173")
public class JobApplicationController {
    private final JobApplicationService applicationService;

    public JobApplicationController(JobApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/{jobId}")
    public ResponseEntity<JobApplication> apply(@PathVariable Long jobId, @AuthenticationPrincipal User user, @RequestBody String coverLetter) {
        return ResponseEntity.ok(applicationService.apply(jobId, user, coverLetter));
    }

    @GetMapping("/my")
    public ResponseEntity<List<JobApplication>> getMyApplications(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(applicationService.getMyApplications(user));
    }
}
