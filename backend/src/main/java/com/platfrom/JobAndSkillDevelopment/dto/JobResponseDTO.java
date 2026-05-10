package com.platfrom.JobAndSkillDevelopment.dto;

import com.platfrom.JobAndSkillDevelopment.entity.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String type;
    private String salary;
    private LocalDate deadline;
    private String contactEmail;
    private JobStatus status;
    private Long postedById;
    private String postedByUsername;
}
