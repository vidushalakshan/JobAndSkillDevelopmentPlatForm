package com.platfrom.JobAndSkillDevelopment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDate;

@Data
public class JobRequest {
    private String title;
    private String description;
    private String location;
    private String type;
    private String salary;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;
    private String contactEmail;
}
