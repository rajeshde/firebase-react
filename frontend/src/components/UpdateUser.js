import { useState } from "react";

import { showToastMessage, firebase } from "../helper";
import UpdateUserForm from "./UpdateUserForm";

const UpdateUser = ({ uid, email, onUserUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickUpdate = () => setIsOpen(true);
  const handleOnClose = () => setIsOpen(false);
  const handleOnSave = (obj) => {
    // firebase.update(id, obj, (err) => {
    //   console.log("error while update", err);
    //   err && showToastMessage(err.message || "");
    //   handleOnClose();
    // });

    firebase
      .update(uid, obj)
      .then(() => setTimeout(onUserUpdate, 1000))
      .catch((err) => showToastMessage(err.message || ""))
      .finally(() => handleOnClose());
  };

  return (
    <>
      <button
        onClick={onClickUpdate}
        className="btn btn-secondary"
        type="button"
      >
        Update
      </button>
      <UpdateUserForm
        isOpen={isOpen}
        uid={uid}
        email={email}
        onSave={handleOnSave}
        onClose={handleOnClose}
      />
    </>
  );
};

export default UpdateUser;
