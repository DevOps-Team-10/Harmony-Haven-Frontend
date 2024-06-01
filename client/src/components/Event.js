import moment from 'moment';
import React, { useState, useEffect } from 'react';
import eventsData from '../assets/events.json';
class Calendar {
    constructor(month, year) {
        this.month = month;
        this.year = year;
        this.daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
        this.firstDayOfMonth = moment(`${year}-${month}-01`, "YYYY-MM-DD").day();
    }

    generateCalendarDays() {
        const calendarDays = [];

        for (let i = 0; i < this.firstDayOfMonth; i++) {
            calendarDays.push(null);
        }

        for (let day = 1; day <= this.daysInMonth; day++) {
            calendarDays.push(day);
        }

        return calendarDays;
    }
}


const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(moment().month() + 1); // current month (1-indexed)
    const [currentYear, setCurrentYear] = useState(moment().year()); // current year

    useEffect(() => {
        setEvents(eventsData.events);
    }, []);

    const calendar = new Calendar(currentMonth, currentYear);
    const calendarDays = calendar.generateCalendarDays();

    const handleClick = (day) => {
        const event = events.find(event => moment(event.date).date() === day && moment(event.date).month() + 1 === currentMonth && moment(event.date).year() === currentYear);
        if (event) {
            setSelectedEvent(event);
        }
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const handleMonthChange = (direction) => {
        const newDate = moment(`${currentYear}-${currentMonth}-01`).add(direction, 'months');
        setCurrentMonth(newDate.month() + 1);
        setCurrentYear(newDate.year());
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">{moment(`${currentYear}-${currentMonth}`, "YYYY-MM").format("MMMM YYYY")} Events Calendar</h1>
            <div className="flex justify-between mb-4">
                <button onClick={() => handleMonthChange(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
                <button onClick={() => handleMonthChange(1)} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="font-bold text-center text-sm">{day}</div>
                ))}
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`h-16 border rounded-lg relative ${day ? 'cursor-pointer' : ''}`}
                        onClick={() => day && handleClick(day)}
                    >
                        {day && (
                            <div className="p-1 text-xs">
                                <span className="font-bold">{day}</span>
                                <div className="absolute inset-0 overflow-auto">
                                    {events
                                        .filter(event => moment(event.date).date() === day && moment(event.date).month() + 1 === currentMonth && moment(event.date).year() === currentYear)
                                        .map(event => (
                                            <div key={event.id} className="bg-blue-100 text-xxs p-1 mt-1 rounded">
                                                {event.title}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg max-w-md mx-auto">
                        <h2 className="text-lg font-bold mb-2">{selectedEvent.title}</h2>
                        <p className="mb-2"><strong>Date:</strong> {selectedEvent.date}</p>
                        <p className="mb-2"><strong>Time:</strong> {selectedEvent.time}</p>
                        <p className="mb-4"><strong>Description:</strong> {selectedEvent.description}</p>
                        <button
                            onClick={closeModal}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCalendar;
