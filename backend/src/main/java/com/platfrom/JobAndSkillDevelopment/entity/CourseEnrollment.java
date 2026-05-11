package com.platfrom.JobAndSkillDevelopment.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class CourseEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private int progress = 0; // 0 to 100

    private String status = "ENROLLED"; // ENROLLED, COMPLETED

    private LocalDateTime enrolledAt = LocalDateTime.now();

    private LocalDateTime completedAt;
}
