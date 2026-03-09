const today = new Date(); // ohne Parameter: aktuelles Datum und Uhrzeit
const day = today.getDate(); // 1-31
const month = today.getMonth(); // 0-11
let currentMonth = month;
const year = today.getFullYear();
let currentYear = year;

//----------------------------------------------------------------------------------------------------------------------//

function dayClickEvents() {
  const td = document.querySelectorAll("td");
  for (let i = 0; i < td.length; i++) {
    td[i].onclick = () => {
      if (td[i].textContent !== "") {
        //nur Tage mit Zahlen
        for (el of td) {
          el.classList.remove("selected"); //beim Klick auf einen anderen Tag wird die letzte Markierung entfernt
        }
        td[i].classList.add("selected");
        const daySelected = td[i].textContent;
        const selectedDate = new Date(currentYear, currentMonth, daySelected);

        renderInfo(selectedDate);
      }
    };
  }
}

//----------------------------------------------------------------------------------------------------------------------//

function renderInfo(dateObj) {
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const counterDay = ["erste", "zweite", "dritte", "vierte", "fünfte"];

  // Heutiges Datum ausgeschrieben
  const date = dateObj.toLocaleDateString("de-DE", {
    // locales, options
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let dateClass = document.querySelectorAll(".date");
  for (const el of dateClass) {
    el.textContent = date;
  }

  // Heutiger Wochentag ausgeschrieben
  let weekdayClass = document.querySelectorAll(".weekday");
  for (const el of weekdayClass) {
    el.textContent = dateObj.toLocaleDateString("de-DE", {
      weekday: "long",
    });
  }

  // der wievielte Wochentag
  let counter = document.querySelector("#counter");
  counter.textContent = counterDay[Math.ceil(day / 7) - 1];

  let month1 = document.querySelectorAll(".month1");
  for (el of month1) {
    el.textContent = dateObj.toLocaleDateString("de-DE", {
      month: "long",
    });
  }
  let year1 = document.querySelectorAll("#year1");
  for (el of year1) {
    el.textContent = dateObj.toLocaleDateString("de-DE", {
      year: "numeric",
    });
  }

  // der wievielte Tag des Jahres
  const startOfYear = new Date(year, 0, 1);
  const diff = dateObj - startOfYear; // Differenz in Millisekunden
  const oneDay = 24 * 60 * 60 * 1000;
  const dayOfYear = Math.ceil(diff / oneDay) + 1; // + 1 damit 1.Januar = Tag 1 ist
  document.querySelector("#dayOfYear").textContent = dayOfYear;

  // wieviele Tage noch zum Jahresende
  let daysInYear = (new Date(year + 1, 0, 1) - new Date(year, 0, 1)) / oneDay;
  let daysLeft = daysInYear - dayOfYear + 1; //Starttag wird mitgezählt
  document.querySelector("#daysLeft").textContent = daysLeft;

  // wieviele Tage im Monat
  document.querySelector("#daysInMonth").textContent = new Date(
    year,
    month + 1,
    0,
  ).getDate();
}
//----------------------------------------------------------------------------------------------------------------------//
function renderMonth(currentYear, currentMonth) {
  const td = document.querySelectorAll("td");
  // zuerst alles leeren
  for (let i = 0; i < td.length; i++) {
    td[i].textContent = "";
    td[i].classList.remove("today", "weekend");
  }

  let startWeekDay = new Date(currentYear, currentMonth, 1).getDay(); // 0-6
  startWeekDay = startWeekDay === 0 ? 6 : startWeekDay - 1; //jetzt startet eine Woche mit Montag
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let day = 0; day < startWeekDay; day++) {
    td[day].textContent = ""; // leere Tage vom Vormonat
  }
  for (let i = 1; i <= daysInMonth; i++) {
    let index = startWeekDay + i - 1;
    let day = td[index];
    day.textContent = i;

    if (
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      day.classList.add("today"); //heutigen Tag markieren
    } else if (index % 7 === 5 || index % 7 === 6) {
      day.classList.add("weekend"); // Wochenende
    }
    // hide empty row
    const trs = document.querySelectorAll("tr");
    const lastTr = trs[trs.length - 1];
    const tds = lastTr.querySelectorAll("td");
  }

  //calendar-header anpassen
  let monthId = document.querySelector("#month");
  monthId.textContent = new Date(currentYear, currentMonth, 1).toLocaleString(
    "de-DE",
    { month: "long" },
  );

  let yearId = document.querySelector("#year");
  yearId.textContent = new Date(currentYear, currentMonth, 1).toLocaleString(
    "de-DE",
    { year: "numeric" },
  );
}

//----------------------------------------------------------------------------------------------------------------------//

function renderCalendar() {
  renderMonth(currentYear, currentMonth);

  //Events
  prevMonth = document.querySelector("#prevMonth");
  prevMonth.onclick = () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderMonth(currentYear, currentMonth);
    const td = document.querySelectorAll("td");
    for (el of td) {
          el.classList.remove("selected"); //die letzte Markierung entfernt
        }
  };

  nextMonth = document.querySelector("#nextMonth");
  nextMonth.onclick = () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderMonth(currentYear, currentMonth);
    const td = document.querySelectorAll("td");
    for (el of td) {
          el.classList.remove("selected"); //die letzte Markierung entfernt
        }
  };
  dayClickEvents();
  //----------------------------------------------------------------------------------------------------------------------//
}
renderInfo(new Date());
renderCalendar();
