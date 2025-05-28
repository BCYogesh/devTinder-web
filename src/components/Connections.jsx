import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;
  return !connections || connections.length == 0 ? (
    "No connections found!"
  ) : (
    <div className="flex justify-center flex-col items-center">
      {connections.map((request) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
