import { sendPushNotification } from "../dao/notification";

export const send = (menssage) => {
    return sendPushNotification(menssage);
};