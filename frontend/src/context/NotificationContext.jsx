import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useUser } from './context';
import instance from '../service/axios';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useUser();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [stompClient, setStompClient] = useState(null);

    const fetchNotifications = useCallback(async () => {
        if (!user) return;
        try {
            const res = await instance.get('/notifications');
            setNotifications(res.data);
            const countRes = await instance.get('/notifications/unread-count');
            setUnreadCount(countRes.data);
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchNotifications();

            const socket = new SockJS('http://localhost:8080/ws-nexus');
            const client = Stomp.over(socket);
            client.debug = null; // Disable console logging for cleaner UI

            client.connect({}, () => {
                client.subscribe(`/user/${user.email}/queue/notifications`, (msg) => {
                    const newNotif = JSON.parse(msg.body);
                    setNotifications(prev => [newNotif, ...prev]);
                    setUnreadCount(prev => prev + 1);
                    toast.info(`🔔 ${newNotif.title}: ${newNotif.message}`);
                });
            });

            setStompClient(client);

            return () => {
                if (client) client.disconnect();
            };
        } else {
            setNotifications([]);
            setUnreadCount(0);
        }
    }, [user, fetchNotifications]);

    const markAsRead = async (id) => {
        try {
            await instance.put(`/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error("Failed to mark as read:", err);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, fetchNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
