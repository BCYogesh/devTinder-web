import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ users }) => {
  const dispatch = useDispatch();

  const sendConnectionRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  if (!users) return;

  const { _id, firstName, lastName, age, gender, skills, about, photoURL } =
    users;
  return users.length <= 0 ? (
    <p className="text-center m-4">New Users not found</p>
  ) : (
    <div className="flex justify-center m-8">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoURL} alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>
            <b>Age</b> : {age || "NA"}
          </p>
          <p>
            <b>Gender</b> : {gender || "NA"}
          </p>
          <p>
            <b>Skills</b> : {skills.join(", ") || "-"}
          </p>
          <p>
            <b>About</b> : {about}
          </p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-error text-black"
              onClick={() => sendConnectionRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success text-black"
              onClick={() => sendConnectionRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
