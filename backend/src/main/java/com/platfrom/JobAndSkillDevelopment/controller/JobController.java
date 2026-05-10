package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.dto.JobRequest;
import com.platfrom.JobAndSkillDevelopment.dto.JobResponseDTO;
import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.JobStatus;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.mapper.DtoMapper;
import com.platfrom.JobAndSkillDevelopment.responses.ApiResponse;
import com.platfrom.JobAndSkillDevelopment.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/job")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {
    private final JobService jobService;
    private final DtoMapper dtoMapper;

    public JobController(JobService jobService, DtoMapper dtoMapper) {
        this.jobService = jobService;
        this.dtoMapper = dtoMapper;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<JobResponseDTO>> createJob(@RequestBody JobRequest jobRequest, @AuthenticationPrincipal User user) {
        JobPost job = new JobPost();
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setLocation(jobRequest.getLocation());
        job.setType(jobRequest.getType());
        job.setSalary(jobRequest.getSalary());
        job.setDeadline(jobRequest.getDeadline());
        job.setContactEmail(jobRequest.getContactEmail());
        
        JobPost savedJob = jobService.createJob(job, user);
        return ResponseEntity.ok(ApiResponse.success(dtoMapper.toJobDTO(savedJob), "Job submitted for review."));
    }

    @PostMapping("/admin-create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<JobResponseDTO>> adminCreateJob(@RequestBody JobRequest jobRequest, @AuthenticationPrincipal User user) {
        JobPost job = new JobPost();
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setLocation(jobRequest.getLocation());
        job.setType(jobRequest.getType());
        job.setSalary(jobRequest.getSalary());
        job.setDeadline(jobRequest.getDeadline());
        job.setContactEmail(jobRequest.getContactEmail());
        
        JobPost savedJob = jobService.createJobAsAdmin(job, user);
        return ResponseEntity.ok(ApiResponse.success(dtoMapper.toJobDTO(savedJob), "Job posted and approved."));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<JobResponseDTO>>> getAllJobs() {
        List<JobResponseDTO> jobs = jobService.getAllJobs().stream()
                .map(dtoMapper::toJobDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(jobs, "All records retrieved."));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<JobResponseDTO>>> getPendingJobs() {
        List<JobResponseDTO> jobs = jobService.getPendingJobs().stream()
                .map(dtoMapper::toJobDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(jobs, "Approval queue retrieved."));
    }

    @GetMapping("/approved")
    public ResponseEntity<ApiResponse<List<JobResponseDTO>>> getApprovedJobs() {
        List<JobResponseDTO> jobs = jobService.getApprovedJobs().stream()
                .map(dtoMapper::toJobDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(jobs, "Market data synchronized."));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<JobResponseDTO>>> getMyJobs(@AuthenticationPrincipal User user) {
        List<JobResponseDTO> jobs = jobService.getMyJobs(user).stream()
                .map(dtoMapper::toJobDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(jobs, "Personal deployments retrieved."));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<JobResponseDTO>> updateStatus(@PathVariable Long id, @RequestParam JobStatus status) {
        JobPost updated = jobService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success(dtoMapper.toJobDTO(updated), "Status updated successfully."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id, @AuthenticationPrincipal User user) {
        // Simple security check: admin can delete any, user can delete own
        JobPost job = jobService.getJobById(id);
        if (user.getRole().name().equals("ADMIN") || job.getUser().getId().equals(user.getId())) {
            jobService.deleteJob(id);
            return ResponseEntity.ok(ApiResponse.success(null, "Resource decommissioned."));
        }
        return ResponseEntity.status(403).body(ApiResponse.error("Unauthorized to delete this resource."));
    }
}
