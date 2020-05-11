import React, { useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useOutsideClick } from '../Hooks';

import InputContainer from './Input/InputContainer';
import PickerContainer from './Picker/PickerContainer';
import { DateHelper } from './Helpers/DateHelper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'

import './DateTime.scss';

function initialState({ open }) {
    return {
        open,
        date: null
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'open':
            return {
                ...state,
                open: true
            };

        case 'close':
            return {
                ...state,
                open: false
            };

        case 'toggle':
            return {
                ...state,
                open: !state.open
            };

        case 'clearDate':
            return {
                ...state,
                date: null
            };

        case 'setDate':
            return {
                ...state,
                date: action.date
            };

        default:
            throw new Error(`Uncognised action type ${action.type}`);
    }
}

DateTime.propTypes = {
    open: PropTypes.bool,
    prefix: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    suffix: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    clear: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    handle: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ])
};

DateTime.defaultProps = {
    open: false,
    prefix: undefined,
    suffix: undefined,
    clear: <FontAwesomeIcon icon={faTimes} />,
    handle: <FontAwesomeIcon icon={faCalendar} />,
};

export default function DateTime(props) {
    const dateTimeRef = useRef();
    const inputRef = useRef();

    const [state, dispatch] = useReducer(
        reducer,
        initialState({
            open: props.open,
            date: {
                year: 2020,
                month: 5,
                dayOfMonth: 11
            }
        })
    );

    const methods = {
        toggleDropdown: () => {
            dispatch({ type: 'toggle' });
        },
        closeDropdown: () => {
            dispatch({ type: 'close' });
        },
        openDropdown: () => {
            dispatch({ type: 'open' });
        },
        suppressEvent: event => {
            event.preventDefault();
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        },
        clearDate: () => {
            dispatch({ type: 'clearDate' });
        },
        setDate: date => {
            // Only ever update the date if it is valid!
            if (DateHelper.isValid(date)) {
                console.info('Updaing control date to', date);
                dispatch({ type: 'setDate', date });
            }
        }
    };

    // TODO: Need to make methods safe so they don't change...
    useOutsideClick(dateTimeRef, methods.closeDropdown, state.open);

    const renderProps = {
        props,
        methods,
        state: {
            ...state,
            inputRef
        }
    };

    return (
        <div
            ref={dateTimeRef}
            className={classNames(
                'datetime',
                props.disabled && 'disabled'
            )}
            disabled={props.disabled}
            tabIndex={props.disabled ? -1 : props.tabIndex}
            onClick={
                !props.disabled
                    ? event => {
                        if (!state.open) {
                            methods.suppressEvent(event);
                            methods.openDropdown();
                        }
                    }
                    : undefined
            }
        >
            <InputContainer {...renderProps} />
            <PickerContainer {...renderProps} />
        </div>
    )
}
