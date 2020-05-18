import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

NumberInput.propTypes = {
    inputRef: PropTypes.object,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    length: PropTypes.number,
    onChange: PropTypes.func
};

export default function NumberInput(renderProps) {
    const { methods } = renderProps;

    const [value, setValue] = useState(renderProps.value || '');

    useEffect(() => {
        setValue(renderProps.value);
    }, [renderProps.value]);

    return (
        <input
            ref={renderProps.inputRef}
            className='number-input'
            type='text'
            value={value}
            onChange={event => {
                const newValue = event.target.value;
                const intValue = parseInt(newValue);
                if (isNaN(intValue)) {
                    setValue(undefined);
                } else {
                    setValue(intValue);
                }
            }}
            onKeyDown={event => {
                // console.info('onKeyDown', event.key);
                let suppress = false;

                switch (event.key) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                        suppress = true;
                        break;

                    default:
                        suppress = false;
                        break;
                }

                if (suppress) {
                    methods.suppressEvent(event);
                }
            }}
            onKeyUp={event => {
                // console.info('onKeyUp', event.target);
                switch (event.key) {
                    case 'Enter':
                        renderProps.inputRef.current.dispatchEvent(
                            new KeyboardEvent('keypress', {
                                key: 'Enter',
                            })
                        );
                        break;

                    case 'ArrowUp':
                        if (value < renderProps.max) {
                            setValue(value + 1);
                        }
                        break;

                    case 'ArrowDown':
                        if (value > renderProps.min) {
                            setValue(value - 1);
                        }
                        break;

                    default:
                        break;
                }
            }}
            onKeyPress={event => {
                // console.info('onKeyPress', event.key);
                const length = value === undefined ? 0 : value.length;
                let suppress;

                switch (event.key) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        if (length >= renderProps.length) {
                            suppress = true;
                        }
                        break;

                    default:
                        suppress = true;
                        break;
                }

                if (suppress) {
                    methods.suppressEvent(event);
                }
            }}
            onBlur={() => {
                console.info('onBlur', value);
                if (value > renderProps.max) {
                    renderProps.onBlur(renderProps.max);
                } else if (value < renderProps.min) {
                    renderProps.onBlur(renderProps.min);
                } else {
                    renderProps.onBlur(value);
                }
            }}
        />
    );
}
