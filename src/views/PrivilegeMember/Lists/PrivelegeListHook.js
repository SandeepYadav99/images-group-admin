import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceGetMembershipDetails } from "../../../services/PrivilegeMember.services";

const usePrivilegeListHook = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState({});
  const callAPi = useCallback(() => {
    serviceGetMembershipDetails({ event_id: id }).then((res) => {
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
      content: data?.content ? data?.content : "",
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
    callAPi,
  };
};

export default usePrivilegeListHook;
