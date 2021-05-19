import { useState } from "react";

import { showToastMessage, firebase } from "../helper";
import CreateUserForm from "./CreateUserForm";

const CreateUser = ({ onUserUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onCreate = () => setIsOpen(true);
  const handleOnClose = () => setIsOpen(false);
  const handleOnSave = (obj) => {
    // firebase.create(obj, (err) => {
    //   if (!err) {
    //     handleOnClose();
    //     return;
    //   }
    //   showToastMessage(err.message || "");
    // });

    firebase
      .create(obj)
      .then(() => setTimeout(onUserUpdate, 1000))
      .catch((err) => {
        showToastMessage(err.message || "");
      })
      .finally(() => handleOnClose());
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
      <CreateUserForm
        isOpen={isOpen}
        onSave={handleOnSave}
        onClose={handleOnClose}
      />
    </>
  );
};

export default CreateUser;
