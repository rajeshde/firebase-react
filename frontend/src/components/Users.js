import { useState, useEffect, useCallback } from "react";

import { firebase, showToastMessage } from "../helper";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import DownloadUsers from "./DownloadUsers";

const Users = () => {
  const [users, setUsers] = useState(undefined);

  const onUserUpdate = useCallback(() => {
    firebase
      .onUpdate()
      .then((data) => setUsers(data.data))
      .catch((err) => {
        showToastMessage(err.message);
      });
  }, []);

  useEffect(() => {
    onUserUpdate();
    // return () => {
    //   firebase.detachListener();
    // };
  }, [onUserUpdate]);

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
            <th scope="col">UID</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ uid, email }) => (
            <tr key={uid}>
              <td>{uid}</td>
              <td>{email}</td>
              <td>
                <UpdateUser
                  uid={uid}
                  email={email}
                  onUserUpdate={onUserUpdate}
                />
              </td>
              <td>
                <DeleteUser uid={uid} onUserUpdate={onUserUpdate} />
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
        <CreateUser onUserUpdate={onUserUpdate} />
        {users && users.length ? <DownloadUsers data={users} /> : null}
      </div>
      <br />
      {renderUsers()}
    </div>
  );
};

export default Users;
