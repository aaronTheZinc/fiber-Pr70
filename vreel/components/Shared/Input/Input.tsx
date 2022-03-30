interface InputProps {
  value: string;
  setValue: (s: string) => void;
  placeHolder: string;
  type?: string;
  // pattern: string;
}

export const PrimaryInput = ({
  value,
  setValue,
  placeHolder,
  type
  // pattern,
}: InputProps): JSX.Element => {
  return (
    <div className="vreel-input vreel-input__wrapper">
      <input
        // pattern={pattern}
        type={type}
        onChange={(e) => setValue(e.target.value.toLowerCase())}
        value={value}
        placeholder={placeHolder}
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
