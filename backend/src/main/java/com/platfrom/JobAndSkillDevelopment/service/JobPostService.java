package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.dto.JobPostDto;
import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.repo.JobPostRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class JobPostService {

    @Autowired
    private JobPostRepo jobPostRepo;

    @Autowired
    private ModelMapper modelMapper;

   public JobPostDto saveJobPost(JobPostDto jobPostDto) {
       jobPostRepo.save(modelMapper.map(jobPostDto, JobPost.class));
       return jobPostDto;
   }

}
