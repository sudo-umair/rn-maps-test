import { useCallback, useState } from 'react';

const useLoading = (
  initLoading: boolean = false,
  initLoadingText: string = 'Loading'
) => {
  const [loading, setLoading] = useState<boolean>(initLoading);
  const [loadingText, setLoadingText] = useState<string>(initLoadingText);

  const startLoading = useCallback((text: string = 'Loading') => {
    setLoading(true);
    setLoadingText(text);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
    setLoadingText('');
  }, []);

  const toggleLoading = useCallback(() => {
    setLoading((l) => !l);
  }, [loading]);

  const updateLoadingText = useCallback((text: string) => {
    setLoadingText(text);
  }, []);

  return {
    loading,
    loadingText,
    startLoading,
    stopLoading,
    toggleLoading,
    updateLoadingText,
  };
};

export default useLoading;
