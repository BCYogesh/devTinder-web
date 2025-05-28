import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMyRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestUserObj = useSelector((store) => store.request);

  const getRequsts = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addMyRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (id, status) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequsts();
  }, []);

  if (!requestUserObj) return;
  return !requestUserObj || requestUserObj.length == 0 ? (
    <h3 className="font-semibold text-2xl mt-4 text-center">
      No Requests found!
    </h3>
  ) : (
    <div className="flex justify-center flex-col items-center">
      {requestUserObj.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          request.fromUserId;

        return (
          <div
            className="w-4/5 bg-base-300 h-32 m-4 p-2 rounded-lg flex items-center"
            key={_id}
          >
            <div className="h-full image">
              <img src={photoURL} alt="image" className="h-full rounded-lg" />
            </div>
            <div className="ml-4 font-semibold leading-loose">
              <h4 className="text-2xl">{firstName + " " + lastName}</h4>
              <p>{gender || "" + ", " + age || ""}</p>
              <p>{about}</p>
            </div>
            <div className="ml-auto">
              <button
                className="btn btn-soft btn-error mr-2"
                onClick={() => reviewRequest(request?._id, "rejected")}
              >
                Reject
              </button>
              <button
                className="btn btn-soft btn-success"
                onClick={() => reviewRequest(request?._id, "accepted")}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
