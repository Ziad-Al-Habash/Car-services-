// JavaScript for Ziad Al Habash Website

document.addEventListener('DOMContentLoaded', () => {

    // --- Experience Counter ---

    const experienceYearsElement = document.getElementById('experience-years');

    if (experienceYearsElement) {

        const startYear = 1996; // assumed start year based on "> 28 years" from 2025

        const currentYear = new Date().getFullYear();

        const yearsOfExperience = currentYear - startYear;

        experienceYearsElement.textContent = `${yearsOfExperience}`; // Display the calculated years number only

         // The text "خبرة تتجاوز [الرقم] عاماً" is in the HTML

    }

    // --- Smooth Scrolling for Navigation ---

    document.querySelectorAll('.sticky-nav a').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            // For links that are just '#', prevent default but don't scroll

            if (this.getAttribute('href') === '#') {

                 e.preventDefault();

                 return;

            }

            // Check if the link is an internal anchor link

            if (this.getAttribute('href').startsWith('#')) {

                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);

                const targetElement = document.getElementById(targetId);

                if (targetElement) {

                    // Calculate the offset considering the fixed header and nav height

                    const headerHeight = document.querySelector('header').offsetHeight;

                    const navHeight = document.querySelector('.sticky-nav').offsetHeight;

                    const totalOffset = navHeight; // Only consider nav height for scrolling offset as header is often above the target section

                    // Use getBoundingClientRect().top relative to the viewport

                    // Add window.pageYOffset to get the position relative to the document

                    // Subtract the total offset for fixed elements

                    const elementPosition = targetElement.getBoundingClientRect().top;

                    const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

                    window.scrollTo({

                        top: offsetPosition,

                        behavior: 'smooth'

                    });

                }

            }

            // Allow external links or other types of links to behave normally

        });

    });

     // --- Adjust body padding-top based on fixed nav height ---

     const stickyNav = document.querySelector('.sticky-nav');

     const body = document.body;

     const adjustBodyPadding = () => {

         body.style.paddingTop = stickyNav.offsetHeight + 'px';

     };

     // Adjust on load and on window resize

     adjustBodyPadding();

     window.addEventListener('resize', adjustBodyPadding);

    // --- Dynamic Working Hours ---

    const currentStatusElement = document.getElementById('current-status');

    const checkWorkStatus = () => {

        // Get current time in Syria timezone (UTC+3)

        const now = new Date();

        const options = {

            hour: 'numeric',

            minute: 'numeric',

            hour12: false, // Use 24-hour format for easier comparison

            weekday: 'long', // Get the day name

            timeZone: 'Asia/Damascus' // Specify Syria timezone

        };

        let timeInSyria;

        let dayInSyria;

        try {

             const syriaTimeParts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);

             let hour, minute, weekday;

             syriaTimeParts.forEach(part => {

                 if (part.type === 'hour') hour = parseInt(part.value, 10);

                 if (part.type === 'minute') minute = parseInt(part.value, 10);

                 if (part.type === 'weekday') weekday = part.value;

             });

              if (hour !== undefined && minute !== undefined && weekday !== undefined) {

                  timeInSyria = hour * 60 + minute; // Time in minutes since midnight

                  dayInSyria = weekday;

             } else {

                 throw new Error("Could not parse time parts");

             }

        } catch (error) {

            console.error("Error getting time in Syria timezone:", error);

            currentStatusElement.textContent = 'تعذر تحديد الحالة';

            currentStatusElement.className = 'status-closed';

            return;

        }

        // Define working hours in minutes since midnight (24-hour format)

        const schedule = {

            'Saturday': { start: 9 * 60, end: 18 * 60 },   // 9:00 to 18:00 (6:00 PM)

            'Sunday': { start: 9 * 60, end: 18 * 60 },

            'Monday': { start: 9 * 60, end: 18 * 60 },

            'Tuesday': { start: 9 * 60, end: 18 * 60 },

            'Wednesday': { start: 9 * 60, end: 18 * 60 },

            'Thursday': { start: 9 * 60, end: 18 * 60 },

            'Friday': { start: 8 * 60, end: 12 * 60 }     // 8:00 to 12:00 PM (Noon)

        };

        const currentDaySchedule = schedule[dayInSyria];

        if (currentDaySchedule) {

            if (timeInSyria >= currentDaySchedule.start && timeInSyria < currentDaySchedule.end) {

                currentStatusElement.textContent = 'مفتوح الآن';

                currentStatusElement.className = 'status-open';

            } else {

                currentStatusElement.textContent = 'مغلق الآن';

                currentStatusElement.className = 'status-closed';

            }

        } else {

             currentStatusElement.textContent = 'مغلق';

             currentStatusElement.className = 'status-closed';

        }

    };

    checkWorkStatus();

    setInterval(checkWorkStatus, 60000);

    // --- Scroll Animation ---

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('is-visible');

                // observer.unobserve(entry.target); // Uncomment if you only want the animation to play once

            } else {

                 // Optional: remove class when not visible if you want animation to replay on scroll up/down

                 // entry.target.classList.remove('is-visible');

            }

        });

    }, {

        threshold: 0.1 // Trigger when 10% of the element is visible

    });

    elementsToAnimate.forEach(element => {

        observer.observe(element);

    });

    // --- Contact Form (SurveyHeart Embed) - No JS handling needed for the form itself ---

    // The iframe handles the form submission internally.

    // If you need interaction with the iframe (e.g., resizing), it's more complex

    // and might require communication between the parent window and the iframe content (postMessage API),

    // which is usually not necessary for a simple form embed.

});