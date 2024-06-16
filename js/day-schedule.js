const APPOINTMENT_DURATION = 30; // minutess
const INTERVAL_DURATION = 10; // minutess

export default class DaySchedule {
  constructor(start, end, busy) {
    this.start = this._parseTime(start);
    this.end = this._parseTime(end);
    this.busy = busy
      .map((period) => ({
        start: this._parseTime(period.start),
        stop: this._parseTime(period.stop),
      }))
      .sort((a, b) => a.start - b.start);
    this.appoinmentDuration = APPOINTMENT_DURATION * 60 * 1000;
    this.intervalDuration = INTERVAL_DURATION * 60 * 1000;
  }

  _parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const time = new Date();
    time.setHours(hours, minutes, 0, 0)
    return time;
  }

  _isFreePeriod(startTime, endTime) {
    return !this.busy.some(
      (period) => endTime > period.start && startTime < period.stop
    );
  }

  getPossibleAppointments() {
    const possibleAppointments = [];
    let currentTime = new Date(this.start.getTime());

    while (currentTime < this.end) {
      const endTime = new Date(currentTime.getTime() + this.appoinmentDuration);

      if (endTime <= this.end && this._isFreePeriod(currentTime, endTime)) {
        const record = currentTime.toLocaleTimeString().split(':');

        record.pop();
        possibleAppointments.push(record.join(':'));
      }

      currentTime = new Date(currentTime.getTime() + this.intervalDuration);
    }

    return possibleAppointments;
  }
}
