const Alert = ({ type, message }) => {
  return (
    <div
      style={{
        color: type === "error" ? "#721c24" : "#155724",
        backgroundColor: type === "error" ? "#f8d7da" : "#d4edda",
        borderColor: type === "error" ? "#f5c6cb" : "#c3e6cb",
        padding: ".75rem 1.25rem",
        width: "100%",
        marginBottom: "1rem",
        borderRadius: ".25rem",
        boxSizing: " border-box",
        textAlign: "left",
      }}
    >
      {message}
    </div>
  );
};

export default Alert;
