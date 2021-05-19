import { useState } from "react";

import Modal from "./Modal";
import { showToastMessage, firebase } from "../helper";

const CreateUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const onCreate = () => setIsOpen(true);

  const onClickCancel = () => {
    setName("");
    setEmail("");
    setIsOpen(false);
  };

  const onClickSave = () => {
    if (name && email) {
      firebase.create({ name, email }, (err) => {
        if (!err) {
          onClickCancel();
          return;
        }
        showToastMessage(err.message || "");
      });
    } else {
      showToastMessage("Name and Email is mandatory");
    }
  };

  return (
    <>
      <button type="button" onClick={onCreate}>
        Create
      </button>
      <Modal isOpen={isOpen} onRequestClose={onClickCancel}>
        <form>
          <div className="form-group margin-bottom-30">
            <label htmlFor="name" className="margin-right-10">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
          <div className="form-group margin-bottom-30">
            <label htmlFor="email" className="margin-right-10">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </div>
          <div class="d-flex flex-row-reverse">
            <button
              onClick={onClickSave}
              className="p-2 btn btn-primary"
              type="button"
            >
              Save
            </button>
            <button
              onClick={onClickCancel}
              className="p-2 btn btn-secondary margin-right-10"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateUser;
