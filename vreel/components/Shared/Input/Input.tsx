interface InputProps {
  value?: string;
  setValue?: (s: string) => void;
  placeHolder?: string;
  type?: string;
  style?: object;
  label?: string;
  // pattern: string;
}

export const PrimaryInput = ({
  value,
  setValue,
  placeHolder,
  type,
}: // pattern,
InputProps): JSX.Element => {
  return (
    <div className="vreel-input vreel-input__wrapper">
      <input
        // pattern={pattern}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
};
export const EditInput = ({
  value,
  setValue,
  placeHolder,
  type,
  style,
  label,
}: // pattern,
InputProps): JSX.Element => {
  return (
    <div className="vreel-input vreel-input__wrapper edit">
      <label htmlFor="edit">{label}:</label>
      <input
        style={style}
        name="edit"
        id="edit"
        // pattern={pattern}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
};
export const CheckboxInput = ({
  value,
  setValue,
  placeHolder,
  type,
  style,
  label,
}: // pattern,
InputProps): JSX.Element => {
  return (
    <div className="vreel-input vreel-input__wrapper edit">
      <label className="checkbox-label" htmlFor="edit-checkbox">
        {label}:
      </label>
      <input
        style={style}
        name="edit-checkbox"
        id="edit-checkbox"
        // pattern={pattern}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

// Secure Text Entry (Passwords)
export const SecretInput = ({
  value,
  setValue,
  placeHolder,
}: InputProps): JSX.Element => {
  return (
    <div>
      <input
        style={{ display: "none" }}
        type="password"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
};
