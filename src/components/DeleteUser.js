import { showToastMessage, firebase } from "../helper";

const DeleteUser = ({ id }) => {
  const onClickDelete = () => {
    firebase.delete(id, (err) => {
      err && showToastMessage(err.message || "");
    });
  };

  return (
    <button onClick={onClickDelete} className="btn btn-danger" type="button">
      Delete
    </button>
  );
};

export default DeleteUser;
