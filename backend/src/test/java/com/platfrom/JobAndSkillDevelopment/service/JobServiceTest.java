package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.entity.JobPost;
import com.platfrom.JobAndSkillDevelopment.entity.JobStatus;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.repo.JobRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JobServiceTest {

    @Mock
    private JobRepo jobRepo;

    @InjectMocks
    private JobService jobService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createJob_ShouldSetStatusToPending() {
        // Arrange
        User user = new User();
        user.setId(1L);
        JobPost job = new JobPost();
        job.setTitle("Test Job");

        when(jobRepo.save(any(JobPost.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        JobPost result = jobService.createJob(job, user);

        // Assert
        assertEquals(JobStatus.PENDING, result.getStatus());
        assertEquals(user, result.getUser());
        verify(jobRepo, times(1)).save(job);
    }

    @Test
    void createJobAsAdmin_ShouldSetStatusToApproved() {
        // Arrange
        User user = new User();
        JobPost job = new JobPost();

        when(jobRepo.save(any(JobPost.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        JobPost result = jobService.createJobAsAdmin(job, user);

        // Assert
        assertEquals(JobStatus.APPROVED, result.getStatus());
        verify(jobRepo, times(1)).save(job);
    }

    @Test
    void updateStatus_ShouldChangeStatus() {
        // Arrange
        Long jobId = 1L;
        JobPost job = new JobPost();
        job.setStatus(JobStatus.PENDING);

        when(jobRepo.findById(jobId)).thenReturn(Optional.of(job));
        when(jobRepo.save(any(JobPost.class))).thenReturn(job);

        // Act
        JobPost result = jobService.updateStatus(jobId, JobStatus.APPROVED);

        // Assert
        assertEquals(JobStatus.APPROVED, result.getStatus());
        verify(jobRepo, times(1)).save(job);
    }

    @Test
    void updateStatus_ShouldThrowException_WhenJobNotFound() {
        // Arrange
        when(jobRepo.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> jobService.updateStatus(1L, JobStatus.APPROVED));
    }
}
