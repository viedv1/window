const moment = require('moment');
require('moment/locale/sv'); // Load the locale you need
const localeSeparators = require('./separators'); // Import the locale separators

function renderTimeWindow(payload, locale = 'sv-SE') {
	// Extract timestamps from payload
	const timestamp1 = payload.timestamp1;
	const timestamp2 = payload.timestamp2;

	// Convert timestamps to moment objects
	const dt1 = moment(timestamp1).locale(locale);
	const dt2 = moment(timestamp2).locale(locale);

	// Define formatters
	const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' });
	const timeFormatter = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' });
	const longDateFormatter = new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric' });

	// Get separators from localeSeparators
	const separators = localeSeparators[locale.toUpperCase()] || localeSeparators['EN-US'];
	const dateTimeSeparator = separators.dateTimeSeparator;
	const dateRangeSeparator = separators.dateRangeSeparator;
	const timeRangeSeparator = separators.timeRangeSeparator;

	// Check if the dates are the same
	if (dt1.isSame(dt2, 'day')) {
		// Format: Weekday, Date, FromTime - ToTime
		const dateStr = dateFormatter.format(dt1.toDate());
		const fromTimeStr = timeFormatter.format(dt1.toDate());
		const toTimeStr = timeFormatter.format(dt2.toDate());
		return `${dateStr}${dateTimeSeparator}${fromTimeStr}${timeRangeSeparator}${toTimeStr}`;
	} else {
		// Format: FromDate – ToDate
		const fromDateStr = longDateFormatter.format(dt1.toDate());
		const toDateStr = longDateFormatter.format(dt2.toDate());
		return `${fromDateStr}${dateRangeSeparator}${toDateStr}`;
	}
}

// Example payload
const payload = {
	timestamp1: '2023-10-01T14:30:00',
	timestamp2: '2023-10-02T16:45:00'
};

console.log(renderTimeWindow(payload, 'sv-SE')); // Ensure the locale is 'sv-SE'
console.log(renderTimeWindow(payload, 'ja-JP')); // Ensure the locale is 'sv-SE'
console.log(renderTimeWindow(payload, 'en-US')); // Ensure the locale is 'sv-SE'