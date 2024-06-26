import {FC} from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import React from 'react';

interface DateFormatterProps {
    date: string;
}

const DateFormatter: FC<DateFormatterProps> = ({ date }) => {
    const formattedDate = format(new Date(date), 'd. MMMM yyyy , HH:mm', { locale: enUS });

    return (<>
      {formattedDate}
    </>);
};

export default DateFormatter;