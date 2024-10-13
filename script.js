const Form = document.querySelector('form');
const DateInput = document.querySelector('#birth-input');
const DateError = document.querySelector('#date-error');

// Let's get the boxes
const YearsBox = document.querySelector('.years');
const MonthsBox = document.querySelector('.months');
const DaysBox = document.querySelector('.days');

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!DateInput.value) {
        DateInput.classList.add('invalid');
        DateError.style.display = 'inline';
        alert(DateError.textContent);
    } 
    else {

        const BirthDate = new Date(DateInput.value);
        const CurrentDate = new Date();


        if (BirthDate > CurrentDate) {
            DateInput.classList.add('invalid');
            DateError.textContent = 'The selected date cannot be in the future.';
            DateError.style.display = 'inline';
        }
        else
        {

            DateInput.classList.remove('invalid');
            DateError.style.display = 'none';


            // Calculate the difference in years, months, and days
            let ageYears = CurrentDate.getFullYear() - BirthDate.getFullYear();
            let ageMonths = CurrentDate.getMonth() - BirthDate.getMonth();
            let ageDays = CurrentDate.getDate() - BirthDate.getDate();

            // Adjust months and years if the birth date is later in the year than the current date
            if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
                ageYears--;
                ageMonths += 12;
            }

            // Adjust days if necessary
            if (ageDays < 0) {
                const lastMonth = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 0); // Last day of the previous month
                ageDays += lastMonth.getDate();
                ageMonths--;
            }

            // Updating the DOM (The content of the boxes)
            YearsBox.textContent = ageYears;
            MonthsBox.textContent = ageMonths;
            DaysBox.textContent = ageDays;
        }

    }
});
