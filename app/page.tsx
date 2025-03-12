"use client";

import { useState, useEffect } from "react";
import { AnimatedBell } from "@/components/animated-bell";
import { NotificationButton } from "@/components/notification-button";
import {
  isNotificationSupported,
  isServiceWorkerSupported,
  registerServiceWorker,
  sendNotification,
} from "@/lib/push-service";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function NotificationPage() {
  const [isSupported, setIsSupported] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [serviceWorkerRegistration, setServiceWorkerRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [animateBell, setAnimateBell] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log(animateBell);
  }, [animateBell]);

  // Initialize PWA and check for support
  useEffect(() => {
    const initializePWA = async () => {
      // Check if notifications are supported
      const notificationsSupported = isNotificationSupported();
      setIsSupported(notificationsSupported);

      if (notificationsSupported) {
        // Check if permission is already granted
        const permissionStatus = Notification.permission;
        setIsPermissionGranted(permissionStatus === "granted");

        // Register service worker in background
        if (isServiceWorkerSupported()) {
          const registration = await registerServiceWorker();
          if (registration) {
            setServiceWorkerRegistration(registration);
          }
        }
      }
    };

    initializePWA();
  }, []);

  // Handle notification button click
  const handleSendNotification = async () => {
    // Animate the bell
    setAnimateBell(true);
    setTimeout(() => setAnimateBell(false), 1000); // Reset after 1 second (adjust as needed)
    try {
      // Check if notifications are supported
      if (!isNotificationSupported()) {
        toast({
          title: "Not Supported",
          description: "Notifications are not supported in this browser",
          variant: "destructive",
        });
        return false;
      }

      // Register service worker in background (not required for notifications to work)
      if (isServiceWorkerSupported()) {
        registerServiceWorker().catch(console.error);
      }

      // Send notification
      const success = await sendNotification("New Notification", {
        body: "This is a test notification from the app",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-72x72.png",
      });

      if (success) {
        toast({
          title: "Success!",
          description: "Notification sent successfully",
        });
      } else {
        toast({
          title: "Warning",
          description: "Notification permission denied or error occurred",
          variant: "destructive",
        });
      }

      return success;
    } catch (error) {
      console.error("Notification error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-purple-dark text-white p-6">
      {/* Header */}
      <motion.div
        className="w-full text-center mt-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-medium">Hola!</h1>
      </motion.div>

      {/* Notification Bell with Circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatedBell animate={animateBell} />
      </motion.div>

      {/* Footer Content */}
      <motion.div
        className="w-full mb-16 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold">Lorem Ipsum...</h2>
          <p className="text-gray-400 text-lg">Lorem ipsum dolor sit amet.</p>
        </div>

        {/* Button */}
        <div className="mt-8">
          <NotificationButton
            onClick={handleSendNotification}
            text="Send Notification"
          />
        </div>
      </motion.div>
    </div>
  );
}
