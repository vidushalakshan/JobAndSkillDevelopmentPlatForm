package com.platfrom.JobAndSkillDevelopment.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private long expiresIn;
    private String username;
    private String email;
    private String pictureUrl;
    private String role;

    public LoginResponse(String token, long expiresIn, String username, String email, String pictureUrl, String role) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.username = username;
        this.email = email;
        this.pictureUrl = pictureUrl;
        this.role = role;
    }
}
