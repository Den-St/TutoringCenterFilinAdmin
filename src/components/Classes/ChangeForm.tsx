import { ChangeClassType, ClassT } from "../../types/class";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { forEachChild } from "typescript";

type Props = {
    onChangeClass:SubmitHandler<ChangeClassType>,
    classes:ClassT[],
    pickedClass?:ClassT | null
}

export const ChangeClassForm:React.FC<Props> = ({onChangeClass,classes,pickedClass}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<ChangeClassType>();
    console.log(pickedClass,'fd')
    useEffect(() => {
        if(!pickedClass) return;
        Object.keys(pickedClass).forEach(key => {
            //@ts-ignore
            setValue(key,pickedClass[key]);
        });
    },[pickedClass])

    return <form onSubmit={handleSubmit(onChangeClass)} >
            <input {...register('number')} type={"number"} />
            <input {...register('isActive')} type={"checkbox"} />
            <input type={'submit'} value={'SUBMIT'}  id="changeForm"/>
        </form>
}