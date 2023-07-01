import { CheckIcon } from '@/components/icons';
import { notifications } from '@mantine/notifications';

type NotificationType = 'success' | 'error';

const showNotifications = (
  title: string,
  message: string,
  type: NotificationType
) => {
  switch (type) {
    case 'success':
      notifications.show({
        title,
        message,
        color: 'green',
        autoClose: 5000
      });
      break;
    case 'error':
      notifications.show({
        title,
        message,
        color: 'red',
        autoClose: 5000
      });
      break;
    default:
      throw new Error('Failed to show notifications');
  }
};

export const showSuccessNotifications = (title: string, message: string) =>
  showNotifications(title, message, 'success');

export const showErrorNotifications = (title: string, message: string) =>
  showNotifications(title, message, 'error');
