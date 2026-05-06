package com.platfrom.JobAndSkillDevelopment.dto;

import lombok.Data;

@Data
public class EducationRequest {
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private String startYear;
    private String endYear;
    private String description;
    private boolean current;
}
