import { useParams } from "react-router-dom";
import { serviceGetMeetingRoomtListDetails } from "../../../services/MeetingRoom.service";
import { useState, useEffect } from "react";

const useMeetingDetailHook = ({ location }) => {
  const event = location?.state?.eventId;

  const params = useParams();
  const [dataValue, setDataValue] = useState();

  useEffect(() => {
    if (params?.id) {
      serviceGetMeetingRoomtListDetails({
        id: params?.id,
        event_id: event,
      })?.then((res) => {
        setDataValue(res?.data?.details);
      });
    }
  }, [params?.id]);

  return {
    dataValue,
  };
};

export default useMeetingDetailHook;
