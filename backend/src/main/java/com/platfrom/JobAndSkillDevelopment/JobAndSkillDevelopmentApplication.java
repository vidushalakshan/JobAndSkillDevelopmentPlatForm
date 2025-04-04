package com.platfrom.JobAndSkillDevelopment;

import io.github.cdimascio.dotenv.Dotenv;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JobAndSkillDevelopmentApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("JWT_SECRET_KEY", dotenv.get("JWT_SECRET_KEY"));
		System.setProperty("SUPPORT_EMAIL", dotenv.get("SUPPORT_EMAIL"));
		System.setProperty("APP_PASSWORD", dotenv.get("APP_PASSWORD"));

		SpringApplication.run(JobAndSkillDevelopmentApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
