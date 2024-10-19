document.addEventListener('DOMContentLoaded', function () { 
    const loginForm = document.getElementById('login-form');
    const branchYearPage = document.getElementById('branch-year-page');
    const subjectFacultyPage = document.getElementById('subject-faculty-page');
    const subjectListDiv = document.getElementById('subject-list');
    const facultyFeedbackDiv = document.getElementById('faculty-feedback');
    const backButton = document.getElementById('back-button');
    
    let currentStep = 0; // Track which step the user is on
    
    // Simulating student login
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const regNumber = document.getElementById('regNumber').value;
        const password = document.getElementById('password').value;
        if (regNumber && password) {
            document.getElementById('login-page').style.display = 'none';
            branchYearPage.style.display = 'block';
            currentStep = 1;
            backButton.style.display = 'block';
        } else {
            alert('Please enter valid credentials.');
        }
    });

    // Branch and year selection
    document.getElementById('select-branch-year').addEventListener('click', function () {
        const branch = document.getElementById('branch').value;
        const year = document.getElementById('year').value;
        if (branch && year) {
            branchYearPage.style.display = 'none';
            subjectFacultyPage.style.display = 'block';
            currentStep = 2;
            populateSubjects(branch, year);
            populateFacultyFeedback(branch, year);
        } else {
            alert('Please select both branch and year.');
        }
    });

    // Populate subjects based on branch and year
    function populateSubjects(branch, year) {
        let subjects = [];

        // Define subjects and labs based on branch and year
        if (branch === 'CSE' && year === '1') {
            subjects = [
                { name: 'Subject 1', options: ['Linear Algebra', 'Probability and Statistics', 'Calculus', 'Differential Equations'] },
                { name: 'Subject 2', options: ['Engineering Physics', 'Mechanics', 'Material Science', 'Optics'] },
                { name: 'Lab 1', options: ['Physics Lab', 'Basic Electrical Lab'] },
                { name: 'Lab 2', options: ['Computer Programming Lab', 'C++ Programming Lab'] }
            ];
        }
        // Similarly, define for other branches and years
        // Add your additional branch and year combinations here

        // Clear previous content and populate new subject options
        subjectListDiv.innerHTML = '';
        subjects.forEach(subject => {
            const subjectDiv = document.createElement('div');
            subjectDiv.innerHTML = `<label>${subject.name}</label>`;
            const select = document.createElement('select');
            subject.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });
            subjectDiv.appendChild(select);
            subjectListDiv.appendChild(subjectDiv);
        });
    }

    // Populate faculty feedback and rating
    function populateFacultyFeedback(branch, year) {
        facultyFeedbackDiv.innerHTML = '';
        const faculties = ['Dr. Smith', 'Prof. Johnson', 'Dr. Williams']; // Example faculty

        faculties.forEach(faculty => {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.innerHTML = `
                <label for="${faculty}-feedback">Feedback for ${faculty}</label>
                <textarea id="${faculty}-feedback" placeholder="Enter feedback for ${faculty}"></textarea>
                <label for="${faculty}-rating">Rating for ${faculty}</label>
                <select id="${faculty}-rating">
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                </select>
            `;
            facultyFeedbackDiv.appendChild(feedbackDiv);
        });
    }

    // Back button functionality
    backButton.addEventListener('click', function () {
        if (currentStep === 2) {
            subjectFacultyPage.style.display = 'none';
            branchYearPage.style.display = 'block';
            currentStep = 1;
        } else if (currentStep === 1) {
            branchYearPage.style.display = 'none';
            document.getElementById('login-page').style.display = 'block';
            backButton.style.display = 'none';
            currentStep = 0;
        }
    });

    // Submit subject and faculty selection
    document.getElementById('submit-selection').addEventListener('click', function () {
        const regNumber = document.getElementById('regNumber').value;
        const branch = document.getElementById('branch').value;
        const year = document.getElementById('year').value;
        const subjects = Array.from(document.querySelectorAll('#subject-list select')).map(select => select.value);
        const feedback = Array.from(document.querySelectorAll('#faculty-feedback textarea')).map(textarea => textarea.value);
        const ratings = Array.from(document.querySelectorAll('#faculty-feedback select')).map(select => select.value);

        // Data object to send to the server
        const data = {
            regNumber: regNumber,
            branch: branch,
            year: year,
            subjects: subjects,
            feedback: feedback,
            ratings: ratings
        };

        // Send data to the server
        fetch('http://localhost:3000/submit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            alert('Selection and feedback submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
