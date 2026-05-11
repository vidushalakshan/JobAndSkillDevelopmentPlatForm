package com.platfrom.JobAndSkillDevelopment;

import io.github.cdimascio.dotenv.Dotenv;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JobAndSkillDevelopmentApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure()
				.ignoreIfMissing()
				.load();

		if (dotenv.get("GEMINI_API_KEY") == null) {
			dotenv = Dotenv.configure()
					.directory("..")
					.ignoreIfMissing()
					.load();
		}

		System.setProperty("JWT_SECRET_KEY", dotenv.get("JWT_SECRET_KEY") != null ? dotenv.get("JWT_SECRET_KEY") : "");
		System.setProperty("SUPPORT_EMAIL", dotenv.get("SUPPORT_EMAIL") != null ? dotenv.get("SUPPORT_EMAIL") : "");
		System.setProperty("APP_PASSWORD", dotenv.get("APP_PASSWORD") != null ? dotenv.get("APP_PASSWORD") : "");
		System.setProperty("GOOGLE_CLIENT_ID", dotenv.get("GOOGLE_CLIENT_ID") != null ? dotenv.get("GOOGLE_CLIENT_ID") : "");
		System.setProperty("GEMINI_API_KEY", dotenv.get("GEMINI_API_KEY") != null ? dotenv.get("GEMINI_API_KEY") : "");
		
		SpringApplication.run(JobAndSkillDevelopmentApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}