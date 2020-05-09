import React from 'react';

import Prefix from './Prefix';
import Clear from './Clear';
import Suffix from './Suffix';
import Handle from './Handle';
import Input from './Input';

export default function InputContainer(renderProps) {
    const {
        props,
        state
    } = renderProps;

    return (
        <div
            className='input-container'
            onClick={() => state.inputRef.current && state.inputRef.current.focus()}
        >
            {props.prefix && <Prefix {...renderProps} />}

            <Input {...renderProps} />

            {props.clear && <Clear {...renderProps} />}
            {props.suffix && <Suffix {...renderProps} />}
            {props.handle && <Handle {...renderProps} />}
        </div>
    );
}
