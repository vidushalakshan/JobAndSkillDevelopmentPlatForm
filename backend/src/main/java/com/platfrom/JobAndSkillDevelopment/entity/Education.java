package com.platfrom.JobAndSkillDevelopment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "education")
@AllArgsConstructor
@NoArgsConstructor
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    private String institution;

    @Column(nullable = false)
    private String degree; // e.g. BSc, MSc, BA

    private String fieldOfStudy;
    private String startYear;
    private String endYear; // null if currently studying
    private String description;
    private boolean current;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User user;
}
