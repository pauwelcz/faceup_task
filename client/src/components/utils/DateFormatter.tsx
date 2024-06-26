import React, {FC} from 'react';

interface DateFormatterProps {
    date: string;
}

const DateFormatter: FC<DateFormatterProps> = ({ date }) => {
    const localDate = new Date(date);
    const formattedDate = localDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    return (<>
      {formattedDate}
    </>);
};

export default DateFormatter;