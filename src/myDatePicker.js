import React, { useState } from 'react';
import  DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyDatePick() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
      <div className="a">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
      </div>
  );
}
export default MyDatePick;

