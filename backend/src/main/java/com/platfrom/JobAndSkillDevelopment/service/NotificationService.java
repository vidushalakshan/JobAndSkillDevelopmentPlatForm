package com.platfrom.JobAndSkillDevelopment.service;

import com.platfrom.JobAndSkillDevelopment.entity.Notification;
import com.platfrom.JobAndSkillDevelopment.entity.NotificationType;
import com.platfrom.JobAndSkillDevelopment.entity.User;
import com.platfrom.JobAndSkillDevelopment.repo.NotificationRepo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepo notificationRepo;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(NotificationRepo notificationRepo, SimpMessagingTemplate messagingTemplate) {
        this.notificationRepo = notificationRepo;
        this.messagingTemplate = messagingTemplate;
    }

    public void sendNotification(User user, String title, String message, NotificationType type) {
        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type)
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();
        
        notificationRepo.save(notification);
        
        messagingTemplate.convertAndSendToUser(
            user.getEmail(), 
            "/queue/notifications", 
            notification
        );
    }

    public List<Notification> getNotificationsForUser(User user) {
        return notificationRepo.findByUserOrderByCreatedAtDesc(user);
    }

    public void markAsRead(Long notificationId) {
        notificationRepo.findById(notificationId).ifPresent(n -> {
            n.setRead(true);
            notificationRepo.save(n);
        });
    }

    public long getUnreadCount(User user) {
        return notificationRepo.countByUserAndReadFalse(user);
    }
}
