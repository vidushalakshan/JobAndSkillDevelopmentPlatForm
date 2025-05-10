package com.platfrom.JobAndSkillDevelopment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "jobpost")
@AllArgsConstructor
@NoArgsConstructor
public class JobPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String title;

    @Column(nullable = false)
    String description;

    @Column(nullable = false)
    String location;

    @Column(nullable = false)
    String type;
    String salary;
    LocalDate deadline;

    @ManyToOne
<<<<<<< HEAD
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
=======
    @JoinColumn(name = "user_id",nullable = false)
>>>>>>> 909e0bd946b1dc5e15f0482c9ad4ad9c0a1aeb05
    private User user;
}
