import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL);
  const [skills, setSkills] = useState(user?.skills);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    const updateUserInfo = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        photoURL: photoUrl,
        skills: skills,
        about: about,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(addUser(updateUserInfo?.data));
  };
  return (
    <div className="flex justify-center gap-10 items-center">
      <div className="card card-dash bg-base-300 w-96 flex items-center my-10">
        <div className="card-body w-full">
          <h2 className="card-title my-0 mx-auto">Edit Profile</h2>
          <div className="card-actions gap-0">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Gender</legend>
              <select
                className="select"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option defaultValue={true} disabled={true}>
                  Select
                </option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Other"}>Other</option>
              </select>
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                className="input"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea resize-none"
                placeholder="Bio"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </fieldset>
            <p className="text-red-500">{error}</p>
            <button
              className="btn btn-primary mx-auto mt-4"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <div className="card bg-base-300 w-96 shadow-sm my-10">
        <figure>
          <img src={photoUrl} alt="image" />
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
            <b>Skills</b> : {skills || "-"}
          </p>

          <p>
            <b>About</b> : {about}
          </p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-error text-black">Ignore</button>
            <button className="btn btn-success text-black">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
