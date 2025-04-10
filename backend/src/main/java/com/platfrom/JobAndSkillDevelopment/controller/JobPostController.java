package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.dto.JobPostDto;
import com.platfrom.JobAndSkillDevelopment.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(value = "/api/v1/")
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

    @PostMapping("addjob")
    public JobPostDto saveJob(@RequestBody JobPostDto jobPostDto) {
        return jobPostService.saveJobPost(jobPostDto);
    }


}
