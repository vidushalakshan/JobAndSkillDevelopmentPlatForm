package com.platfrom.JobAndSkillDevelopment.dto;

import com.platfrom.JobAndSkillDevelopment.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobPostDto {
    Long id;
    String title;
    String description;
    String location;
    String type;
    String salary;
    LocalDate deadline;
    User user;
}
