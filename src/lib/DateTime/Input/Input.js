import React from 'react';

export default function Input(renderProps) {
    const {
        methods,
        props,
        state
    } = renderProps;

    return (
        <input
            ref={state.inputRef}
            className='input'
            type='text'
            value={state.inputValue}
            onChange={event => methods.setInputValue(event.target.value)}
            placeholder={props.inputPlaceholder}
            disabled={props.disabled}
            autoFocus
        />
    )
}