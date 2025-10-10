// SIRF ADMIN LECTURES PERMANENT SAVE
class AdminLecturesPermanent {
    constructor() {
        this.storageKey = 'adminPermaLectures';
        this.init();
    }

    init() {
        console.log('💾 Admin Lectures Permanent Save Loaded');
        this.monitorAdminActions();
        this.autoRestoreLectures();
    }

    // ADMIN ACTIONS MONITOR KAREGA
    monitorAdminActions() {
        // Form submit monitor karega
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                setTimeout(() => {
                    this.captureAndSaveLecture(e.target);
                }, 1000);
            }
        });

        // "Add Lecture" button monitor karega
        document.addEventListener('click', (e) => {
            if (e.target.matches('button') && 
                (e.target.textContent.includes('Add') || 
                 e.target.textContent.includes('Save') ||
                 e.target.textContent.includes('Submit'))) {
                setTimeout(() => {
                    this.captureCurrentLectures();
                }, 1500);
            }
        });
    }

    // LECTURE CAPTURE AND SAVE
    captureAndSaveLecture(form) {
        try {
            const lectureData = {
                id: 'lecture_' + Date.now(),
                title: this.findLectureTitle(),
                subject: this.findSubject(),
                date: new Date().toLocaleDateString('en-IN'),
                savedAt: new Date().toLocaleString('en-IN'),
                pageUrl: window.location.href
            };

            this.saveLecturePermanently(lectureData);
            console.log('💾 Lecture captured and saved permanently');
            
        } catch (error) {
            console.log('Capture error:', error);
        }
    }

    // CURRENT LECTURES CAPTURE KAREGA
    captureCurrentLectures() {
        const lectureElements = document.querySelectorAll([
            '.lecture-item',
            '.video-item',
            '[class*="lecture"]',
            '[class*="video"]'
        ].join(', '));

        const lectures = [];
        lectureElements.forEach((element, index) => {
            const lecture = {
                id: 'lecture_' + Date.now() + '_' + index,
                title: element.querySelector('h3, h4, .title')?.textContent || `Lecture ${index + 1}`,
                elementHTML: element.outerHTML,
                capturedAt: new Date().toLocaleString('en-IN')
            };
            lectures.push(lecture);
        });

        if (lectures.length > 0) {
            this.saveAllLectures(lectures);
        }
    }

    // LECTURE TITLE DHOONDEGA
    findLectureTitle() {
        return document.querySelector('input[name="title"], [placeholder*="Title"], h3, h4')?.value || 
               document.querySelector('h3, h4')?.textContent || 
               'New Lecture';
    }

    // SUBJECT DHOONDEGA
    findSubject() {
        return document.querySelector('input[name="subject"], [placeholder*="Subject"]')?.value ||
               document.querySelector('h1, h2')?.textContent ||
               'General';
    }

    // PERMANENT SAVE KAREGA
    saveLecturePermanently(lectureData) {
        const existing = JSON.parse(localStorage.getItem(this.storageKey) || '{"lectures":[]}');
        
        // Duplicate check
        const isDuplicate = existing.lectures.some(lecture => 
            lecture.title === lectureData.title && 
            lecture.date === lectureData.date
        );

        if (!isDuplicate) {
            existing.lectures.push(lectureData);
            localStorage.setItem(this.storageKey, JSON.stringify(existing));
        }
    }

    // ALL LECTURES SAVE KAREGA
    saveAllLectures(lectures) {
        const existing = JSON.parse(localStorage.getItem(this.storageKey) || '{"lectures":[]}');
        
        lectures.forEach(newLecture => {
            const isDuplicate = existing.lectures.some(existingLecture => 
                existingLecture.title === newLecture.title
            );
            
            if (!isDuplicate) {
                existing.lectures.push(newLecture);
            }
        });
        
        localStorage.setItem(this.storageKey, JSON.stringify(existing));
        console.log('💾 All lectures saved permanently');
    }

    // LECTURES KO AUTOMATICALLY RESTORE KAREGA
    autoRestoreLectures() {
        // Page load pe check karega
        setTimeout(() => {
            this.checkAndRestore();
        }, 3000);
    }

    checkAndRestore() {
        const savedData = JSON.parse(localStorage.getItem(this.storageKey) || '{"lectures":[]}');
        
        if (savedData.lectures.length > 0) {
            console.log('🔄 Checking for missing lectures...');
            
            // Yahan aap logic add kar sakte hain agar lectures missing hain toh restore karne ka
            // Currently yeh sirf save karta hai, restore tera existing system karega
        }
    }

    // ADMIN KE LIYE LECTURE COUNT
    getLectureCount() {
        const savedData = JSON.parse(localStorage.getItem(this.storageKey) || '{"lectures":[]}');
        return savedData.lectures.length;
    }

    // BACKUP FUNCTION
    backupLectures() {
        const data = localStorage.getItem(this.storageKey);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'admin_lectures_backup.json';
        a.click();
    }
}

// System initialize karega
window.adminLectureSave = new AdminLecturesPermanent();

// Admin functions
window.getSavedLectureCount = () => window.adminLectureSave.getLectureCount();
window.backupAdminLectures = () => window.adminLectureSave.backupLectures();

console.log('💾 Admin Lectures Permanent Save Ready!');
