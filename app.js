// API endpoint for fetching coding resources
const API_URL = 'https://api.sampleapis.com/codingresources/codingResources';
let requestStatus = 'idle';

// Get references to the elements in the DOM
const courseListElement = document.getElementById('courseList');
const searchInput = document.getElementById('searchInput');
const refreshButton = document.getElementById('refreshButton');
const levelFilter = document.getElementById('levelFilter');
const resultCounter = document.getElementById('resultCounter');

let allCourses = [];

// feature: search functionality
function filterCourses(keyword) {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const normalizedLevelFilter = levelFilter.value.trim().toLowerCase();

    const filteredCourses = allCourses.filter(course => {

        const seaerchInDescription = course.description.toLowerCase().includes(normalizedKeyword);
        const searchInTopics = course.topics.some(topic => topic.toLowerCase().includes(normalizedKeyword));

        let searchInLevels = false;

        if(normalizedLevelFilter === '') {
            searchInLevels = true;
        } else {

            searchInLevels = course.levels.some(level => 
                level.toLowerCase() === normalizedLevelFilter);
        }

        return (seaerchInDescription || searchInTopics) && searchInLevels;
    });

    return filteredCourses;
}

searchInput.addEventListener('input', (e) => {
    updateCourseDisplay();
});

// feature: refresh functionality
refreshButton.addEventListener('click', (e) => {
    loadCourses();
});

// feature: level filter functionality
levelFilter.addEventListener('change', (e) => {
    updateCourseDisplay();
});

function updateCourseDisplay() {
    if (requestStatus !== 'success') {
        return;
    }

    // jika data kosong setelah dinormalisasi, tampilkan pesan kosong
    if (allCourses.length === 0) {
        courseListElement.textContent = showEmpty();
        resultCounter.textContent = `Showing 0 of 0 courses.`;
        return;
    }

    const keyword = searchInput.value.trim();
    const levelFilterValue = levelFilter.value.trim();


    // Jika ada keyword, lakukan filter dan tampilkan hasilnya. Jika tidak ada keyword, tampilkan semua course.
    if (keyword === '' && levelFilterValue  === '') {
        courseListElement.replaceChildren(renderCourses(allCourses));
        resultCounter.textContent = `Showing ${allCourses.length} of ${allCourses.length} courses.`;
        return;
    }


    const filteredCourses = filterCourses(keyword);

    if (filteredCourses.length === 0) {
        courseListElement.textContent = showEmpty(`No courses match your current filters.`);
        resultCounter.textContent = `Showing 0 of ${allCourses.length} courses.`;
    } else {
        courseListElement.replaceChildren(renderCourses(filteredCourses));
        resultCounter.textContent = `Showing ${filteredCourses.length} of ${allCourses.length} courses.`;
    }

}

async function loadCourses() {

    if (requestStatus === 'loading') {
        return;
    }
    
    requestStatus = 'loading';
    refreshButton.disabled = true;
    courseListElement.textContent = showLoading();

    try {
        
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!Array.isArray(data)) {
            throw new Error('Unexpected data format received from API');
        }

        const normalizedData = normalizeCourses(data);

        allCourses = normalizedData;

        requestStatus = 'success';

        updateCourseDisplay();

    } catch (error) {
        requestStatus = 'error';
        courseListElement.textContent = showError(error.message);

        const retryButton = document.createElement('button');
        retryButton.textContent = 'Retry';
        
        retryButton.addEventListener('click', () => {
            loadCourses();
        });

        courseListElement.appendChild(retryButton);
    } finally {
        refreshButton.disabled = false;
    } 

}

function showLoading() {
    return `Loading courses...`;
}

function showError(message) {
    return `Error: ${message}`;
}

function showEmpty(message = 'No courses available.') {
    return message;
}

function normalizeCourses(courses) {
    return courses
        .filter(course =>   course !== null && 
                            typeof course === 'object' &&
                            !Array.isArray(course)
        )
        .map(course => {
            
            const normalizedCourse = {
                description: 
                    typeof course.description === 'string' && 
                    course.description.trim() !== '' ? 
                        course.description.trim() : 'No description available',
                topics: Array.isArray(course.topics) ? 
                    course.topics.filter(topic => 
                        typeof topic === 'string' && topic.trim() !== ''
                    ).map(topic => topic.trim()) : [],
                levels: Array.isArray(course.levels) ? 
                    course.levels.filter(level => 
                        typeof level === 'string' && level.trim() !== ''
                    ).map(level => level.trim()) : [],
                types: Array.isArray(course.types) ? 
                    course.types.filter(type => 
                        typeof type === 'string' && type.trim() !== ''
                    ).map(type => type.trim()) : []
            }
        
            return normalizedCourse;
        });
}

function renderCourses(courses) {
    let courseContainer = document.createElement('div');

    courses.forEach(course => {

        let courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        let courseDescription = document.createElement('h2');
        courseDescription.textContent = course.description;
        let courseTypes = document.createElement('p');
        courseTypes.textContent = 
            course.types.length > 0 ? `Types: ${course.types.join(', ')}` : 'Types: Not specified'
        ;
        let courseTopics = document.createElement('p');
        courseTopics.textContent = 
            course.topics.length > 0 ? `Topics: ${course.topics.join(', ')}` : 'Topics: Not specified';
        let courseLevel = document.createElement('p');
        courseLevel.textContent = 
            course.levels.length > 0 ? `Level: ${course.levels.join(', ')}` : 'Levels: Not specified';

        courseCard.appendChild(courseDescription);
        courseCard.appendChild(courseTypes);
        courseCard.appendChild(courseTopics);
        courseCard.appendChild(courseLevel);
        courseContainer.appendChild(courseCard);
    });

    return courseContainer;
}

loadCourses();