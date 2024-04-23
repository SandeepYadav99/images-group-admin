import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { serviceGetAwardDetails } from "../../../services/Award.servcice";
import { useParams } from "react-router-dom";

const useAdminUserList = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState({});
  const callAPi = useCallback(() => {
    serviceGetAwardDetails({ event_id: id }).then((res) => {
      if (!res.error) {
        setData(res.data);
      }
    });
  }, [id]);

  useEffect(() => {
    callAPi();
  }, []);

  const handleClose = useCallback(() => {
    setSidePanel(false);
    callAPi();
  }, [callAPi, isSidePanel]);

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditData(data?.id);
    },
    [setSidePanel, setEditData]
  );
  const aboutData = useMemo(() => {
    return {
      id: data?.id ? data?.id : "",
      contant: data?.contant ? data?.contant : "",
      default_image: data?.image ? data?.image : "",
    };
  }, [data, id]);
  
  return {
    editData,
    isSidePanel,
    handleToggleSidePannel,
    data,
    aboutData,
    handleClose,
  };
};

export default useAdminUserList;
