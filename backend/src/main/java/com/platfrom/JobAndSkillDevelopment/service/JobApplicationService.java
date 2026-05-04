package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.entity.JobApplication;
import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.repo.JobApplicationRepo;
import com.platfrom.JobAndSkillDevelopment.repo.JobRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobApplicationService {
    private final JobApplicationRepo applicationRepo;
    private final JobRepo jobRepo;

    public JobApplicationService(JobApplicationRepo applicationRepo, JobRepo jobRepo) {
        this.applicationRepo = applicationRepo;
        this.jobRepo = jobRepo;
    }

    public JobApplication apply(Long jobId, User user, String coverLetter) {
        JobPost job = jobRepo.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setApplicant(user);
        application.setCoverLetter(coverLetter);
        return applicationRepo.save(application);
    }

    public List<JobApplication> getMyApplications(User user) {
        return applicationRepo.findByApplicant(user);
    }

    public List<JobApplication> getApplicationsForJob(Long jobId) {
        return applicationRepo.findByJob_Id(jobId);
    }
}
