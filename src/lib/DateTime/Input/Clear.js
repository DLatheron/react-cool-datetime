import React from 'react';
import classNames from 'classnames';

export default function Clear(renderProps) {
    const {
        methods,
        props,
        state
    } = renderProps;

    if (!props.clear || !state.inputValue || state.inputValue.length === 0) {
        return null;
    }

    return (
        <button
            className={classNames(
                'clear',
                props.disabled && 'disabled'
            )}
            onClick={event => {
                methods.suppressEvent(event);
                methods.clearDate();
            }}
            disabled={props.disabled}

        >
        {
            (typeof props.clear === 'function')
                ? props.clear(renderProps)
                : props.clear
        }
        </button>
    );
}
