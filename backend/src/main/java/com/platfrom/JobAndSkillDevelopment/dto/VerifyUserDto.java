package com.platfrom.JobAndSkillDevelopment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VerifyUserDto {
    String email;
    String verificationCode;
}
