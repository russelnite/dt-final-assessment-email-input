import { emails } from "../services/emails";

export const getEmails = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(emails);
    }, 1500);
  });
};
