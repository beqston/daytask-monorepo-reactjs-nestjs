import CalendarHead from "../components/calendar/calendar-head";
import Schedule from "../components/calendar/schedule";
import TodayTasks from "../components/calendar/today-tastks";
import Navbar from "../components/ui/navbar";
import PagesWrapper from "../components/ui/pages-wrapper";

export default function Calendar(){
    return(
        <PagesWrapper>
            <CalendarHead />
            <Schedule />
            <TodayTasks />
            <Navbar />
        </PagesWrapper>
    )
}