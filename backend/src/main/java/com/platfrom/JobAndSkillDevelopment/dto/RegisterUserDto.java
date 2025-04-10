package com.platfrom.JobAndSkillDevelopment.dto;

import com.platfrom.JobAndSkillDevelopment.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterUserDto {
    String email;
    String password;
    String username;
    private Role role;
}
