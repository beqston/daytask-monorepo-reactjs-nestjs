export function getTaskHeaderTitle(selectedFullDate: string){
    const todayStr = new Date().toISOString().split('T')[0];

    //calculate tommorow day
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // calculate yerstaday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (selectedFullDate === todayStr) {
        return "Today's Tasks";
    } else if (selectedFullDate === tomorrowStr) {
        return "Tomorrow's Tasks";
    } else if (selectedFullDate === yesterdayStr) {
        return "Yesterday's Tasks";
    } else {
        const dateObj = new Date(selectedFullDate);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
        return `${dateObj.toLocaleDateString('en-US', options)} Tasks`;
    }
}