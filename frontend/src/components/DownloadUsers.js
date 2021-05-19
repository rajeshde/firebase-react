import CsvDownload from "react-json-to-csv";

const DownloadUsers = (props) => {
  const { data } = props;

  return (
    <CsvDownload
      data={data.map(({ uid, email }) => ({ uid, email }))}
      filename="users.csv"
      className="btn btn-success"
    >
      Download users
    </CsvDownload>
  );
};

export default DownloadUsers;
