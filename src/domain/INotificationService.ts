export interface INotificationService {
  sendNotification(to: string, message: string): Promise<void>;
}