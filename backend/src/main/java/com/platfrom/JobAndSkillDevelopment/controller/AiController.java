package com.platfrom.JobAndSkillDevelopment.controller;

import com.platfrom.JobAndSkillDevelopment.dto.ai.ResumeData;
import com.platfrom.JobAndSkillDevelopment.service.ai.ResumeParserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class AiController {

    private final ResumeParserService resumeParserService;

    @PostMapping("/parse-resume")
    public ResponseEntity<ResumeData> parseResume(@RequestParam("file") MultipartFile file) {
        log.info("Received resume parse request for file: {}", file.getOriginalFilename());
        try {
            String text;
            if (file.getContentType() != null && file.getContentType().equals("application/pdf")) {
                log.info("Extracting text from PDF...");
                text = extractTextFromPdf(file);
            } else {
                text = new String(file.getBytes());
            }

            log.info("Sending text to Gemini AI (Length: {} characters)...", text.length());
            ResumeData data = resumeParserService.parseResume(text);
            log.info("AI Parsing successful for: {}", data.getFullName());
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            log.error("CRITICAL ERROR during resume parsing: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
}
