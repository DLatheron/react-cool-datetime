# react-cool-datetime

## Installation

```
npm install react-cool-datetime
```

## Important Notes on Validation
Dates are not hard to validate, but they are annoying in that they rely heavily on context. What I mean by that is that the 29th is generally a valid day of the month - except when is February of a non-leap year... therefore the validity of the day of a month is based on the month and year which depending on the order you specify these whilst typing may or may not even be specified yet.

This creates problems when you split the input of a day up into its consituent parts, because '29' will probably be valid - until in the next field you specify that its 'Feburary' but then it might still be valid, but not if the year you enter is 2021. This means that validation cannot full be performed until you have a fully qualified day of month, month and year.

It is true that partial validation is possible - for example you can't have the 32nd of any month (of the Gregorian calendar) - so perhaps the best solution is to make the whole validation a two phase affair? Or is that just making things two complex?

So the solution? Well here is the one chosen by this implementation:

- A DateTime control starts of with a default valid DateTime;
- This is displayed in the input-parsing part of the control and selected in the dropdown;
- This is only ever updated in two cases:
  - The user selects a new date using the picker - where only valid dates can be (by definition) selected;
  - The user enters a valid date into the input-parsing part of the control and confirms it - by hitting `Enter`;
- An optional class will indicate that the value in the input-parsing part of the control is invalid;
- [POSSIBLY] Removing focus from that field will attempt to automatically confirm the date change;
- As the value in the input-parsing part of the control is changed the date-picker will automatically update to show the parsed date;


## TODO
- Today button;
- Today indicator;
- Selected day indicator
- Click to change year;
- Click to change month;
- Could we select the 'best' date picker month/year by ignoring the dom/month if they made the date invalid???
  - So build dom/month/year if invalid then use 1/month/year if invalid then build 1/1/year??? Otherwise show today?

### Done
- ~~Basic implementation~~
- ~~Implement the date picker dropdown using a full CSS grid;~~