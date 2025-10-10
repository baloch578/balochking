// COMPLETE SECURITY SYSTEM
class CompleteSecuritySystem {
    constructor() {
        this.blockedIPs = [];
        this.adminMode = false;
        this.init();
    }

    init() {
        console.log('🛡️ Complete Security System Activated');
        this.checkAdminAccess();
        this.detectAndBlockInspector();
        this.protectPageElements();
        this.monitorUserActivity();
        this.setupIPBlocking();
    }

    // ADMIN ACCESS CHECK
    checkAdminAccess() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === 'true') {
            this.adminMode = true;
            localStorage.setItem('admin_access', 'true');
            console.log('👑 Admin Mode Activated');
        }
        
        if (localStorage.getItem('admin_access') === 'true') {
            this.adminMode = true;
        }
    }

    // WEB INSPECTOR DETECTION & BLOCK
    detectAndBlockInspector() {
        // DevTools detect karega
        const checkDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 100;
            const heightThreshold = window.outerHeight - window.innerHeight > 100;
            
            if ((widthThreshold || heightThreshold) && !this.adminMode) {
                this.blockAccess('Web Inspector Detected');
                return true;
            }
            return false;
        };

        setInterval(checkDevTools, 1000);

        // Console access block karega
        this.blockConsoleAccess();
    }

    blockConsoleAccess() {
        // Console methods override karega
        const originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info
        };

        ['log', 'warn', 'error', 'info'].forEach(method => {
            console[method] = function() {
                if (!window.securitySystem?.adminMode) {
                    window.securitySystem?.blockAccess('Console Access Attempt');
                    return;
                }
                originalConsole[method].apply(console, arguments);
            };
        });
    }

    // PAGE ELEMENTS PROTECTION
    protectPageElements() {
        // Right-click disable
        document.addEventListener('contextmenu', (e) => {
            if (!this.adminMode) {
                e.preventDefault();
                this.logSecurityEvent('Right-click blocked');
                return false;
            }
        });

        // Text selection disable
        document.addEventListener('selectstart', (e) => {
            if (!this.adminMode) {
                e.preventDefault();
                return false;
            }
        });

        // Keyboard shortcuts block
        document.addEventListener('keydown', (e) => {
            if (this.adminMode) return;

            // F12 block
            if (e.key === 'F12') {
                e.preventDefault();
                this.blockAccess('F12 Pressed');
                return false;
            }

            // Ctrl+Shift+I block
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                this.blockAccess('Ctrl+Shift+I Pressed');
                return false;
            }

            // Ctrl+U (View Source) block
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                this.blockAccess('View Source Attempt');
                return false;
            }
        });
    }

    // USER ACTIVITY MONITORING
    monitorUserActivity() {
        let suspiciousCount = 0;

        // Multiple rapid clicks monitor karega
        document.addEventListener('click', (e) => {
            if (e.target.closest('button, a')) {
                suspiciousCount++;
                if (suspiciousCount > 10) {
                    this.logSecurityEvent('Rapid clicking detected');
                }
            }
        });

        // Reset counter
        setInterval(() => {
            suspiciousCount = 0;
        }, 5000);
    }

    // IP BLOCKING SYSTEM
    setupIPBlocking() {
        this.getUserIP().then(ip => {
            this.checkIPBlocklist(ip);
        });
    }

    async getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return 'unknown';
        }
    }

    checkIPBlocklist(userIP) {
        const blockedIPs = this.getBlockedIPs();
        if (blockedIPs.includes(userIP)) {
            this.blockAccess(`Blocked IP: ${userIP}`);
        }
    }

    getBlockedIPs() {
        // Yahan aap blocked IPs list maintain kar sakte hain
        return [
            '123.456.789.0',
            '111.222.333.444'
        ];
    }

    // ACCESS BLOCK FUNCTION
    blockAccess(reason) {
        console.log(`🚫 ACCESS BLOCKED: ${reason}`);
        
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: #000;
                color: red;
                font-family: Arial;
                text-align: center;
                flex-direction: column;
            ">
                <h1>🚫 ACCESS BLOCKED</h1>
                <p>Security Violation Detected</p>
                <p><small>Reason: ${reason}</small></p>
                <p><small>Your IP has been logged</small></p>
                <p><small>Contact admin for access</small></p>
            </div>
        `;

        // Further navigation block
        window.stop();
        
        this.logSecurityEvent(`BLOCKED: ${reason}`);
    }

    // SECURITY LOGGING
    logSecurityEvent(event) {
        const logEntry = {
            event: event,
            timestamp: new Date().toLocaleString('en-IN'),
            userAgent: navigator.userAgent,
            url: window.location.href,
            ip: 'detecting...'
        };

        const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
        logs.push(logEntry);
        localStorage.setItem('security_logs', JSON.stringify(logs.slice(-100))); // Last 100 entries

        console.log('🔔 Security Event:', logEntry);
    }

    // ADMIN FUNCTIONS
    getSecurityLogs() {
        return JSON.parse(localStorage.getItem('security_logs') || '[]');
    }

    clearSecurityLogs() {
        localStorage.removeItem('security_logs');
    }

    addBlockedIP(ip) {
        const blockedIPs = this.getBlockedIPs();
        if (!blockedIPs.includes(ip)) {
            blockedIPs.push(ip);
            // Yahan aap database update kar sakte hain
            console.log(`✅ IP Blocked: ${ip}`);
        }
    }
}

// Security system activate karega
window.securitySystem = new CompleteSecuritySystem();

// Admin functions
window.getSecurityLogs = () => window.securitySystem.getSecurityLogs();
window.addBlockedIP = (ip) => window.securitySystem.addBlockedIP(ip);

console.log('🛡️ Security System Ready! Unauthorized access will be blocked.');
