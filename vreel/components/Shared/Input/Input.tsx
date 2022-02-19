interface InputProps {
    value: string;
    setValue: (s: string) => void;
    placeHolder: string;
    type?: string;
}

export const PrimaryInput = ({ value, setValue, placeHolder, type }: InputProps): JSX.Element => {
    return (
        <div>
            <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder={placeHolder} />
        </div>
    )
}


// Secure Text Entry (Passwords)
export const SecretInput = ({ value, setValue, placeHolder }: InputProps): JSX.Element => {
    return (
        <div>
            <input
                type="password"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder={placeHolder}
            />
        </div>
    )
}