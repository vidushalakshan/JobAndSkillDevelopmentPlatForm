package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.dto.JobPostDto;
import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.repo.JobPostRepo;
import jakarta.transaction.Transactional;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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

   public List<JobPostDto> getAllJobPosts() {
       List<JobPost> jobPostList = jobPostRepo.findAll();
       return modelMapper.map(jobPostList, new TypeToken<List<JobPostDto>>() {}.getType());
   }

   public JobPostDto updateJobPost(JobPostDto jobPostDto) {
       jobPostRepo.save(modelMapper.map(jobPostDto, JobPost.class));
       return jobPostDto;
   }

   public String deleteJobPost(Long id) {
       jobPostRepo.deleteById(id);
       return "Job post deleted..";
   }

   public JobPostDto getJobPostById(Long id) {
       JobPost item = jobPostRepo.findJobPostById(id);
       return modelMapper.map(item, JobPostDto.class);
   }


}
