import * as React from 'react';
import { UseFormMethods } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';
export interface IReactHookFormSelectProps {
    name: string;
    label: string;
    form: UseFormMethods<any>;
    defaultValue?: string | Date | null;
    children: any;
}

export default function ReactHookFormSelect(props: IReactHookFormSelectProps) {
    const { name, label, form, defaultValue, children } = props;

    const labelId = `${name}-label`;
    return (
        <FormControl variant="outlined" margin="normal">
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                as={
                    <Select labelId={labelId} label={label}>
                        {children}
                    </Select>
                }
                name={name}
                control={form.control}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
}
