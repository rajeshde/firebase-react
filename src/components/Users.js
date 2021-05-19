import { useState, useEffect } from "react";

import { firebase } from "../helper";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import DownloadUsers from "./DownloadUsers";

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
      return <span className="margin-top-30">Loading...</span>;
    }

    if (users.length === 0) {
      return <span className="margin-top-30">No records found</span>;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{email}</td>
              <td>
                <UpdateUser id={id} name={name} email={email} />
              </td>
              <td>
                <DeleteUser id={id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="margin-bottom-30">
        <CreateUser />
        {users && users.length ? <DownloadUsers data={users} /> : null}
      </div>
      <br />
      {renderUsers()}
    </div>
  );
};

export default Users;
