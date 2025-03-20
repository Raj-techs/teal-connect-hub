import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Settings, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Profile = () => {
  const [selectedMonth, setSelectedMonth] = useState(2); // March (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2025);
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

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
    
    const calendarDays = [...blanks, ...days];
    
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    
    return (
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-xs font-medium text-gray-500 dark:text-gray-400">
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
                day === 20 ? "bg-teal-600 text-white" : day ? "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" : "",
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
      <div className="bg-teal-600 dark:bg-teal-800 px-4 py-8 text-white">
        <div className="flex items-center justify-between">
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
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Settings size={22} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {showSettings ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-subtle p-4 mb-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <Settings size={18} className="mr-2 text-gray-500" />
                Settings
              </h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-sm text-teal-600 dark:text-teal-400"
              >
                Close
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <Moon size={18} className="mr-2 text-gray-500" />
                  ) : (
                    <Sun size={18} className="mr-2 text-gray-500" />
                  )}
                  <span>Dark Mode</span>
                </div>
                <Switch 
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
              
              <div className="flex items-center justify-between opacity-50">
                <div className="flex items-center">
                  <span className="mr-2">🌐</span>
                  <span>Language</span>
                </div>
                <span className="text-xs">Coming soon</span>
              </div>
            </div>
          </div>
        ) : null}
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Calendar size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-medium">Calendar</h2>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={previousMonth}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-ring"
            >
              <ChevronLeft size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
            
            <span className="mx-2 min-w-[120px] text-center">
              {months[selectedMonth]} {selectedYear}
            </span>
            
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-ring"
            >
              <ChevronRight size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        {renderCalendar()}
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-subtle p-4">
          <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
          
          <div className="space-y-4">
            <div className="flex items-start pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="w-12 text-center">
                <span className="text-lg font-bold text-teal-600 dark:text-teal-400">20</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">MAR</p>
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Women's Co-op Meeting</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">10:00 AM - 12:00 PM</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Village Community Center</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 text-center">
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">23</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">MAR</p>
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Skills Training Workshop</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2:00 PM - 4:30 PM</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Digital Learning Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
