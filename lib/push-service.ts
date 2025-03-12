// Replace the entire file with this simplified version that focuses on local notifications

// Check if the browser supports notifications
export const isNotificationSupported = () => {
  return "Notification" in window
}

// Check if service worker is supported
export const isServiceWorkerSupported = () => {
  return "serviceWorker" in navigator
}

// Register the service worker
export const registerServiceWorker = async () => {
  if (!isServiceWorkerSupported()) {
    console.log("Service Worker not supported")
    return null
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js")
    console.log("Service Worker registered with scope:", registration.scope)
    return registration
  } catch (error) {
    console.error("Service Worker registration failed:", error)
    return null
  }
}

// Request permission for notifications
export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) {
    console.log("Notifications not supported")
    return false
  }

  try {
    const permission = await Notification.requestPermission()
    console.log("Notification permission:", permission)
    return permission === "granted"
  } catch (error) {
    console.error("Error requesting notification permission:", error)
    return false
  }
}

// Send a notification directly (without push subscription)
export const sendNotification = async (title: string, options: NotificationOptions = {}) => {
  if (!isNotificationSupported()) {
    console.log("Notifications not supported")
    return false
  }

  try {
    // Check permission
    if (Notification.permission !== "granted") {
      const granted = await requestNotificationPermission()
      if (!granted) {
        console.log("Notification permission denied")
        return false
      }
    }

    // Try to use service worker for notification if available
    if (isServiceWorkerSupported() && navigator.serviceWorker.controller) {
      const registration = await navigator.serviceWorker.ready
      await registration.showNotification(title, {
        body: options.body || "This is a notification from the app",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-72x72.png",
        vibrate: [100, 50, 100],
        ...options,
      })
      console.log("Notification sent via service worker")
      return true
    }

    // Fallback to regular notification
    const notification = new Notification(title, {
      body: options.body || "This is a notification from the app",
      icon: "/icons/icon-192x192.png",
      ...options,
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    console.log("Notification sent via regular API")
    return true
  } catch (error) {
    console.error("Error sending notification:", error)
    return false
  }
}

