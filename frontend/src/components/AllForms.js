import { useEffect, useState } from "react";
import axios from "axios";

const AllForms = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = axios.get("/allForms");
    request.then((res) => {
      setDetails(res.data);
    });
  }, []);

  useEffect(() => {
    if (details.length > 0) {
      setLoading(false);
    }
  }, [details]);

  const Loading = () => {
    return (
      <div
        style={{
          height: "400px",
          width: "800px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Of Birth</th>
                  <th>Email</th>
                  <th>Contact No.</th>
                </tr>
              </thead>
              <tbody>
                {details.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.name}</td>
                      <td>{val.date}</td>
                      <td>{val.email}</td>
                      <td>{val.contact}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default AllForms;
