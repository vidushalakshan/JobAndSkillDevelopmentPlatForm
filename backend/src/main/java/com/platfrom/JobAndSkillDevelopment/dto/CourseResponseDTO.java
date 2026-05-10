package com.platfrom.JobAndSkillDevelopment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponseDTO {
    private Long id;
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
    private int enrollmentCount;
    private boolean published;
    private Long creatorId;
}
