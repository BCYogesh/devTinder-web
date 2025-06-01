import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.feed);

  const getFeeds = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.users));
    } catch (err) {
      console.error(err?.message);
    }
  };

  useEffect(() => {
    if (!users) {
      getFeeds();
    }
  }, []);

  if (!users) return;

  if (users.length <= 0)
    return <h1 className="text-center m-4 font-medium">No new users found!</h1>;
  return <div>{users && <UserCard users={users[0]} />}</div>;
};

export default Feed;
