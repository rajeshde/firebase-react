import { useState, useEffect } from "react";

import { firebase } from "../helper";
import CreateUser from "./CreateUser";

const Users = () => {
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    firebase.onUpdate(setUsers);

    return () => {
      firebase.detachListener();
    };
  }, []);

  const renderUsers = () => {
    if (users === undefined) {
      return <span>Loading...</span>;
    }

    if (users.length === 0) {
      return <span>No records found</span>;
    }

    return (
      <ul>
        {users.map(({ key, name, email }) => (
          <li key={key}>
            {name}, {email}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <CreateUser />
      <br />
      {renderUsers()}
    </div>
  );
};

export default Users;
