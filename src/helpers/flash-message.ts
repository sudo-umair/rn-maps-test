import { showMessage } from 'react-native-flash-message';

export const successFlash = (message: string) => {
  showMessage({
    message,
    type: 'success',
  });
};

export const errorFlash = (message: string) => {
  showMessage({
    message,
    type: 'danger',
  });
};

export const warningFlash = (message: string) => {
  showMessage({
    message,
    type: 'warning',
  });
};

export const infoFlash = (message: string) => {
  showMessage({
    message,
    type: 'info',
  });
};
