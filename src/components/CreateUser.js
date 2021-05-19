import { useState } from "react";

import { showToastMessage, firebase } from "../helper";
import UserForm from "./UserForm";

const CreateUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onCreate = () => setIsOpen(true);
  const handleOnClose = () => setIsOpen(false);
  const handleOnSave = (obj) => {
    firebase.create(obj, (err) => {
      if (!err) {
        handleOnClose();
        return;
      }
      showToastMessage(err.message || "");
    });
  };

  return (
    <>
      <button
        onClick={onCreate}
        className="btn btn-primary margin-right-10"
        type="button"
      >
        Add user
      </button>
      <UserForm isOpen={isOpen} onSave={handleOnSave} onClose={handleOnClose} />
    </>
  );
};

export default CreateUser;
