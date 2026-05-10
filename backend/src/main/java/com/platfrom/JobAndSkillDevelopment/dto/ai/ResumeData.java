package com.platfrom.JobAndSkillDevelopment.dto.ai;

import lombok.Data;
import java.util.List;

@Data
public class ResumeData {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String location;
    private String summary;
    private List<String> skills;
    private List<ExperienceData> experiences;
    private List<EducationData> educations;

    @Data
    public static class ExperienceData {
        private String company;
        private String role;
        private String duration;
        private String description;
    }

    @Data
    public static class EducationData {
        private String institution;
        private String degree;
        private String year;
    }
}
