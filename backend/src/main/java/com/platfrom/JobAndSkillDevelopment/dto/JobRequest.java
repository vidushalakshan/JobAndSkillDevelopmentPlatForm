package com.platfrom.JobAndSkillDevelopment.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class JobRequest {
    private String title;
    private String description;
    private String location;
    private String type;
    private String salary;
    private LocalDate deadline;
    private String contactEmail;
}
