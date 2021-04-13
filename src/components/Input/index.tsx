
import React, {InputHTMLAttributes,useEffect,  useRef, useState,useCallback} from 'react';

import {IconBaseProps} from 'react-icons';
import {Container} from './styles';
import { useField }  from '@unform/core'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isField, setIsFiled] = useState(false);

    const {fieldName, defaultValue,error, registerField} = useField(name);

    const handleInputFocus = useCallback(() => {
        setIsFocus(true);
    },[])

    const handleInputBlur = useCallback(() => {
        setIsFocus(false);

        if (inputRef.current?.value) {
            setIsFiled(true);
        }else {
            setIsFiled(false)
        }
    },[]) 

    useEffect(()=> {
        registerField({
           name: fieldName,
           ref: inputRef.current,
           path: 'value',
        });
    }, [fieldName, registerField])
    
    return (
        <Container isField={isField} isFocus= {isFocus} >
        {Icon && <Icon size={20} />}
        <input onFocus={handleInputFocus } onBlur= {handleInputBlur} defaultValue= {defaultValue} ref={inputRef} {...rest}/>

    </Container>
    )
}

export default Input
