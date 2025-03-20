
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Profile = () => {
  const [selectedMonth, setSelectedMonth] = useState(2); // March (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2025);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);
    
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    // Combine blanks and days
    const calendarDays = [...blanks, ...days];
    
    // Split into weeks
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    
    return (
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div 
              key={index}
              className={cn(
                "h-10 flex items-center justify-center rounded-full text-sm",
                day === 20 ? "bg-teal-600 text-white" : day ? "hover:bg-gray-100 cursor-pointer" : "",
                day === null ? "pointer-events-none" : ""
              )}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="page-transition">
      <div className="bg-teal-600 px-4 py-8 text-white">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl font-semibold">AR</span>
          </div>
          
          <div className="ml-4">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">3</span>
              <span className="ml-2 text-sm opacity-80">Active Jobs</span>
            </div>
            <div className="mt-1 flex items-center">
              <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                VCS-606
              </span>
              <div className="ml-3 flex">
                <span className="text-yellow-300 text-lg">★★</span>
                <span className="text-yellow-300/30 text-lg">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Calendar size={20} className="text-gray-500 mr-2" />
            <h2 className="text-lg font-medium">Calendar</h2>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={previousMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-ring"
            >
              <ChevronLeft size={20} className="text-gray-500" />
            </button>
            
            <span className="mx-2 min-w-[120px] text-center">
              {months[selectedMonth]} {selectedYear}
            </span>
            
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-ring"
            >
              <ChevronRight size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        {renderCalendar()}
        
        <div className="mt-8 bg-white rounded-xl shadow-subtle p-4">
          <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
          
          <div className="space-y-4">
            <div className="flex items-start pb-4 border-b border-gray-100">
              <div className="w-12 text-center">
                <span className="text-lg font-bold text-teal-600">20</span>
                <p className="text-xs text-gray-500">MAR</p>
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Women's Co-op Meeting</h4>
                <p className="text-sm text-gray-500 mt-1">10:00 AM - 12:00 PM</p>
                <p className="text-sm text-gray-500">Village Community Center</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 text-center">
                <span className="text-lg font-bold text-gray-700">23</span>
                <p className="text-xs text-gray-500">MAR</p>
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Skills Training Workshop</h4>
                <p className="text-sm text-gray-500 mt-1">2:00 PM - 4:30 PM</p>
                <p className="text-sm text-gray-500">Digital Learning Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
