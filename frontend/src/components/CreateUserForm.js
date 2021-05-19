import { useState } from "react";

import Modal from "./Modal";
import { showToastMessage } from "../helper";

const validate = ({ password, email }) => {
  const isValidEmailAddress = (text) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text);

  if (!password || !email) {
    showToastMessage("Email and Password is mandatory");
    return false;
  }
  if (!isValidEmailAddress(email)) {
    showToastMessage("Wrong Email format");
    return false;
  }
  if (password.length < 6) {
    showToastMessage("Password must be of at least 6 characters");
    return false;
  }

  return true;
};

const UserForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickCancel = () => {
    setEmail("");
    setPassword("");
    props.onClose();
  };
  const onClickSave = () => {
    if (validate({ password, email })) {
      setEmail("");
      setPassword("");
      props.onSave({ password, email });
    }
  };

  return (
    <Modal isOpen={props.isOpen} onRequestClose={onClickCancel}>
      <form>
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
        <div className="form-group margin-bottom-30">
          <label htmlFor="password" className="margin-right-10">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="d-flex flex-row-reverse">
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
  );
};

export default UserForm;
