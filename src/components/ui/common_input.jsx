const CommonInput = ({
  value,
  onChange,
  label,
  placeholder = "Enter text",
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-y-[2px]">
      <label htmlFor={label} className="uppercase text-label-lg">
        {label}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={` bg-secondary border-[3px] border-secondary-border rounded-[8px] ps-2 h-[45px] outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default CommonInput;
