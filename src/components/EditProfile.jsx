import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL);
  const [skills, setSkills] = useState(user?.skills);
  const [about, setAbout] = useState(user?.about || "");
  const [saveAlert, setSaveAlert] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
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
      setSaveAlert(true);

      const onSaveNavigate = () => {
        setSaveAlert(false);
        navigate("/");
      };
      setTimeout(() => {
        onSaveNavigate();
      }, 3000);
      dispatch(addUser(res?.data));
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <div className="relative">
      <div className="flex justify-center gap-10 items-center">
        <div className="card card-dash bg-base-300 w-2/6 flex items-center my-10">
          <div className="card-body w-full">
            <h2 className="card-title my-0 mx-auto">Edit Profile</h2>
            <div className="card-actions gap-0">
              <div className="flex gap-2">
                <fieldset className="fieldset w-1/2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset w-1/2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="select w-full"
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
                  className="input w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Skills</legend>
                <input
                  type="text"
                  className="input w-full"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea resize-none w-full"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
              <span className="text-red-500 w-full">{error}</span>
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
      {saveAlert && (
        <div
          role="alert"
          className="absolute top-[-20px] left-1/4 alert alert-success w-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your Profile Edited has been successful!</span>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
