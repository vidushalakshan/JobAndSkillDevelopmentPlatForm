package com.platfrom.JobAndSkillDevelopment.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception e) {
        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());
        error.put("type", e.getClass().getSimpleName());
        
        // Log the exception for debugging
        e.printStackTrace();

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (e instanceof RuntimeException && e.getMessage().contains("User not found")) {
            status = HttpStatus.NOT_FOUND;
        } else if (e instanceof IllegalArgumentException) {
            status = HttpStatus.BAD_REQUEST;
        }
        
        return ResponseEntity.status(status).body(error);
    }
}

