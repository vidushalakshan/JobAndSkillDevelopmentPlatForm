package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.dto.JobRequest;
import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.JobStatus;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Any logged-in user can submit a job — goes to PENDING for admin approval
    @PostMapping("/create")
    public ResponseEntity<JobPost> createJob(@RequestBody JobRequest jobRequest, @AuthenticationPrincipal User user) {
        JobPost job = new JobPost();
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setLocation(jobRequest.getLocation());
        job.setType(jobRequest.getType());
        job.setSalary(jobRequest.getSalary());
        job.setDeadline(jobRequest.getDeadline());
        return ResponseEntity.ok(jobService.createJob(job, user));
    }

    // Admin can post a job that is immediately APPROVED
    @PostMapping("/admin-create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobPost> adminCreateJob(@RequestBody JobRequest jobRequest, @AuthenticationPrincipal User user) {
        JobPost job = new JobPost();
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setLocation(jobRequest.getLocation());
        job.setType(jobRequest.getType());
        job.setSalary(jobRequest.getSalary());
        job.setDeadline(jobRequest.getDeadline());
        return ResponseEntity.ok(jobService.createJobAsAdmin(job, user));
    }

    // Admin: get all jobs
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllJobs() {
        try {
            return ResponseEntity.ok(jobService.getAllJobs());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching all jobs: " + e.getMessage());
        }
    }

    // Admin: get only pending jobs (approval queue)
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingJobs() {
        try {
            return ResponseEntity.ok(jobService.getPendingJobs());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching pending jobs: " + e.getMessage());
        }
    }

    // Public: get approved jobs
    @GetMapping("/approved")
    public ResponseEntity<?> getApprovedJobs() {
        try {
            return ResponseEntity.ok(jobService.getApprovedJobs());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching approved jobs: " + e.getMessage());
        }
    }

    // Logged-in user: get their own job posts
    @GetMapping("/my")
    public ResponseEntity<List<JobPost>> getMyJobs(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(jobService.getMyJobs(user));
    }

    // Admin: approve or reject a job
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobPost> updateStatus(@PathVariable Long id, @RequestParam JobStatus status) {
        return ResponseEntity.ok(jobService.updateStatus(id, status));
    }

    // Admin: delete a job
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok("Job deleted successfully");
    }
}
