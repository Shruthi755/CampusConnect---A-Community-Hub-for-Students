import { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventCalendar.css';
import Navbar1 from '../Navbar1/Navbar1';

const localizer = momentLocalizer(moment);

// Helper functions outside component
const convertTo24Hour = (time12h) => {
  if (!time12h) return '00:00';
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
  return `${hours}:${minutes || '00'}`;
};

const EventCalendar = () => {
  // State management
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [calendarView, setCalendarView] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'business',
    image: '',
    capacity: 50
  });
  const [calendarDate, setCalendarDate] = useState(new Date());
  const notificationTimeout = useRef(null);

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'business', name: 'Business' },
    { id: 'conference', name: 'Conference' },
    { id: 'exhibition', name: 'Exhibitions' },
    { id: 'music', name: 'Music' },
    { id: 'online', name: 'Online Event' },
    { id: 'party', name: 'Party' },
    { id: 'hackathon', name: 'Hackathon' },
    { id: 'symposium', name: 'Symposium' },
    { id: 'workshop', name: 'Workshop' }
  ];

  // Load sample data
  useEffect(() => {
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);
    
    const sampleEvents = [
      // Business Events
      {
        id: 1,
        title: "Startup Pitch Competition",
        date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        time: "01:00 PM",
        location: "Business School Auditorium",
        description: "Annual startup pitch competition with $50,000 in prizes. Open to all student entrepreneurs.",
        category: "business",
        image: "https://source.unsplash.com/random/800x400/?startup",
        registrationLink: "#",
        attendees: Array(45).fill({}),
        capacity: 100,
        reminders: []
      },
      {
        id: 2,
        title: "Alumni Networking Mixer",
        date: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
        time: "06:30 PM",
        location: "University Club",
        description: "Connect with successful alumni from various industries. Business casual attire recommended.",
        category: "business",
        image: "https://source.unsplash.com/random/800x400/?networking",
        registrationLink: "#",
        attendees: Array(78).fill({}),
        capacity: 120,
        reminders: []
      },
    
      // Conference Events
      {
        id: 3,
        title: "Tech Leadership Conference",
        date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        time: "09:00 AM",
        location: "Convention Center",
        description: "Three-day conference featuring tech industry leaders discussing emerging technologies.",
        category: "conference",
        image: "https://source.unsplash.com/random/800x400/?conference",
        registrationLink: "#",
        attendees: Array(210).fill({}),
        capacity: 300,
        reminders: []
      },
      {
        id: 4,
        title: "Annual Research Symposium",
        date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        time: "08:30 AM",
        location: "Science Complex",
        description: "Showcase of undergraduate and graduate research projects across all disciplines.",
        category: "conference",
        image: "https://source.unsplash.com/random/800x400/?research",
        registrationLink: "#",
        attendees: Array(95).fill({}),
        capacity: 150,
        reminders: []
      },
    
      // Exhibition Events
      {
        id: 5,
        title: "Art & Design Exhibition",
        date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        time: "10:00 AM",
        location: "Fine Arts Gallery",
        description: "Annual exhibition featuring works by students in the art and design programs.",
        category: "exhibition",
        image: "https://source.unsplash.com/random/800x400/?art-exhibition",
        registrationLink: "#",
        attendees: [],
        capacity: 200,
        reminders: []
      },
      {
        id: 6,
        title: "Engineering Projects Showcase",
        date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        time: "11:00 AM",
        location: "Engineering Building",
        description: "Display of senior design projects and innovative engineering solutions.",
        category: "exhibition",
        image: "https://source.unsplash.com/random/800x400/?engineering",
        registrationLink: "#",
        attendees: Array(30).fill({}),
        capacity: 100,
        reminders: []
      },
    
      // Music Events
      {
        id: 7,
        title: "Spring Jazz Festival",
        date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
        time: "07:00 PM",
        location: "Outdoor Amphitheater",
        description: "An evening of jazz performances by student ensembles and guest artists.",
        category: "music",
        image: "https://source.unsplash.com/random/800x400/?jazz",
        registrationLink: "#",
        attendees: Array(180).fill({}),
        capacity: 250,
        reminders: []
      },
      {
        id: 8,
        title: "A Cappella Showcase",
        date: new Date(Date.now() + 9 * 86400000).toISOString().split('T')[0],
        time: "08:00 PM",
        location: "Performance Hall",
        description: "All university a cappella groups compete in this annual showcase.",
        category: "music",
        image: "https://source.unsplash.com/random/800x400/?acappella",
        registrationLink: "#",
        attendees: Array(150).fill({}),
        capacity: 200,
        reminders: []
      },
    
      // Online Events
      {
        id: 9,
        title: "Virtual Career Fair",
        date: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
        time: "10:00 AM",
        location: "Online (Zoom)",
        description: "Connect with recruiters from top companies in this virtual career fair.",
        category: "online",
        image: "https://source.unsplash.com/random/800x400/?virtual",
        registrationLink: "#",
        attendees: Array(320).fill({}),
        capacity: 500,
        reminders: []
      },
      {
        id: 10,
        title: "Coding Workshop Series",
        date: new Date(Date.now() + 1 * 86400000).toISOString().split('T')[0],
        time: "04:00 PM",
        location: "Online (Microsoft Teams)",
        description: "Three-part workshop series covering Python, JavaScript, and algorithms.",
        category: "online",
        image: "https://source.unsplash.com/random/800x400/?coding",
        registrationLink: "#",
        attendees: Array(85).fill({}),
        capacity: 100,
        reminders: []
      },
    
      // Party Events
      {
        id: 11,
        title: "Spring Fling Carnival",
        date: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0],
        time: "04:00 PM",
        location: "Main Quad",
        description: "Annual spring celebration with games, food, and live music.",
        category: "party",
        image: "https://source.unsplash.com/random/800x400/?carnival",
        registrationLink: "#",
        attendees: Array(450).fill({}),
        capacity: 1000,
        reminders: []
      },
      {
        id: 12,
        title: "International Students Gala",
        date: new Date(Date.now() + 12 * 86400000).toISOString().split('T')[0],
        time: "07:30 PM",
        location: "Student Union Ballroom",
        description: "Celebration of cultural diversity with performances and food from around the world.",
        category: "party",
        image: "https://source.unsplash.com/random/800x400/?gala",
        registrationLink: "#",
        attendees: Array(230).fill({}),
        capacity: 300,
        reminders: []
      },
    
      // Hackathon Events
      {
        id: 13,
        title: "24-Hour Hackathon",
        date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        time: "09:00 AM",
        location: "Computer Science Building",
        description: "Build innovative projects and compete for prizes in this intensive coding event.",
        category: "hackathon",
        image: "https://source.unsplash.com/random/800x400/?hackathon",
        registrationLink: "#",
        attendees: Array(90).fill({}),
        capacity: 150,
        reminders: []
      },
      {
        id: 14,
        title: "AI Innovation Challenge",
        date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        time: "10:00 AM",
        location: "Data Science Lab",
        description: "Two-day competition to develop innovative AI solutions for social good.",
        category: "hackathon",
        image: "https://source.unsplash.com/random/800x400/?ai",
        registrationLink: "#",
        attendees: Array(60).fill({}),
        capacity: 80,
        reminders: []
      },
    
      // Symposium Events
      {
        id: 15,
        title: "Climate Change Symposium",
        date: new Date(Date.now() + 11 * 86400000).toISOString().split('T')[0],
        time: "09:30 AM",
        location: "Environmental Studies Building",
        description: "Experts discuss climate science, policy, and sustainable solutions.",
        category: "symposium",
        image: "https://source.unsplash.com/random/800x400/?climate",
        registrationLink: "#",
        attendees: Array(110).fill({}),
        capacity: 150,
        reminders: []
      },
      {
        id: 16,
        title: "Medical Research Symposium",
        date: new Date(Date.now() + 18 * 86400000).toISOString().split('T')[0],
        time: "08:00 AM",
        location: "Medical School Auditorium",
        description: "Presentation of cutting-edge medical research by faculty and students.",
        category: "symposium",
        image: "https://source.unsplash.com/random/800x400/?medical",
        registrationLink: "#",
        attendees: Array(75).fill({}),
        capacity: 120,
        reminders: []
      },
    
      // Workshop Events
      {
        id: 17,
        title: "Resume Writing Workshop",
        date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        time: "03:00 PM",
        location: "Career Services Center",
        description: "Learn how to craft a professional resume that stands out to employers.",
        category: "workshop",
        image: "https://source.unsplash.com/random/800x400/?resume",
        registrationLink: "#",
        attendees: Array(25).fill({}),
        capacity: 30,
        reminders: []
      },
      {
        id: 18,
        title: "Public Speaking Masterclass",
        date: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
        time: "02:00 PM",
        location: "Communication Department",
        description: "Improve your public speaking skills with exercises and expert feedback.",
        category: "workshop",
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUQEhIVFRUVFRUVFxUWFRUVFRUPFRUWFhUVFRUYHSggGBolHRUXITEhJSktLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGyslHR8vLS0tLy0tLS0tLS0tLS0tLS0tLS0tKy0tLS0rLSstLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKMBNgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAECBAYDBwj/xABKEAACAQMCAwUFAwgGBwkBAAABAgMABBESIQUTMQYiQVFhBxQycYEjQpEzUmJygqGx0RVVkpSi8DR0k7PB09QWJSY1Q3ODhOEX/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EACwRAAICAQQBAwMCBwAAAAAAAAABAhEDBBIhMUETIlEFMmFxgRQzkaGx0eH/2gAMAwEAAhEDEQA/APFaQp6VVEFT4phUhRMKpAU1SFEUcCpAUhUgKZAHAqYFMBUwKdCscCugFMBXRRTCiAroBSAroophRKtdVWki12RKYAkSu8cVSjjq3FFREbOccNW4oKsQwUQgtq1ilOK1q7DZ0QgtKIQ2fpSuYVEFxWXpVlLH0oxFaVZjtfSpuYygAfcfSrFpwBpQWBRVU4LO2lcnoM+dXePcbtuHleZGZpMEsgziM4JQMcacnA2Jzv0xvXlnbbthLekK4VY0yUiUDSBnCqxGM/eP4ee1Ixm47ukHak6NnxOGyg/L3sCHB7qiWRwfDKqmR9apPZRyIZreRJogQCyHJQnoJEOGQ+HeAz4V5PNOzHJ/lV3gvGp7WQyQuVJBVh1V0PVXU7MPQ1Jzp8FPSVG4uLah80FbO0gS8sUvYU0kgiWMZIR1JUsud9B05HXqfKgd1a06kpEnFxdMzckVVJEo1cQ0PmjpWh4sHOtKCPLYrtItWODQapQK2P70NP7WTuLQqu9CHFehcW4OeWTjwrBXCYJFdmsyKaTRDTxcW7KpqJFdWFczXnHYQIpU5pUAlCpKuSBkDfqc4HqcAnHyFRp6UYMf0LB/WVn/ALPiH/SU/wDQ0H9ZWf8As+If9JWgt/ZVxN41kHu+GVXwZgCFZQ4zkbHBH40L4V2Iv57uSxEapPGnMZZHCjRqRQVcZDZMi4I2OetC/wAmKo4PB/WVp/s+If8ASVVvrNI9Oi4inznPKW4XTjGNXOiTrnwz0OcbZ7dm+BzX04t4NOsqz99tC6UGWJajvCPZ3xC5V2j5I5cssLapdJ5sJAfAxuMkb+tNdeQGTAqYFaHjXYm+tHiSVE+2kWJHRw8fOY4CMRup3zuNxkjODin2g4FPZT+7z6dYVX7ja10tnHex6U6aEaBwFTUUUs+z1xJZy366OTC+h8th9X2fwpjcfapv60R7Odib69j5sSoseSFeV+WrsuzCPYlsdCcYztnY01oWjPKK6KKt8V4VPaymGdCjgA9QQyH4XRhsynB3HkfEGqyinQrJKK6qtRUV2RaYVkkWrMaVCNatxJRFZOKOr0EVc4Y6JW0VGxDrbw0VtoK420NFreKpykMkdLeCiEMNRgjohDHUXIookY4KK8JsSWDnopz8zXCOOjliwCAZHTP0qcmWjE+fPafw82l5KhYvzDz8kkkI5OkEnyOf3VgL2cNpwMADp5nz/cK3XthvDLfytvhSI/HGlRt8s9fxrz0mvRz5JKEYP4RDHFW2vlkaVKlXCdBpexfHZbe4QCUBO8DHI7rAwddLBgpwCQcBjsDgnYV6jxrhenvrvG6h0PQmNgCuR54IzXhsXWvo3i85aGGEgZjijDbAYkCAMMeGOn0pk2mJkSceTzy8goRcR1q76360Au4qqznQDlSjXYm213QGOm9DZ0raeya0DTysfuquPqT/ACpG65KLng1vEuH6kIx4V5Bc8JY3QhPd1t18o8nU+PIBWP7NfQlxbjevEvaRfRrMYI1GpQFkfxO7Osa+SjXk46k4PSmhLcnfgLjT4Mzxa4i0xpH0UOxH6bucBj4kIEHzzQ3Oev0wP40oycgjbBBz6jcU7Us57nZSMaIUqc0qmMDxSboflTikw2PypQnuXbLhvE547D+j5CnLiTmEXKQhWaG1MbOpcFgMMdgf30ehmjPaDSuNacPAk8CNXEInQEdVOltWDuA4rC+0ntLIkFgtnesv2B5gt7gjcRWygSCNtjkOBn1rO+zHtElpxHnTsdMqNG8jEnS5kjlV3O5I1xgE9cMTSpcBs7+xf/zNf9WuP93XoHB7F5+H30KTm3LcQvPtwQujTc27ddadcadj40P4HwThnCJZOIm+SSMo6wxhomYxuQSilJGMrFRoBwo3LHHSq3ZpoL7g9xbz3UNu9xdTStqeLKky2835N5ELA6GGc1nyYL8VtJLXh1rBJK92Tf2uJz3gAZ9YOrW3cGkoDqO8jDbbON9sg/70/wDrwfwajklxZcPs4OHR3aXLyXkMjMrR6Yk94gkdiEd1jUCFRgtkl3OABV3tn2Zs7+695HFLeL7NI9ObeT4MjIb3leufKjF07A+UAOAH/wAM8Q/99v48Pq97U+JTWstvYW0kkMUcCn7J2jLaZJYUBZSDgCHOM4y7HrXIRW9vwXiVmLqKUi4whV0UyqfcTqRA5JHdcZBI7h3ohPFacchhkNytvdRJolU6DkdXOh3TUurLqysccxlYAgU9834B4oxfaDtTNexQxzpGXhz9qAwkfUAG1743KhjgDfJ8TQda13bu8sVSCwsxGywbyTqqFnfTpCmVR9od2ZiO7lgB8NZJRVY9E5dnVBXZBXJKsRinJs7RirkS1XiFXIhREZbt1onbLVGAUUtVrNgCFslFLdao24olAKi2URdgFXohVOGrsZqTKotRihvEZLW2a4vZY0LiCNQSAXZdTroUnpklM4/RzRFGoD7QLIzWEoHVAJB8kOW/w5qmnipZYxl02rNNtRbR4Vx+cyFnO3MkeQD0JOSfM5PX0rPmjd1HqGrJGBj028B+8/U0GfrXo/UsbjkTrh9EdO+KIUqVSjQk4Az8tyT5AV5h0mk9nvC+ffxAjuxnnP8AqREMAfQvoX9qvaLrJyTuTuT6mhXYns8LK1Cso50mHlONwT8MWfJR/iyfKily1ZE5sBXy1nb1a0l6az17VV0QAlwtbH2SyYuZB5oP3H/9rIXFaT2bShbliTgaCSfAKu7E+gAJoNXwUTo3HtC7XpYxYXBmcHSOoUfnMM9PL5Gvn++vDM7SOxLscknfJxgfwxRrt3x73u7eQfDnC/qjYfuFZdvGnyJY6gv3/X/g0Ll7n+36BAsCBgYGBt9N/wATv9a5mrvEVxK4xgamwAMDTnbb5YqmakOjmaVOaVAJQpxSFORSDHovBPZzb+7R3HEL0WxnAaOMGFDhgGXW0zgFirKdIGwYZO9V09nLrxMcPllIRoZJ0mSPd0jByNDNhWypBGrbbfBBosOM8I4pbwQ8Qke1uIUEYfdUPdVSwfQy6W5anDhcHIDEYotwXgl1a8WgMt293E1pd8h3YllVYkJQDUygaXjIKtggjpS2w0gJdey2JhKLO+SeeLIaEiHOsHGhmjlYxsSCBqGCcDIrjwPsHZS2EN9c3pgEo+8IVQNrlVVDSOMkiJjitZZcNsuFX11xOa+jYu0xEI5esF51maMKsrM75QKBpAG5OMVXtX4e3AbRuJahEz5URiQn3gy3xGOWc6dOv91HczUjCdreA2NskZtb5bkuzB1BhJRQAQx5bN1yRv5VcuewxThK8S5hLFUkMWgaRDJIFUh85zpeNjtjDelVO0dpw2a4t4OFcz7VhE5kEn5aSRUjwJDnG56V7LdWUsrTWHKZbN7JI45dtPNYvEAN85EckJ6YzCabc1Qu2zx3s92YW5sry7MpQ2qlggQEORFJLgtkafgx0PWrM/ZBIeHC9upWjkkI5NuEBZ9Qymslhp27522Ur4sFrS+yV0js733hRoWQc4ONSqi28/M1r94AA93x6eNUPatC8htr5ZGkt5YgsZOBpc5kzgYwZAdR2+KNx90ANue6gUqKkHYpDb2E3PbN7NHEV0DEYk5neB1d4jl9NutVe0nZc2lzFFrZo5gpRyoU7sFdSoJGpSQdjjDKfGttZ/6FwL/W7b+NzRHjMaX7TWgAE9nJayx/pK0ET/4syRn1ENDe0zbVRhuN9jXi4glhA/NZkD62XQFGqQOWwThQIyc/uzgUbHYCA6oYr5XuUGWjIQAEbYZVcugyQMkHGdwK15Uf01O/31sk0f3qU7ftLGPrWA7C8E940zrfi3uBIyqvcMrkoCXXVKhOrWw2B6GmUm12K4qwAYmVijAqykqynqrKcEH1BGKswirPaG1aK7ljaUysCpMhXSXZ0VySuTg97HXwrhDVUyDRft6KWwoZb0UtqzAgpb0QgobAaIQmpMoghEatI1UI2qwr1NlEXkeoX8fMieP89GX+0pH/ABrislNcXixo0jHCqMk+np5nwxWje5V2F9HgF3avyhpUksTtjoABufIb/uoC0e+5H4ijvarihZjEimOPJOnfJySe+x+PGfAADG2fiOcr1NfnWSaVcohgg4o6mLyI/GvUPZX2aj5fv0qhn1kQg9FCbNJj87VkDy0k+Iryqtz7Oe1Yt292mfELnusx7sUh8/zUbxPQHfxJrz5U1wX5PXZXodcyV0urhVBZ2CKvxM3QA9PnnwA65rD8W7bxoxCW8jr4O0ixg/shGx+NGOOTjuS4JNq68hu8egV4aqQdsIJWw8bQ5xhtfNT9ruhlHqNXyFWLzx6fiCCDuCCNiD1yOuaZCuLQLnoraryLCWc4BnPLXOfyKnMh26lmwvyRvCqVtaGVjvpVFLyPjOiNepx4noAPEkfOgvajjQnKogKxRDRGhxsmSctjq5JJJ8z5VbD7X6j6X92CS3e1eQHcSZOdvptT2gGtcjUAQSOmVG5GfXpXI1ftoMKGPVt/2fCueUnKW5nQkkqROeQsxYnJJJPzNcTXVq5mgFHM0qMcC4BLdFgmAFGST0yTsPn1/CnoGszIp8UhTscAmkGPUIu13CeIQQpxaOQTQKEEqCTDgAAkNEcjOkEqVxkkgjJruvtDsjxCBgjxWdtBPChCZYtJGkYIiDHSgWJAATnYk9apf/yaX3y2tRdArcW7zmXkn7Pl6cro5ne3kQZyPi6UJ4d2EeW04hdCcAWEkyaeXnnckanOrX3NseDdaHtDyZ7jNwkt1PMnwyTzSLkYOh5GZcjwOCK9A4R2h4NJwu3sb4ykxHUVSOXaQPOVIdCMjTOdqF8L9nZls0uTdokskEl0lvymbNpEyh3MobAbvqQuPH5kXp/ZtbBbcpxaN/e3VYALZhzF5iJIy/a/dD6seOKLaByPbX/Z+C8tri2M6iIys5KTP3jHph0hz4MxbI/NFcLT2i3Pv/Mklb3MzP8AYhI+7aOWVQMLnUqkHr1WpJ7PbY3EsC8VjYW8M8s7i2bEPIdFZWXm/pMcg7aDsc1GD2cMLm4inu44obdIH94CGQSLcsVh0oGGMspB32I8c5o8A5LZ7U2CpxZI2fF4XeH7MgF5YJFcNv3BzJW+lUuzfaG2PDp+HXpcIctA6oXKOSXwQCMBZAHHmJJB41S432MktbeeeSVSYLz3QoEOGzEsyyh9W2Vcd3H1ppeyTrwheLmUaWkKcrlnIUSNFr5mrfdemnx60VQHYete1lqLXhcRL67S4hkmGg4CR87Ok/eP2g2qtJ2ojTjLX0JYwtykbbS7QCCKOTbwYNHrHqi1PiHs6kihDLcxyThrVZYNDLyjduI4vtMnWNTAHYbZPhg1u1fY/wByjWVLlZ15zW74jMZjuUUsVwWOoYDb7dB50VtA7CvFe2iDiiX1vl1EKxSAryy4Lu7hc504JRgfNRRGDjfBIXN3BFIZzqIj0uoVnBDYySkfUglS2ATpArzZKsIabYhNzCV1dvNK80hy8jM7Y6ZY5wPIDoPQV0iNUozVuI05MIwGiduaEwNRC3aswBiBquxNQuF6uo+1TY6ON52ltoZRC7EucDSiM5BPTIUHc+XWp8X7VWlsSskhLj7iLqPyJJAz9dq88u5pI7m8lRlZ8mPX+aJeun9IKpXbzNZK4mLHJJP1rrlp4whvfPwLGbbo9F4p7TiQRbRhD+fKvMPphQ2lfqGrGcW7W31wNMs7kD7owi/2UAGfXFBGaoVzrI19vBbYn2SdyepJqNKlStt8sZKhUlOKVNShDsXaCVokt5XZoo/gUacptgYONxjwPTwxXCW7Tl6V16vMhQunx8SSelC1NTzXRHVZIx2p8Enii3ZIGj3Ce0Rii5bIjlSOWzgsETcsmAwBGSCMg471Z+mzUYunY7VqjRX3aq7kUxmTSjdUiAij+RRMAj50Cdyetcs1IGjLJKSrwZRSLXDrQyyrGM7ncj7qDdm+gBNEbrGo4GBnYdcL4DPoKsdmE0xzS+emMeoOXf8ADEf41VnO5o1UbFu3RXakiEnFI0U7O8PM0uPKlirYz4Rv+xvDuXBnPxE5x6YH+fnT1oeCWQWPR65H1pUJ1YFdHzwKUnwn5GnFOVyMUhQ+pradA0bn8rH7vAh8obkWzOPryT+FAuxvB3eymjAHLurrifNyQMhmkgXb73wV5KfaLf8AOWbEOVa3bTofQTbJIiZGvO4lJO+5VemDnn/27vOdaz6YQ1o07RAI+ktckmUyDXk5yehFJtYbQf4Zw+S94P7lcxFJ7WBr6xkYD7WyODLHnPTJGM46p+ackbPp2Y/Wn/3sNZY+0O+Ns1riABo5IhKIjz0t5Tl4Y5NXdTYDpnCjfIBqjF2ruV9xwIv+7yxg7rbl2Vjze93t0HTTRpgtHonC7iwbivGNMUiQrZXi3S6yzSSidveJEOo6Qy9BtjHQVa7VGQ/03GAF5a8JihwcfZ8zVHufHU7b/wAqwfEfaFeTGQtFaqZbee2cxxOpMVxp5jflDl+6ME5xk7HNdLf2jX6ztcabdi8UULo8TNG6wljE7LrzzAWO4IHpRpmtBnjsFzHwS4S7YtOvFV5jM+slvc4yMv490rWpvuESf9nDEwHLHDrebGe8LhHNxINPljG/zrz2z9oV6iyq8drOJp2uH58Jk+2KqndAcAAKgAGNvOq8vbG6ed7hlh1SWhsWXQ+j3RsZAGvIbbrnG52o0wWjVcY4fcXdrFOYmj4nw97eCRcLzJI5GX3WUfp6mH+P0qn2/tkmji4qE5UkkjWt1F+ZfwghsehEbf2V8SaHXvtC4hLGsbGJSrQu0qR6ZZXgYNEZWyQ2GUHYDp5bVw7R9r7m+VElWFEV2k0wxlA8zDBkfLElsE7/AKRopMVtAdDXdDVdTXZDVLJstxmrMZqkhqzG1EUIQtV+B6ExvVuKSsAMxS1HifGI7eMSSasFgvdAJyQT0JGwA3+nnVFZ8VkOP8U58qr3uWowAR3tT41EgeOwH0FPHG5Jy8IyfNHPjE2E26yM8p/+Q93P7AT+0azxNF+0rATug2CsQPGgxrp1svdtXjj/AGbCuL+RjUac01cB0D01KlWCKlSpVjD1IGoU4oGJ01KrNjZtKSAQAN2Y9AOnzJ9B/DJBAV0Uk4AyT4DrRnh/CYyAZZCM/cRcsP1nbAX6BvpU4oFjBC536sepHlt0Hp/Gulu3erLsVsKzSKE0KAqqMADoP5k+JO5oFKaIzttQyQ1fL0hIdnM1tvZ9b5Jbz/mf5ViDWp7GX2htOahHspLo9XgGBSqvY3WRSrcmR88CpoRkZGRkZGcZHiM+HzqFOT40g4e/pDhv9Xy/39v+TT/0hw7+r5f783/JqqeBTYbdCUJUqC+eaqPI0Y7mCwWNjnOnbZjXe47NXMbmJ9AcK7aCxy0aIHZgSukDfHeIOfDG9Ax0HEOHf1fJ/fm/5NUuI3Fu5XkQNCBnUGnM+onGMEounG/nnPpVm/7OzwhyzRkoCSqsxbAXW3VQNl36/LJ2qw3ZS4EqRaodUkohXvnTzCCdyV2UYOTjwrAAgqQrSt2DvlB18pNKcxgzvlY9LtlsIR/6TrgZOV6YIJpnsxdBLh8KRbSPHIAWLF4yofQAu4GtTk4znbO4prBQJFSFaGDsTeNFHMvK0SoHT7TBZTEZh1Gx0huvijDwro/Ya9EyQfZM8jBQFdiFJiabvkoMDQhO2fCtaBRnlrotFJuy90nJ1qq89WdNySAscchDqASrfaounGSxwOozPhPZq5nUuihQHEff1KTIXWMAAKc991XPQHOSACQbBQNU11U0Ym7IXaJzMRspCkaX66mjQAZAB70oGRsCG32p37LXClgWiOldRwzdNWgd3RqGWDqCQBlG3AwSdyBTBitXZGosvY+71Bfs8lxGO828pkeNl+HbSyNknAOO6WoVd27RSNE+NSHS2OgYdRnxwdvLbbI3opgaO6PXeOSh6vXRZKItBSByWAGc52xuc1kSQkrHfJRtJHXWdtj54zWksbl1kRo11uGXSucBmJwAT4Dfc+WaoX6cgB9UbSa9KlkU4Cg5KD7oySM9TjrtXp6NbsbXw0yM+JJmUlbIB/H0rianK2ST0z4DpXM152SVyOqK4FSpqepjCpqemrBFSpUqBhU9NSrGJCtDawBIk2wzKHb11ZZP8BXbzJoLYwh3AIyM5bfHcHUA+vT60cmlLEsepJJ+Z8hRFZzc1BG3pO1QU70F2AsyPVN67uartVsjFgQNWOH3BRsiqxpgainRU9O4FxltG9Kspw28wuPSlXbHEpKznc64MhUhUTSBrj9Nl9yLK3kw6SyDChRiRxhB0Ub/AAjwHQUhcyadGt9P5uptPTT8OcdDj5bVXBqybSQDJRgPPScVlik+gOaRKS7lZSrSyMpxlWdmU4ORkE4ODvTtdyk6jI5bOdRdi2cYznOc42qvU1rbGbci0nEJx0mlGDkYlcYOnSSMHY6QF+W3Sn9/nyTzpctp1HmPlivw6jnfHhnp4VUFSFIEsrdy4C8x9IGAutsAYIwBnAGCR9T512biNwwKmeUgjBBlcgqM4BBO43O3qapiiPCeEzXDhIkLbgEgbLk4yx8BTJWA5rdy6tXMfVknVrbOSoUnOc5Kqo+SgeFdFuZl25kgxq++wxr+Px+94+fjW44bbcNsCDdypK6g9yNBJuR0JO2f50VuuP8AZ2Q95FyRueUwwfUgdapLFKNWhVJPyeZtdSsMNI5GNOC7Eadu7gnp3V2/RHlU/fJdRcyPqYaWbW2pkIA0sc5IwAMHyr1CPsRw28QvZzAZxgglsHyZSdqy3FPZ/ewltKiQLv3SASP1T/wqdroamZ1b6XOebJkhRnW2SEOUHXop6eXhUDKSckknbcnJwBgdfQAfSrcPArlhqETBcA5YaVwemCeoqrdWzxtpcFTgHB64O4/dvRFEHror1V1VNWrGClrcGNHlUZbGhc5whYEvIceCqD9WFZvj1yGkAXOlQAM9em5PqSSfrRe54iiW5iKnLlwW6YyuwHnjCny7x8cYyrHz/wAmu9z9PAoruRJR3Tv4Imo05qJrgZ0IQqVMKegEamp6VEw1KlSoGFSpU9YwW4Ac81dsmPUPPKOucfslz9KsM1UOBSAXEeejMYyfJZQYmP0Dk/SrjA9CMEbH0PjWYrIsaiDRiy7M3kyCSOBirdG2APqMkZHrUOJdnLu33lhdR+dglfqw2FBdmBpNcmNSaoMapNgiQNRpzUamOEYH2pVwibanruxz9qOeceQz287IzWUztp+waQiJx0wRrCYznYbZ8dJrJivavaLeauEtzSHfmoqlc6UO57p8dgw+teLZxvXEkr5Oh2jqkmjw3/hRCDtJdIQRJ0OQCARQcmmqr1EkqhwhPST5fZqOFTQXk5juMRNKcLIowqyHYZHkTVLj3BpbSdoJeq9COjIejD0P86ERHevUO3EYuuHWd71cARuR5EeP7S/4qmt2SaXllKUYNrwea1NEJyQOnX0FXV4eDRLgvCczJ8RAOWAOCUG7D6ivSf0jOlbaOT+Lx3Ra4fwCBLdLq7l0KxJWIflZIx8JUeAJzucbfOuPFe2MhQw26iCLBGlNiQfzm6mqHHpmd2d2yzHOPBR5D0HQD0oFO3eOOlHJjWljx2CMvVf4GeUnqahqNRpV5UpuTtnWkl0Gez/aCe0k1xMR5jwI9a3HEPa9dsiBY40YdWIL6/TB6D6/hXl1OzE0Ew0eu9mvadPNOkcsURV2SMRIh1EuSNasSQMHGx8D6V6HcdnrO61OVAdTjIJHTG2R8hXh3svs0e/WSQgJErSEk4Gr4EGfPLg/SvXeIdp7e32j6Ektvtv1watDDkm/ahJZIJe48x7YcLeG5cs6vrLMGTYYzjBGAAR0wPKgAaiHHeMh2Y+BZmx4ZY7nFBbWcM9enPQ40oxv3M4o5pu5VwdOJ2rtI3kXZh+qxJU/gRQuaEr1rX8SuY9C46gYJ9AMD9230rMXEoJquq0uOMFb5NhzSk/wUTXV7V1UOykBs6c7ZwFOR6YdTn1q1YWYkkAY4QbuR1CDqB+keg9TRztCGe0imIA+3mUYGMLy4CF+QwAM9BXjvG06OxSMpilUjTUg5GlTmmoGGpUqVYwqVKlWMPXq/s74Al5P76w1RjDMu3+ln41OT0z3x6OvrXk9GeBcTkRZYBIyJKuSQxAEkeSjNj7p3U/rZ8BW7Az3jtHxuyRCzzOojbRpgIysmOh88fhVPiN3cukUlpNCyMm8crZkkYKWwpA2Y4x4YxnFeCNcsfE13sOJSRSLIpwykEHyI6U0pLpMCj8m37d8HjCpeQjSsuzpjBSXqcr4eOR5j1rFGtz2v4t79bpeR504CzoCNMU+2kacDY74bfNYVqW7QaocgVBhT0xrGO8XSlUYW2pqrGVIVoPce7Qe9S8onRbBgVQKO6QuM7ddyfxrMXQGcDpTmlUk/A7XkrU4qT4pqVqnQU7HWvXuyluW4FcxyKQFLlfQgBhj615GYyMHzr1DsTx1Dw+e1eUo+lijP8OMdAfP09aydO0Ug1zfwYL3hhtW19n8UhcyyRMYWR05oBOg4328R4dOv1rDOe99a9h7D30ctqkCgKuGjfGMmVwfD5HPrv5V2rW5mqlJ0cjwQu0jxzjIHOfB1DUcHplc7HHhtQ9qJcWtijkdcEjP6pI/4UPZa2rT3tvybDW1HPFLFSxUS1cNFyNTgjLEAVEmjnZ+3HxN/kV16LT+vlUfHkjny+nCwxwOwWNdbdB++q3GuKFid9qfi3ENsDYDoKzc8xNe/qc0NPHau/8AB52LG8j3M5zykmoRyEHIqBNRr5qWaTnuvk9VQVUWpLtjsTXAtUKetPPObuTNGCXRYt5yprST3xltYISBhHnIP6wizn5Y/fWTq3ZXOk7/AOf84rp0eVLIt/RLLDjghOmCa5VYuGyciq5qWeKU3XQ8HxyI01KlURxqVPSoGGpUqVYwjXW2j1MEzjUcDy1H4QfrgZ8M1yNJSfDY+fkfOsEmKVXLqPL6gNnAceQ1jJH0bK/SqjDFLRgjwm7ZVli+7Im4ztlDrU/uP41zqtaDLgeZx+NWaKMMajU6Y1rNQyNSpqVbcai1oHlSdBg7UqVWiuSbBjdajSpVKf3MePQXsUBUZFFrzaMIMac5xgdcUqVViuEIwdyx5UV4PIyCVkJUiLUCCQQwkjwfmMn8aVKrY0tyJyfDKHG2JCk79R9ATigj09Ku76n3/QjpOjnXFqelXis7kMtaC1OEGPKlSr2fo/3SOPWdIo3jGh70qVS+o/ePg6OZpqVKvJOoVPSpVjCpClSpl2Bl+zGRvXC5GDSpV62dL+Gizlh/MZxpGnpV5Z0kaVKlQMKlSpVjCNNSpVmFBSE5gX0Z1HovdbH4ux+tVZ+ppUqz6AiNr8a/rL/EVduB3j8z/GlSrLo3khTGlSpQkKVKlWCf/9k=",
        registrationLink: "#",
        attendees: Array(18).fill({}),
        capacity: 25,
        reminders: []
      },
    
      // Past Events (for demonstration)
      {
        id: 19,
        title: "Winter Career Fair",
        date: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0],
        time: "10:00 AM",
        location: "Student Union",
        description: "Annual winter career fair connecting students with potential employers.",
        category: "business",
        image: "https://source.unsplash.com/random/800x400/?career-fair",
        registrationLink: "#",
        attendees: Array(320).fill({}),
        capacity: 400,
        reminders: []
      },
      {
        id: 20,
        title: "Fall Music Festival",
        date: new Date(Date.now() - 45 * 86400000).toISOString().split('T')[0],
        time: "05:00 PM",
        location: "Central Lawn",
        description: "Day-long music festival featuring student bands and local artists.",
        category: "music",
        image: "https://source.unsplash.com/random/800x400/?music-festival",
        registrationLink: "#",
        attendees: Array(500).fill({}),
        capacity: 600,
        reminders: []
      }
    ];
    setEvents(sampleEvents);
    setIsLoading(false);

    // Clear notifications timeout on unmount
    return () => {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
    };
  }, []);

  // Filter events
  const getFilteredEvents = () => {
    return events.filter(event => {
      const matchesTab = activeTab === 'upcoming' 
        ? new Date(event.date) >= new Date()
        : new Date(event.date) < new Date();
      
      const matchesCategory = selectedCategory === 'all' 
        ? true 
        : event.category === selectedCategory;
      
      const matchesSearch = searchTerm === '' 
        ? true 
        : event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTab && matchesCategory && matchesSearch;
    });
  };

  // Add notification with auto-dismiss
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const newNotification = {
      id,
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-dismiss after 5 seconds
    notificationTimeout.current = setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Schedule reminder for an event
  const scheduleReminder = (eventId, eventDate, eventTitle) => {
    const reminderTime = new Date(eventDate);
    reminderTime.setDate(reminderTime.getDate() - 1); // 1 day before event
    
    const now = new Date();
    const timeUntilReminder = reminderTime - now;
    
    if (timeUntilReminder > 0) {
      setTimeout(() => {
        addNotification(`Reminder: ${eventTitle} is happening tomorrow!`, 'reminder');
      }, timeUntilReminder);
    }
  };

  // Handle event registration
  const handleRegister = (eventId) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId && event.attendees.length < event.capacity) {
          const updatedEvent = {
            ...event,
            attendees: [...event.attendees, { id: Date.now(), name: "You" }]
          };
          
          // Add notification
          addNotification(`Successfully registered for ${event.title}`, 'success');
          
          // Schedule reminder
          scheduleReminder(event.id, event.date, event.title);
          
          return updatedEvent;
        }
        return event;
      })
    );
  };

  // Handle event creation
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const event = {
      ...newEvent,
      id: events.length + 1,
      registrationLink: "#",
      attendees: [],
      reminders: []
    };
    setEvents([...events, event]);
    setShowEventForm(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'business',
      image: '',
      capacity: 50
    });
    addNotification(`Event "${event.title}" created successfully!`, 'success');
  };

  // Calendar navigation
  const navigateCalendar = (action) => {
    switch (action) {
      case 'PREV':
        setCalendarDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)));
        break;
      case 'NEXT':
        setCalendarDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)));
        break;
      case 'TODAY':
        setCalendarDate(new Date());
        break;
      default:
        break;
    }
  };

  // Format calendar events
  const calendarEvents = events.map(event => ({
    title: event.title,
    start: new Date(`${event.date}T${convertTo24Hour(event.time)}`),
    end: new Date(`${event.date}T${convertTo24Hour(event.time)}`),
    allDay: false,
    resource: event
  }));

  // Get filtered events
  const filteredEvents = getFilteredEvents();

  return (
    <>
    <Navbar1/>
    <div className="event-calendar-container">
      {/* Notification center */}
      <div className="notification-center">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
              className="close-notification"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <h2 className="section-title">Your Campus Adventure Awaits </h2>
      
      {/* Action buttons */}
      <div className="action-buttons">
        <button onClick={() => setShowEventForm(true)} className="create-event-btn">
          Create New Event
        </button>
        <button onClick={() => setCalendarView(!calendarView)} className="toggle-view-btn">
          {calendarView ? 'Show List View' : 'Show Calendar View'}
        </button>
      </div>

      {/* Calendar view with navigation */}
      {calendarView && (
        <div className="calendar-container">
          <div className="calendar-navigation">
            <button onClick={() => navigateCalendar('PREV')}>&lt; Previous</button>
            <button onClick={() => navigateCalendar('TODAY')}>Today</button>
            <button onClick={() => navigateCalendar('NEXT')}>Next &gt;</button>
          </div>
          <div className="calendar-view">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={(event) => setSelectedEvent(event.resource)}
              style={{ height: 600 }}
              date={calendarDate}
              onNavigate={(date) => setCalendarDate(date)}
              views={['month', 'week', 'day']}
              defaultView="month"
            />
          </div>
        </div>
      )}

      {/* List view */}
      {!calendarView && (
        <>
          {/* Search and filter section */}
          <div className="search-filter-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Find events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="search-icon">🔍</i>
            </div>
            
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Events
              </button>
              <button 
                className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past Events
              </button>
            </div>
          </div>
          
          <div className="category-browser">
            <h3>Browse By Category</h3>
            <div className="category-tags">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-tag ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="loading-animation">
              <div className="spinner"></div>
              <p>Loading events...</p>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onRegister={handleRegister}
                    isPast={new Date(event.date) < new Date()}
                  />
                ))
              ) : (
                <div className="no-events">
                  <p>No events found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Event creation form */}
      {showEventForm && (
        <EventForm 
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          categories={categories}
          onSubmit={handleCreateEvent}
          onClose={() => setShowEventForm(false)}
        />
      )}

      {/* Event details modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={handleRegister}
        />
      )}
    </div>
    </>
  );
};

// Component for Event Card
const EventCard = ({ event, onRegister, isPast }) => {
  return (
    <div className={`event-card ${event.category}`}>
      <div className="event-date">
        <span className="day">{new Date(event.date).getDate()}</span>
        <span className="month">
          {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
        </span>
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-time-location">
          {event.time} • {event.location}
        </p>
        <div className="event-footer">
          <span className={`event-category ${event.category}`}>
            {event.category.toUpperCase()}
          </span>
          <button 
            className="register-btn"
            onClick={() => onRegister(event.id)}
            disabled={event.attendees.length >= event.capacity || isPast}
          >
            {isPast ? 'Completed' : 
             event.attendees.length >= event.capacity ? 'Full' : 'Register'}
          </button>
        </div>
        <div className="attendee-count">
          {event.attendees.length}/{event.capacity} attendees
        </div>
      </div>
    </div>
  );
};

// Component for Event Form
const EventForm = ({ newEvent, setNewEvent, categories, onSubmit, onClose }) => {
  return (
    <div className="event-form-overlay" onClick={onClose}>
      <div className="event-form-modal" onClick={e => e.stopPropagation()}>
        <h3>Create New Event</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
              >
                {categories.filter(c => c.id !== 'all').map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                value={newEvent.capacity}
                onChange={(e) => setNewEvent({...newEvent, capacity: parseInt(e.target.value)})}
                min="1"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={newEvent.image}
              onChange={(e) => setNewEvent({...newEvent, image: e.target.value})}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Create Event</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component for Event Modal
const EventModal = ({ event, onClose, onRegister }) => {
  const isPast = new Date(event.date) < new Date();
  
  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <h2>{event.title}</h2>
          <p className="event-meta">
            {new Date(event.date).toLocaleDateString(undefined, { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • {event.time} • {event.location}
          </p>
        </div>
        <div className="modal-content">
          <div className="modal-image">
            <img 
              src={event.image} 
              alt={event.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Event+Image';
              }}
            />
          </div>
          <div className="modal-details">
            <p>{event.description}</p>
            <div className="event-registration">
              <div className="attendee-count">
                {event.attendees.length}/{event.capacity} attendees registered
              </div>
              <button 
                className="register-btn"
                onClick={() => {
                  onRegister(event.id);
                  onClose();
                }}
                disabled={event.attendees.length >= event.capacity || isPast}
              >
                {isPast ? 'Event Completed' : 
                 event.attendees.length >= event.capacity ? 'Event Full' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;