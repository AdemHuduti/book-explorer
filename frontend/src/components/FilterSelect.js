const FilterSelect = ({ label, name, id, value, options, onChange }) => (
  <div className="select-container">
    <label htmlFor={id}>{label}</label>
    <select
      name={name}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All {name}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
