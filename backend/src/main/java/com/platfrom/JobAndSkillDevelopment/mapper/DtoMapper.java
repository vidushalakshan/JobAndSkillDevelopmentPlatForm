package com.platfrom.JobAndSkillDevelopment.mapper;

import com.platfrom.JobAndSkillDevelopment.dto.CourseResponseDTO;
import com.platfrom.JobAndSkillDevelopment.dto.JobResponseDTO;
import com.platfrom.JobAndSkillDevelopment.dto.UserResponseDTO;
import com.platfrom.JobAndSkillDevelopment.entity.Course;
import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import org.springframework.stereotype.Component;

@Component
public class DtoMapper {

    public UserResponseDTO toUserDTO(User user) {
        if (user == null) return null;
        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .phone(user.getPhone())
                .verified(user.isVerified())
                .build();
    }

    public JobResponseDTO toJobDTO(JobPost job) {
        if (job == null) return null;
        return JobResponseDTO.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .location(job.getLocation())
                .type(job.getType())
                .salary(job.getSalary())
                .deadline(job.getDeadline())
                .status(job.getStatus())
                .contactEmail(job.getContactEmail())
                .postedById(job.getUser() != null ? job.getUser().getId() : null)
                .postedByUsername(job.getUser() != null ? job.getUser().getUsername() : "System")
                .build();
    }

    public CourseResponseDTO toCourseDTO(Course course) {
        if (course == null) return null;
        return CourseResponseDTO.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .category(course.getCategory())
                .instructor(course.getInstructor())
                .level(course.getLevel())
                .duration(course.getDuration())
                .price(course.getPrice())
                .thumbnail(course.getThumbnail())
                .syllabus(course.getSyllabus())
                .videoUrl(course.getVideoUrl())
                .enrollmentCount(course.getEnrollmentCount())
                .published(course.isPublished())
                .creatorId(course.getUser() != null ? course.getUser().getId() : null)
                .build();
    }
}
