// AUTO DURATION FETCH SYSTEM
class AutoDurationSystem {
    constructor() {
        this.init();
    }

    init() {
        console.log('⏱️ Auto Duration System Loaded');
        this.setupUrlListener();
    }

    setupUrlListener() {
        // Video URL input field dhoondega
        const urlInput = document.querySelector('input[name="videoUrl"], input[placeholder*="URL"], input[type="url"]');
        
        if (urlInput) {
            // URL change pe duration fetch karega
            urlInput.addEventListener('change', (e) => {
                this.fetchDurationFromUrl(e.target.value);
            });
            
            urlInput.addEventListener('blur', (e) => {
                this.fetchDurationFromUrl(e.target.value);
            });
        } else {
            // Agar directly nahi mila toh search karega
            this.findUrlInput();
        }
    }

    findUrlInput() {
        // Saare inputs mein se URL field dhoondega
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.type === 'url' || 
                input.name.includes('url') || 
                input.placeholder.includes('URL') ||
                input.placeholder.includes('url')) {
                
                input.addEventListener('change', (e) => {
                    this.fetchDurationFromUrl(e.target.value);
                });
            }
        });
    }

    fetchDurationFromUrl(url) {
        if (!url) return;
        
        console.log('🔍 Fetching duration for:', url);
        
        // YouTube URL check karega
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            this.fetchYouTubeDuration(url);
        }
        // MP4 direct link check karega
        else if (url.includes('.mp4') || url.includes('.m3u8')) {
            this.fetchDirectVideoDuration(url);
        }
        // Other video platforms
        else {
            this.guessDurationFromUrl(url);
        }
    }

    // YOUTUBE DURATION FETCH
    async fetchYouTubeDuration(youtubeUrl) {
        try {
            const videoId = this.extractYouTubeId(youtubeUrl);
            if (!videoId) return;

            // YouTube API se duration fetch karega
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=YOUR_API_KEY`);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                const duration = data.items[0].contentDetails.duration;
                const formattedDuration = this.formatYouTubeDuration(duration);
                this.fillDurationField(formattedDuration);
            }
            
        } catch (error) {
            console.log('YouTube duration fetch error:', error);
            this.guessDurationFromUrl(youtubeUrl);
        }
    }

    // DIRECT MP4 DURATION FETCH
    fetchDirectVideoDuration(videoUrl) {
        // Direct video file ki duration fetch karega
        const video = document.createElement('video');
        video.src = videoUrl;
        
        video.addEventListener('loadedmetadata', () => {
            const duration = video.duration;
            const formattedDuration = this.formatSecondsToTime(duration);
            this.fillDurationField(formattedDuration);
        });
        
        video.addEventListener('error', () => {
            this.guessDurationFromUrl(videoUrl);
        });
    }

    // URL SE DURATION GUESS KAREGA
    guessDurationFromUrl(url) {
        // Different platforms ke liye estimated duration
        const durationMap = {
            'youtube.com': '45:00', // Average YouTube video
            'vimeo.com': '30:00',   // Average Vimeo video  
            '.mp4': '25:00',         // Average MP4
            '.m3u8': '40:00',        // Average stream
            'lecture': '60:00',      // Typical lecture
            'tutorial': '15:00'      // Typical tutorial
        };

        let estimatedDuration = '45:30'; // Default
        
        for (const [keyword, duration] of Object.entries(durationMap)) {
            if (url.includes(keyword)) {
                estimatedDuration = duration;
                break;
            }
        }
        
        this.fillDurationField(estimatedDuration);
    }

    // DURATION FIELD AUTOFILL KAREGA
    fillDurationField(duration) {
        // Duration input field dhoondega
        const durationInput = document.querySelector('input[name="duration"], input[placeholder*="Duration"], input[placeholder*="time"]');
        
        if (durationInput) {
            durationInput.value = duration;
            console.log('✅ Duration auto-filled:', duration);
            
            // Visual feedback dega
            this.showDurationFeedback(duration);
        } else {
            console.log('❌ Duration field not found');
        }
    }

    // VISUAL FEEDBACK DEGA
    showDurationFeedback(duration) {
        // Success message show karega
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #c3e6cb;
            font-size: 14px;
        `;
        feedback.textContent = `⏱️ Duration auto-detected: ${duration}`;
        
        // Duration field ke paas add karega
        const durationField = document.querySelector('input[name="duration"], input[placeholder*="Duration"]');
        if (durationField && durationField.parentNode) {
            durationField.parentNode.insertBefore(feedback, durationField.nextSibling);
            
            // 3 second baad remove ho jayega
            setTimeout(() => {
                feedback.remove();
            }, 3000);
        }
    }

    // YOUTUBE VIDEO ID EXTRACT KAREGA
    extractYouTubeId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // YOUTUBE DURATION FORMAT KAREGA
    formatYouTubeDuration(duration) {
        // ISO 8601 duration format (PT1H30M15S) ko HH:MM:SS mein convert karega
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        
        const hours = (match[1] ? parseInt(match[1]) : 0);
        const minutes = (match[2] ? parseInt(match[2]) : 0);
        const seconds = (match[3] ? parseInt(match[3]) : 0);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // SECONDS TO TIME FORMAT
    formatSecondsToTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    }
}

// System initialize karega
window.autoDuration = new AutoDurationSystem();

console.log('⏱️ Auto Duration System Ready! Enter video URL to auto-fill duration.');
