package com.platfrom.JobAndSkillDevelopment.exception;

import com.platfrom.JobAndSkillDevelopment.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGeneralException(Exception e) {
        e.printStackTrace(); // Keep logging for server-side debugging
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Internal System Error: " + e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Object>> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(e.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntimeException(RuntimeException e) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        if (e.getMessage().contains("User not found")) {
            status = HttpStatus.NOT_FOUND;
        } else if (e.getMessage().contains("Access Denied") || e.getMessage().contains("Unauthorized")) {
            status = HttpStatus.FORBIDDEN;
        }

        return ResponseEntity
                .status(status)
                .body(ApiResponse.error(e.getMessage()));
    }
}
