import { useCallback, useState } from "react";
import { serviceDeleteAwardImages } from "../../../../services/Award.servcice";

const usePreviousAwardeesHook = ({ callAPi }) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const toggleAcceptDelete = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
      if (obj) {
        setSelectedData(obj);
      } else {
        setSelectedData(null);
      }
    },
    [isAcceptPopUp, selectedData]
  );

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setSelectedData(null);
    },
    [setSidePanel, selectedData]
  );
  const handleCallDetail = useCallback(() => {
    setSidePanel((e) => !e);
    setSelectedData(null);
    callAPi();
  }, [callAPi, isSidePanel, selectedData]);

  const handleDetail = useCallback(
    (data) => {
      setSidePanel(true);
      setSelectedData(data);
    },
    [selectedData, setSidePanel]
  );

  const handleDelete = useCallback(() => {
    if (selectedData) {
      serviceDeleteAwardImages({ id: selectedData }).then((res) => {
        if (!res.error) {
          setIsAcceptPopUp(false);
          callAPi();
        }
      });
    }
  }, [selectedData, isAcceptPopUp, callAPi]);

  return {
    isCalling,
    handleToggleSidePannel,
    isSidePanel,
    isAcceptPopUp,
    toggleAcceptDelete,
    handleDelete,
    handleDetail,
    selectedData,
    handleCallDetail,
  };
};

export default usePreviousAwardeesHook;
