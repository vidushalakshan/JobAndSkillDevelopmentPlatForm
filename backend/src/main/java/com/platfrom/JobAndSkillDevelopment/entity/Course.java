package com.platfrom.JobAndSkillDevelopment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "course")
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String title;

    @Column(nullable = false, length = 2000)
    String description;

    @Column(nullable = false)
    String category;

    String instructor;
    String level; // Beginner, Intermediate, Advanced
    String duration; // e.g. "8 Weeks"
    String price;
    String thumbnail;
    String syllabus;

    @Column(name = "enrollment_count")
    int enrollmentCount = 0;

    boolean published = false;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User user;
}
