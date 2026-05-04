package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.JobStatus;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.repo.JobRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobService {
    private final JobRepo jobRepo;

    public JobService(JobRepo jobRepo) {
        this.jobRepo = jobRepo;
    }

    public JobPost createJob(JobPost job, User user) {
        job.setUser(user);
        job.setStatus(JobStatus.PENDING);
        return jobRepo.save(job);
    }

    public List<JobPost> getAllJobs() {
        return jobRepo.findAll();
    }

    public List<JobPost> getApprovedJobs() {
        return jobRepo.findByStatus(JobStatus.APPROVED);
    }

    public JobPost updateStatus(Long jobId, JobStatus status) {
        JobPost job = jobRepo.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        job.setStatus(status);
        return jobRepo.save(job);
    }

    public void deleteJob(Long jobId) {
        jobRepo.deleteById(jobId);
    }
}
