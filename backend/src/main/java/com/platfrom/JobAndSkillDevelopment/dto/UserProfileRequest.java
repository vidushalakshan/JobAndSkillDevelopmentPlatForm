package com.platfrom.JobAndSkillDevelopment.dto;

import lombok.Data;

@Data
public class UserProfileRequest {
    private String username;
    private String headline;
    private String bio;
    private String phone;
    private String location;
    private String website;
    private String skills; // comma-separated
    private String resumeUrl;
}
