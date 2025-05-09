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

<<<<<<< HEAD
   public JobPostDto saveJobPost(JobPostDto jobPostDto, String email) {
       System.out.println("Authenticated user email: " + email);
=======
   public JobPostDto saveJobPost(JobPostDto jobPostDto) {
       System.out.println("Received userId: " + jobPostDto.getUsername());

>>>>>>> 909e0bd946b1dc5e15f0482c9ad4ad9c0a1aeb05
       JobPost jobPost = modelMapper.map(jobPostDto, JobPost.class);

       User user = userRepo.findByEmail(email)
               .orElseThrow(() -> new RuntimeException("User not found"));

       jobPost.setUser(user);
       jobPostRepo.save(jobPost);

       System.out.println("Job post saved successfully");

       //Map back to Dto with username
       JobPostDto responseDto = modelMapper.map(jobPost, JobPostDto.class);
       responseDto.setUserId(user.getId());
       responseDto.setUsername(user.getUsername());

       return responseDto;
   }

   public List<JobPostDto> getAllJobPosts() {
       List<JobPost> jobPostList = jobPostRepo.findAllWithUser();
       return jobPostList.stream().map(post -> {
           JobPostDto dto = modelMapper.map(post, JobPostDto.class);
           dto.setUsername(post.getUser().getUsername());
           dto.setUserId(post.getUser().getId());
           return dto;
       }).toList();
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
