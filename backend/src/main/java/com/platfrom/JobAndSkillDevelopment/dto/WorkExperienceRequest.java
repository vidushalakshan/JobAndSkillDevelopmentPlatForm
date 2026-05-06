package com.platfrom.JobAndSkillDevelopment.dto;

import lombok.Data;

@Data
public class WorkExperienceRequest {
    private String company;
    private String role;
    private String description;
    private String startDate;
    private String endDate;
    private boolean current;
    private String location;
}
