package com.platfrom.JobAndSkillDevelopment.dto;

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
<<<<<<< HEAD
}
=======
    Long userId;
    String username;
}
>>>>>>> 909e0bd946b1dc5e15f0482c9ad4ad9c0a1aeb05
