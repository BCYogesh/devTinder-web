import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMyRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestUserObj = useSelector((store) => store.request);
  console.log(requestUserObj);

  const getRequsts = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    const getFromIds = res?.data?.data?.map((user) => user?.fromUserId);
    dispatch(addMyRequests(getFromIds));
  };

  useEffect(() => {
    getRequsts();
  }, []);

  return (
    requestUserObj &&
    requestUserObj.map((reqUser) => (
      <div className="flex justify-center">
        <div className="w-4/5 bg-base-300 h-32 m-4 p-2 rounded-lg flex items-center">
          <div className="h-full image">
            <img
              src={reqUser.photoURL}
              alt="image"
              className="h-full rounded-lg"
            />
          </div>
          <div className="ml-4 font-semibold leading-loose">
            <h4 className="text-2xl">
              {reqUser?.firstName + " " + reqUser?.lastName}
            </h4>
            <p>
              {reqUser?.gender}, {reqUser?.age}
            </p>
            <p>{reqUser?.about}</p>
          </div>
          <div class="ml-auto">
            <button className="btn btn-soft btn-success mr-2">Accept</button>
            <button className="btn btn-soft btn-error">Reject</button>
          </div>
        </div>
      </div>
    ))
  );
};

export default Requests;
