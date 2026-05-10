package com.platfrom.JobAndSkillDevelopment.service.ai;

import com.platfrom.JobAndSkillDevelopment.dto.ai.ResumeData;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface ResumeParserService {

    @SystemMessage("""
            You are an elite Technical Recruiter and AI Data Architect.
            Your mission is to parse the provided resume text into a highly structured JSON format.
            
            GUIDELINES:
            1. FULL NAME: Identify the candidate's primary name.
            2. SUMMARY: Create a 2-3 sentence high-impact professional summary based on their background.
            3. SKILLS: Extract technical skills, tools, and soft skills as a list.
            4. EXPERIENCE: Extract company name, role, duration (e.g. "Jan 2020 - Present"), and a concise description of responsibilities.
            5. EDUCATION: Extract degree, institution, and graduation year.
            
            If data is missing for any field, return null or an empty list. 
            Do not invent information. 
            Output must be strictly valid JSON according to the ResumeData schema.
            """)
    @UserMessage("Analyze and architect this resume dossier: \n\n {{it}}")
    ResumeData parseResume(String resumeText);
}
