import React from 'react'
import { Input } from '@chakra-ui/react'
import "./CustomInput.css";

export default function CustomInput({
    variant,
    placeholder,
    value,
    onChange,
    onBlur,
    width,
    className,
    ...others
}) {
    const defaultValue = {
        variant: variant || 'filled',
        width: width || '100%',
        placeholder: placeholder || '',
        className: className ? [...className.split(' '), 'default-style'].join(' ') : 'default-style'
    }
    return (
        <>
            <Input
                variant={defaultValue.variant}
                placeholder={defaultValue.placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={defaultValue.className}
                {...others}
            />

        </>
    )
}
