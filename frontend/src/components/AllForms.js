import { useEffect, useState } from "react";
import axios from "axios";

const AllForms = () => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const request = axios.get("/allForms");
    request.then((res) => {
      setDetails(res.data);
    });
  }, []);

  return (
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
  );
};

export default AllForms;
