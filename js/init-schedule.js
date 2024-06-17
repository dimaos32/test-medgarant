import DaySchedule from "./day-schedule.js";

const initSchedule = () => {
  const workingHoursStart = '09:00';
  const workingHoursEnd = '21:00';
  const busy = [
    {start: '10:30', stop: '10:50'},
    {start: '18:40', stop: '18:50'},
    {start: '14:40', stop: '15:50'},
    {start: '16:40', stop: '17:20'},
    {start: '20:05', stop: '20:20'},
  ];

  const schedule = new DaySchedule(workingHoursStart, workingHoursEnd, busy);

  console.log(schedule.getPossibleAppointments());
}

export {initSchedule}
