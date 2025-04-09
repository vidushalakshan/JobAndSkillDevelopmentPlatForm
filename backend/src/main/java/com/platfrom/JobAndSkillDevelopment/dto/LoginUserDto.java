package com.platfrom.JobAndSkillDevelopment.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class LoginUserDto {
    String email;
    String password;
}
