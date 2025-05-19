const UserCard = ({ users }) => {
  const { firstName, lastName, age, gender, skills, about, photoURL } = users;
  return (
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
            <button className="btn btn-error text-black">Ignore</button>
            <button className="btn btn-success text-black">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
