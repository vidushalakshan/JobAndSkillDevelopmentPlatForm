package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.dto.JobPostDto;
import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.repo.JobPostRepo;
import com.platfrom.JobAndSkillDevelopment.repo.UserRepo;
import jakarta.transaction.Transactional;
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

    @Autowired
    private UserRepo userRepo;

   public JobPostDto saveJobPost(JobPostDto jobPostDto) {
       System.out.println("Received userId: " + jobPostDto.getUserId());
       JobPost jobPost = modelMapper.map(jobPostDto, JobPost.class);

       User user = userRepo.findById(Math.toIntExact(jobPostDto.getUserId()))
               .orElseThrow(() -> new RuntimeException("User not found"));

       jobPost.setUser(user);
       jobPostRepo.save(jobPost);

       System.out.println("Job post saved successfully");
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
