package com.platfrom.JobAndSkillDevelopment.config;

import com.platfrom.JobAndSkillDevelopment.service.ai.ResumeParserService;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.service.AiServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiConfiguration {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    @Bean
    public GoogleAiGeminiChatModel geminiChatModel() {
        return GoogleAiGeminiChatModel.builder()
                .apiKey(apiKey)
                .modelName("gemini-2.5-flash")
                .logRequestsAndResponses(true)
                .build();
    }

    @Bean
    public ResumeParserService resumeParserService(GoogleAiGeminiChatModel geminiChatModel) {
        return AiServices.builder(ResumeParserService.class)
                .chatModel(geminiChatModel)
                .build();
    }
}
