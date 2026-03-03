const FormGroup = ({ label, placeholder, onChange, value, type }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
export default FormGroup;
