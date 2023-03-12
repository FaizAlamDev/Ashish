import Alert from "./Alert";

const Form = ({
  handleSubmit,
  setName,
  setDate,
  setEmail,
  setContact,
  errors,
}) => {
  return (
    <div className="background">
      <div className="container">
        <div className="screen">
          <div className="screen-body">
            <div className="screen-body-item left">
              <div className="app-title">
                <span>CONTACT</span>
                <span>US</span>
              </div>
              <div className="app-contact">CONTACT INFO : +91 96961 20407</div>
            </div>
            <div className="screen-body-item">
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                {errors?.name && <Alert type="error" message={errors.name} />}

                <input type="date" onChange={(e) => setDate(e.target.value)} />
                {errors?.date && <Alert type="error" message={errors.date} />}

                <input
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors?.email && <Alert type="error" message={errors.email} />}

                <input
                  name="contact_no"
                  placeholder="Contact Number"
                  onChange={(e) => setContact(e.target.value)}
                />

                <div className="btns">
                  <button type="submit" className="btn">
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
