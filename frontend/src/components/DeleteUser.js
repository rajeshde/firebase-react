import { showToastMessage, firebase } from "../helper";

const DeleteUser = ({ uid, onUserUpdate }) => {
  const onClickDelete = () => {
    // firebase.delete(id, (err) => {
    //   err && showToastMessage(err.message || "");
    // });
    firebase
      .delete(uid)
      .then(() => setTimeout(onUserUpdate, 1000))
      .catch((err) => showToastMessage(err.message || ""));
  };

  return (
    <button onClick={onClickDelete} className="btn btn-danger" type="button">
      Delete
    </button>
  );
};

export default DeleteUser;
