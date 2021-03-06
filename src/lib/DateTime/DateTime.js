import React, { useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useOutsideClick } from '../Hooks';

import InputContainer from './Input/InputContainer';
import PickerContainer from './Picker/PickerContainer';
import SingleMonthPicker from './Picker/SingleMonthPicker';
import { DateHelper } from './Helpers/DateHelper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons'

import './DateTime.scss';

function initialState(defaults) {
    return {
        open: defaults.open,
        pickerDate: defaults.pickerDatenull,
        selectedDate: defaults.selectedDate,
        selectionHover: {
            start: null,
            end: null
        }
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

        case 'setPickerDate':
            return {
                ...state,
                pickerDate: action.pickerDate
            };

        case 'setSelectedDate':
            return {
                ...state,
                selectedDate: action.selectedDate,
                pickerDate: action.selectedDate.start
            };

        case 'setSelectionHover':
            return {
                ...state,
                selectionHover: action.selectionHover
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
    ]),
    format: PropTypes.string,
    datePicker: PropTypes.func
};

DateTime.defaultProps = {
    open: false,
    prefix: undefined,
    suffix: undefined,
    clear: <FontAwesomeIcon icon={faTimes} />,
    handle: <FontAwesomeIcon icon={faCalendar} />,
    format: '{DD}/{MM}/{YYYY}',
    datePicker: SingleMonthPicker
};

export default function DateTime(props) {
    const dateTimeRef = useRef();
    const inputRef = useRef();

    const [state, dispatch] = useReducer(
        reducer,
        initialState({
            open: props.open,
            pickerDate: {
                year: 2020,
                month: 5,
                dayOfMonth: 1
            },
            selectedDate: {
                start: {
                    year: 2020,
                    month: 5,
                    dayOfMonth: 13
                },
                end: {
                    year: 2020,
                    month: 5,
                    dayOfMonth: 13
                }
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
        clearSelectedDate: () => {
            dispatch({ type: 'setSelectedDate', selectedDate: null });
        },
        clearPickerDate: () => {
            dispatch({ type: 'setPickerDate', pickerDate: null });
        },
        setSelectedDate: selectedDate => {
            // Only ever update the date if it is valid!
            if (DateHelper.isValid(selectedDate)) {
                switch (props.selectionType) {
                    case 'single':
                        dispatch({ type: 'setSelectedDate', selectedDate: { start: selectedDate, end: selectedDate } });
                        break;

                    case 'range':
                        if (!state.selectedDate.start) {
                            dispatch({ type: 'setSelectedDate', selectedDate: {start: selectedDate, end: null } });
                            dispatch({ type: 'setSelectionHover', selectionHover: { start: selectedDate, end: null } });
                        } else if (!state.selectedDate.end) {
                            if (DateHelper.isBefore(state.selectedDate.start, selectedDate)) {
                                dispatch({ type: 'setSelectedDate', selectedDate: { start: state.selectedDate.start, end: selectedDate } });
                            } else {
                                dispatch({ type: 'setSelectedDate', selectedDate: { start: selectedDate, end: state.selectedDate.start } });
                            }
                            dispatch({ type: 'setSelectionHover', selectionHover: { start: null, end: null } });
                        } else {
                            dispatch({ type: 'setSelectedDate', selectedDate: { start: selectedDate, end: null } });
                            dispatch({ type: 'setSelectionHover', selectionHover: { start: selectedDate, end: null } });
                        }
                        break;

                    default:
                        throw new Error(`Unknown selection type: '${props.selectionType}'`);
                }
            }
        },
        setSelectionHover: (startDate, endDate) => {
            dispatch({ type: 'setSelectionHover', selectionHover: { start: startDate, end: endDate } });
        },
        setPickerDate: pickerDate => {
            // Only ever update the date if it is valid!
            if (DateHelper.isValid(pickerDate)) {
                dispatch({ type: 'setPickerDate', pickerDate });
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
            tabIndex={props.disabled ? '-1' : props.tabIndex}
            disabled={props.disabled}
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
