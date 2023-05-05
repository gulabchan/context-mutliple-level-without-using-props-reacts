import React, { createContext, useContext, useState } from "react";

// Create a context for the current user
const UserContext = createContext(null);

// A component that sets the current user in the UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// A component that reads the current user from the UserContext
const UserConsumer = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  return children({ user, setUser });
};

// A component that uses the UserProvider and UserConsumer to set and read the current user
const UserProfile = () => (
  <UserProvider>
    <UserConsumer>
      {({ user, setUser }) => (
        <div>
          <h1>Profile Page</h1>
          {user ? (
            <div>
              <p>Logged in as: {user.username}</p>
              <button onClick={() => setUser(null)}>Log out</button>
            </div>
          ) : (
            <div>
              <p>You are not logged in</p>
              <button onClick={() => setUser({ username: "user123" })}>
                Log in
              </button>
            </div>
          )}
        </div>
      )}
    </UserConsumer>
  </UserProvider>
);

export default UserProfile;
