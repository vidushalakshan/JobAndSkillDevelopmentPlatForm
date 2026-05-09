package com.platfrom.JobAndSkillDevelopment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Entity
@Data
@Table(name = "user")
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column( nullable = false)
    String username;

    @Column(unique = true, nullable = true)
    String email;

    @Column(nullable = false)
    String password;

    @Column(name = "verification_code")
    String verificationCode;

    @Column(name = "verification_expiration")
    LocalDateTime verificationCodeExpiresAt;

    @Enumerated(EnumType.STRING)
    private Role role;;

    @Column(name = "picture_url")
    private String pictureUrl;

    // --- Professional Profile Fields ---
    @Column(length = 500)
    private String headline; // e.g. "Senior Software Engineer at Google"

    @Column(length = 2000)
    private String bio;

    private String phone;
    private String location;
    private String website;

    @Column(name = "skills", length = 1000)
    private String skills; // Comma-separated list

    @Column(name = "resume_url")
    private String resumeUrl;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<JobPost> jobPosts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Course> courses = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Education> educations = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<WorkExperience> workExperiences = new ArrayList<>();

    boolean enabled;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(){
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + this.role.name());
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
