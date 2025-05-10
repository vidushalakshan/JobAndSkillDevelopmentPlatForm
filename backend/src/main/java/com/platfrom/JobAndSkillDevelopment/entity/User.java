package com.platfrom.JobAndSkillDevelopment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<JobPost> jobPosts = new ArrayList<>();


    boolean enabled;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(){
    }

    @Override
    public String getUsername() {
<<<<<<< HEAD
        return this.username;
    }

=======
        return  this.username;
    }
>>>>>>> 909e0bd946b1dc5e15f0482c9ad4ad9c0a1aeb05

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + this.role.name());
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
