const units = ['days', 'hours', 'minutes', 'seconds'];

const countdown = document.getElementById('countdown');

setTimer();
setInterval(setTimer, 1000);



/**
 * Dirty function
 */

function setTimer() {
    // const pathString = window.location.hash.split('#')[1];
    const pathString = window.location.pathname.split('/')[1];

    let times;
    try {
        times = getTimeObject(pathString);
    } catch (error) {
        console.error(error);
        const message = `Couldn't parse time string :(`;
        const errElem = createElem('p', message, 'error__message');

        countdown.innerHTML = '';
        countdown.appendChild(errElem);
        return;
    }
    const elems = units.map(unit => {
        return createTimeElem(times[unit], unit);
    });

    countdown.innerHTML = '';
    elems.forEach(elem => {
        countdown.appendChild(elem);
    });
}


/**
 * Semi-pure functions
 */

function getTimeObject(pathString) {
    const now = moment();
    const target = moment(pathString);
    if (!target.isValid()) {
        throw new Error('Error parsing path string');
    }
    const diff = target.diff(now);
    const timeLeft = moment.duration(diff);

    const days = Math.floor(timeLeft.asDays());
    const hours = timeLeft.hours();
    const minutes = timeLeft.minutes();
    const seconds = timeLeft.seconds();
    return { days, hours, minutes, seconds };
}

function createElem(tag, innerHTML, className) {
    const elem = document.createElement(tag);
    elem.innerHTML = innerHTML !== undefined ? innerHTML : '';
    elem.setAttribute('class', className || '');
    return elem;
}

function createTimeElem(num, unit) {
    const container = createElem('div', null, 'countdown__item');
    const numChild = createElem('p', num, 'countdown__number');
    const unitChild = createElem('p', unit, 'countdown__unit');

    container.appendChild(numChild);
    container.appendChild(unitChild);

    return container;
}
