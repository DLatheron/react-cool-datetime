import React from 'react';
import classNames from 'classnames';
import { DateHelper } from '../Helpers/DateHelper';
// import SingleMonthPicker from './SingleMonthPicker';
import DoubleMonthPicker from './DoubleMonthPicker';

export default function PickerContainer(renderProps) {
    const {
        state
    } = renderProps;

    const date = state.pickerDate
        ? state.pickerDate
        : DateHelper.defaultDate();

    return (
        <div className='picker-container'>
            <div
                className={
                    classNames(
                        'picker',
                        state.open ? 'open' : 'closed'
                    )
                }
            >
                {/* <SingleMonthPicker {...renderProps} date={date} /> */}
                <DoubleMonthPicker {...renderProps} date={date} />
            </div>
        </div>
    );
}
