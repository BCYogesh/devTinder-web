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
  console.log(requestUserObj);
  return !requestUserObj || requestUserObj.length == 0 ? (
    <p className="font-semibold mt-4 text-center">No Requests found!</p>
  ) : (
    <div className="flex justify-center flex-col items-center">
      {requestUserObj.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          request.fromUserId;
        console.log(request.fromUserId);

        return (
          <ul
            className="list bg-base-300 rounded-box shadow-md w-1/2 mt-2"
            key={_id}
          >
            <li className="list-row">
              <div>
                <img className="size-10 rounded-box" src={photoURL} />
              </div>
              <div>
                <div>{firstName + " " + lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {age && (age || "") + ", "}
                  {gender || ""}
                </div>
              </div>
              <p className="list-col-wrap text-xs">{about}</p>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => reviewRequest(request?._id, "rejected")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e5383b"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => reviewRequest(request?._id, "accepted")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#04e762"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" stroke="#04e762" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Requests;
