package com.platfrom.JobAndSkillDevelopment.dto;

import com.platfrom.JobAndSkillDevelopment.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String username;
    private String email;
    private Role role;
    private String phone;
    private boolean verified;
}
