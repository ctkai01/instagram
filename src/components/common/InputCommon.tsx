import { StyledFormControl, StyledLabel } from '@components/StyledComponents';
import { InputAdornment, TextField } from '@material-ui/core';
import * as React from 'react';
import { Controller, UseFormMethods } from 'react-hook-form';

export interface InputCommonProps {
    handleChange?: any;
    handleBlur?: any;
    name: string;
    label?: string;
    labelInput?: string;
    type:
        | 'button'
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'file'
        | 'hidden'
        | 'image'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'range'
        | 'reset'
        | 'search'
        | 'submit'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week';
    focus?: boolean;
    defaultValue?: string | Date | null;
    required?: boolean;
    placeholder?: string;
    className?: string;
    form: UseFormMethods<any>;
}

export function InputCommon(props: InputCommonProps) {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const {
        handleBlur,
        placeholder,
        handleChange,
        form,
        name,
        label,
        type,
        defaultValue,
        focus,
        className,
        required,
        labelInput,
    } = props;

    const hasError = form.formState.touched && form.errors[name] && form.formState.isSubmitted;

    return (
        <StyledFormControl className={className} variant="standard">
            <StyledLabel className="label" htmlFor={'' + name}>
                {label}
            </StyledLabel>
            <Controller
                name={name}
                control={form.control}
                render={(
                    { onChange, onBlur, value, name, ref },
                    { invalid, isTouched, isDirty }
                ) => {
                    return (
                        <TextField
                            onBlur={(e) => {
                                onBlur();
                                if (handleBlur) {
                                    handleBlur(e);
                                }
                            }}
                            onChange={(e) => {
                                onChange(e);
                                if (handleChange) {
                                    handleChange(e);
                                }
                            }}
                            id={'' + name}
                            // fullWidth
                            type={showPassword ? 'text' : type}
                            value={value || ''}
                            autoComplete={name}
                            autoFocus={focus}
                            defaultValue={defaultValue}
                            required={required ? true : false}
                            placeholder={placeholder ?? ''}
                            style={{
                                color: value ? '#090A18' : 'transparent',
                            }}
                            size="small"
                            className="input"
                            variant="outlined"
                            label={labelInput}
                            error={!!hasError}
                            helperText={
                                form.formState.isSubmitted ? form.errors[name]?.message : ''
                            }
                            InputProps={{
                                endAdornment:
                                    type === 'password' ? (
                                        <InputAdornment style={{ width: '40px' }} position="end">
                                            {value.length ? (
                                                <div
                                                    style={{
                                                        width: '40px',
                                                        cursor: 'pointer',
                                                        textAlign: 'center',
                                                        fontWeight: '500',
                                                    }}
                                                    onClick={() => {
                                                        setShowPassword(!showPassword);
                                                    }}
                                                >
                                                    {showPassword ? 'Hide' : 'Show'}
                                                </div>
                                            ) : null}
                                        </InputAdornment>
                                    ) : null,
                            }}
                        />
                    );
                }}
            />
        </StyledFormControl>
    );
}
