import React from "react"

interface ButtonProps {
    title: string;
    action: () => void
}

export const PrimaryButton = ({ title, action }: ButtonProps): JSX.Element => {
    return (
        <div>
            <button
                onClick={action}
            >{title}</button>
        </div>
    )
}