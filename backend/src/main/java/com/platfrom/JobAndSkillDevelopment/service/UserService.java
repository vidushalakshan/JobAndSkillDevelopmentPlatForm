package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.dto.UserProfileRequest;
import com.platfrom.JobAndSkillDevelopment.entity.Role;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.repo.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepository;

    public UserService(UserRepo userRepository, EmailService emailService) {
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getMyProfile() {
        return getCurrentUser();
    }

    public User updateMyProfile(UserProfileRequest req) {
        User user = getCurrentUser();
        if (req.getUsername() != null) user.setUsername(req.getUsername());
        if (req.getHeadline() != null) user.setHeadline(req.getHeadline());
        if (req.getBio() != null) user.setBio(req.getBio());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getLocation() != null) user.setLocation(req.getLocation());
        if (req.getWebsite() != null) user.setWebsite(req.getWebsite());
        if (req.getSkills() != null) user.setSkills(req.getSkills());
        if (req.getResumeUrl() != null) user.setResumeUrl(req.getResumeUrl());
        return userRepository.save(user);
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateRole(Long id, Role role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(role);
        return userRepository.save(user);
    }
}
