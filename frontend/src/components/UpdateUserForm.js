import { useState, useEffect } from "react";

import Modal from "./Modal";
import { showToastMessage } from "../helper";

const validate = ({ email }) => {
  const isValidEmailAddress = (text) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text);

  if (!isValidEmailAddress(email)) {
    showToastMessage("Wrong Email format");
    return false;
  }

  return true;
};

const UserForm = (props) => {
  const [email, setEmail] = useState(props.email || "");

  useEffect(() => {
    setEmail(props.email);
  }, [props.email]);

  const onClickCancel = () => {
    setEmail(props.email);
    props.onClose();
  };
  const onClickSave = () => {
    if (validate({ email })) {
      setEmail(props.email);
      props.onSave({ email });
    }
  };

  return (
    <Modal isOpen={props.isOpen} onRequestClose={onClickCancel}>
      <form>
        <div className="form-group margin-bottom-30">
          <label htmlFor="name" className="margin-right-10">
            {`UID: ${props.uid}`}
          </label>
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
