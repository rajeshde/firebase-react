import CsvDownload from "react-json-to-csv";

const DownloadUsers = (props) => {
  const { data } = props;

  return (
    <CsvDownload
      data={data.map(({ name, email }) => ({ name, email }))}
      filename={`${process.env.REACT_APP_USER_TABLE_NAME}.csv`}
      className="btn btn-success"
    >
      Download users
    </CsvDownload>
  );
};

export default DownloadUsers;
