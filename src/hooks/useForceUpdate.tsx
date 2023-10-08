import { useCallback, useState } from 'react';

const useForceUpdate = () => {
  const [value, setValue] = useState<number>(0);

  const forceUpdate = useCallback(() => {
    setValue((v) => v + 1);
  }, []);

  return { forceUpdate, trigger: value };
};

export default useForceUpdate;
