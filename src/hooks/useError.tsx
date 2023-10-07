import { useCallback, useState } from 'react';

const useError = (initError: string = '') => {
  const [errorMsg, setErrorMsg] = useState<string>(initError);

  const setError = useCallback((message: string) => {
    setErrorMsg(message);
  }, []);

  const clearError = useCallback(() => {
    setErrorMsg('');
  }, []);

  return {
    error: errorMsg,
    errorVisible: errorMsg !== '',
    setError,
    clearError,
  };
};

export default useError;
