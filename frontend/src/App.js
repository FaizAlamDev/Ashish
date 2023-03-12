import axios from "axios";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllForms from "./components/AllForms";
import Form from "./components/Form";

const App = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [errors, setError] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (name.length === 0) {
      errors.name = "Name is required!";
    } else if (name.length <= 2) {
      errors.name = "Name must be more that 2 characters!";
    }

    // Age validation
    function get_age(time) {
      const MILLISECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365;
      const date_array = time.split("-");
      const age =
        (new Date() - new Date(date_array[0], date_array[1], date_array[2])) /
        MILLISECONDS_IN_A_YEAR;

      return age;
    }

    if (date.length === 0) {
      errors.date = "Date is required!";
    } else if (get_age(date) < 18) {
      errors.date = "Age must be greater than 18!";
    }

    // Email validation
    if (email.length === 0) {
      errors.email = "Email is required!";
    } else if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
      )
    ) {
      errors.email = "This is not a valid email!";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsObj = validateForm();
    setError(errorsObj);
    if (Object.keys(errorsObj).length !== 0) {
      alert("can't submit form");
    } else {
      const request = axios.post("/send_email", {
        name,
        date,
        email,
        contact,
      });
      request.then((res) => res.data);
      navigate("/displayForms");
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Form
            handleSubmit={handleSubmit}
            setName={setName}
            setDate={setDate}
            setEmail={setEmail}
            setContact={setContact}
            errors={errors}
          />
        }
      />
      <Route path="/displayForms" element={<AllForms />} />
    </Routes>
  );
};

export default App;
