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
    <>
      <p className="text-center mt-4 font-semibold">No connections found!</p>
    </>
  ) : (
    <div className="flex justify-center flex-col items-center">
      {connections.map((connection) => {
        var { _id, firstName, lastName, photoURL, age, gender, about } =
          connection;

        return (
          <ul
            className="list bg-base-300 rounded-box shadow-md w-1/2 mt-2"
            key={_id}
          >
            <li className="list-row">
              <div>
                <img
                  className="size-10 rounded-box object-contain"
                  src={photoURL}
                />
              </div>

              <div>
                <div>{firstName + " " + lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {age && (age || "") + ", "}
                  {gender || ""}
                </div>
              </div>
              <p className="list-col-wrap text-xs">{about}</p>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Connections;
