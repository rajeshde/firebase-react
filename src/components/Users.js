import { useState, useEffect } from "react";

import { firebase } from "../helper";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

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
            <UpdateUser id={key} name={name} email={email} />
            <DeleteUser id={key} />
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
