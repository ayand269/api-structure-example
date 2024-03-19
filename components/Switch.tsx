//import liraries
import React, { Component, useEffect, useState } from 'react';

type Props = {
    isChecked?: boolean;
    onChange?: () => void;
    color?: string;
    disabled?: boolean;
}

const Switch: React.FC<Props> = ({isChecked = false, onChange = () => {}, color='#2196F3', disabled = false}) => {
    const [checked, setChecked] = useState<boolean>(false)

    useEffect(() => {
        setChecked(isChecked);
    },[isChecked])

    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={checked}
                onClick={() => {
                    setChecked(!checked)
                    onChange()
                }}
                disabled = {disabled}
                onChange={() => {}}
            />
            <span
                className="slider round"
                style={{
                    backgroundColor: checked ? color : '#ccc'
                }}
            />
        </label>
    );
};
export default Switch;