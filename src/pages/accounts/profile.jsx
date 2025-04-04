const Profile = () => {
    const user = { name: "John Doe", email: "johndoe@example.com" };
  
    return (
      <div>
        <h2>Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  };
  
  export default Profile;
  