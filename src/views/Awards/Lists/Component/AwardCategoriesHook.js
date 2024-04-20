import { useCallback, useState } from "react";

const useAwardCategoriesHook = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setSidePanel]
  );

  return {
    isCalling,
    handleToggleSidePannel,
    isSidePanel,
  };
};

export default useAwardCategoriesHook;
