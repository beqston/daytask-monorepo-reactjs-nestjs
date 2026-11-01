export function getCurrentWeekDays(){
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();

    // calculate current week date of monday
    const distanceToMonday = currentDayOfWeek == 0? -6: 1 - currentDayOfWeek;
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() + distanceToMonday);

    // create array of week
    const daysArray = [];
    const options:Intl.DateTimeFormatOptions= {weekday:"short"};

    for(let i=0; i <7; i++){
        const nextDay = new Date(monday);
        nextDay.setDate(monday.getDate() + i);

        daysArray.push({
            id:i + 1,
            date:nextDay.getDate(),
            day:nextDay.toLocaleDateString('en-US', options),
            fullDate:nextDay.toISOString().split("T")[0]
        })
    }

    return daysArray;
}