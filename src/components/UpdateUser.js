import { useState } from "react";

import { showToastMessage, firebase } from "../helper";
import UserForm from "./UserForm";

const UpdateUser = ({ id, name, email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickUpdate = () => setIsOpen(true);
  const handleOnClose = () => setIsOpen(false);
  const handleOnSave = (obj) => {
    firebase.update(id, obj, (err) => {
      console.log("error while update", err);
      err && showToastMessage(err.message || "");
      handleOnClose();
    });
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
      <UserForm
        isOpen={isOpen}
        name={name}
        email={email}
        onSave={handleOnSave}
        onClose={handleOnClose}
      />
    </>
  );
};

export default UpdateUser;
