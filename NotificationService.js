import { Notifications } from 'react-native-notifications';

class NotificationService {
  constructor() {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('📩 Notification received in foreground:', notification);
        completion({ alert: true, sound: true, badge: false });
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log('📬 Notification opened:', notification);
        completion();
      },
    );
  }

  scheduleReminder(title, message, eventDateISO, eventTime, minutesBefore = 10) {
    const [hh = '0', mm = '0'] = (eventTime || '').split(':');
    const eventDate = new Date(eventDateISO);
    eventDate.setHours(Number(hh), Number(mm), 0, 0);

    const triggerTime = new Date(eventDate.getTime() - minutesBefore * 60 * 1000);
    const now = new Date();

    const delay = triggerTime.getTime() - now.getTime();
    if (delay <= 0) {
      console.log('⚠️ Too late to schedule notification (past time).');
      return;
    }

    console.log(`📅 Notification will trigger in ${Math.round(delay / 60000)} mins`);

    setTimeout(() => {
      Notifications.postLocalNotification({
        title: title,
        body: message,
        sound: 'default',
        silent: false,
      });
      console.log(`🔔 Notification fired for: ${title}`);
    }, delay);
  }
}

export default new NotificationService();
