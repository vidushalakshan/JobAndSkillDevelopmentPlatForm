package com.platfrom.JobAndSkillDevelopment.dto;

import lombok.Data;

@Data
public class CourseRequest {
    private String title;
    private String description;
    private String category;
    private String instructor;
    private String level;
    private String duration;
    private String price;
    private String thumbnail;
    private String syllabus;
    private String videoUrl;
}
