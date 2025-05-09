package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.dto.JobPostDto;
import com.platfrom.JobAndSkillDevelopment.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/v1")
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

    @PostMapping("/addjob")
    public JobPostDto saveJob(@RequestBody JobPostDto jobPostDto, Principal principal) {
        if (principal == null) {
            throw new RuntimeException("User not authenticated");
        }

        System.out.println("Authenticated user: " + principal.getName());
        return jobPostService.saveJobPost(jobPostDto, principal.getName());
    }

    @GetMapping("getjobs")
    public List<JobPostDto> getJobs() {
        System.out.println("working getjobs");
        return jobPostService.getAllJobPosts();
    }

    @PutMapping("updatejob")
    public JobPostDto updateJob(@RequestBody JobPostDto jobPostDto) {
        return jobPostService.updateJobPost(jobPostDto);
    }

    @DeleteMapping("deletejob/{id}")
    public String deleteJob(@PathVariable Long id) {
        return jobPostService.deleteJobPost(id);
    }

    @GetMapping("getjob/{id}")
    public JobPostDto getJobById(@PathVariable Long id) {
        return jobPostService.getJobPostById(id);
    }

}
