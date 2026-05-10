package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.JobStatus;
import com.platfrom.JobAndSkillDevelopment.entity.NotificationType;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.repo.JobRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobService {
    private final JobRepo jobRepo;
    private final NotificationService notificationService;

    public JobService(JobRepo jobRepo, NotificationService notificationService) {
        this.jobRepo = jobRepo;
        this.notificationService = notificationService;
    }

    public JobPost createJob(JobPost job, User user) {
        job.setUser(user);
        job.setStatus(JobStatus.PENDING);
        return jobRepo.save(job);
    }

    public JobPost createJobAsAdmin(JobPost job, User user) {
        job.setUser(user);
        job.setStatus(JobStatus.APPROVED);
        return jobRepo.save(job);
    }

    public List<JobPost> getAllJobs() {
        return jobRepo.findAll();
    }

    public List<JobPost> getApprovedJobs() {
        return jobRepo.findByStatus(JobStatus.APPROVED);
    }

    public List<JobPost> getPendingJobs() {
        return jobRepo.findByStatus(JobStatus.PENDING);
    }

    public List<JobPost> getMyJobs(User user) {
        return jobRepo.findByUser(user);
    }

    public JobPost updateStatus(Long jobId, JobStatus status) {
        JobPost job = jobRepo.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        job.setStatus(status);
        JobPost updated = jobRepo.save(job);
        
        notificationService.sendNotification(
            job.getUser(), 
            "Job Post " + status, 
            "Your posting '" + job.getTitle() + "' has been " + status.toString().toLowerCase() + ".",
            NotificationType.JOB_UPDATE
        );
        
        return updated;
    }

    public JobPost getJobById(Long jobId) {
        return jobRepo.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public void deleteJob(Long jobId) {
        jobRepo.deleteById(jobId);
    }
}
