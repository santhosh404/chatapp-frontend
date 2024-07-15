import React from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import "./CustomInput.css";

export default function CustomInput({
    variant,
    placeholder,
    value,
    onChange,
    onBlur,
    width,
    className,
    border,
    backgroundColor,
    icon,
    leftIcon,
    rightIcon,
    ...others
}) {
    const defaultValue = {
        variant: variant || 'filled',
        width: width || '100%',
        placeholder: placeholder || '',
        className: className ? [...className.split(' '), 'default-style'].join(' ') : 'default-style'
    }
    const style = {
        background: backgroundColor || "#F0FFF4 !important",
        border: border || "1px solid #48BB78",
        transition: "ease 0.4s all"
    }
    return (
        <>
            <InputGroup>
                {
                    leftIcon ? (
                        <InputLeftElement pointerEvents='none'>
                            {leftIcon}
                        </InputLeftElement>
                    ) : rightIcon ? (
                        <InputRightElement pointerEvents='none'>
                            {rightIcon}
                        </InputRightElement>
                    ) : null
                }

                <Input
                    variant={defaultValue.variant}
                    placeholder={defaultValue.placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={defaultValue.className}
                    style={style}
                    {...others}
                />
            </InputGroup>
        </>
    )
}
