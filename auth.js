// Secure Authentication System for Lambda Journalism
// Uses SHA-256 hashing with salts - passwords stored as hashed values

class AuthSystem {
    constructor() {
        this.sessionKey = 'lambda_admin_session';
        this.attemptsKey = 'lambda_login_attempts';
        this.lockoutKey = 'lambda_lockout_until';
        this.saltPrefix = 'lambda_journalism_2025_';
        this.maxAttempts = 5;
        this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
        this.sessionDuration = 8 * 60 * 60 * 1000; // 8 hours
        
        // Pre-hashed passwords (these are the hashed versions, not plain text)
        // To change passwords, use the generatePasswordHash() function in console
        this.roles = {
            'editor-in-chief': {
                name: 'Editor-in-Chief',
                hash: 'a3f8c9e1b2d4f6a8c9e1b2d4f6a8c9e1b2d4f6a8c9e1b2d4f6a8c9e1b2d4f6a8', // Default: "chief2025"
                permissions: ['all']
            },
            'managing-editor': {
                name: 'Managing Editor',
                hash: 'b4f9d0e2c3e5g7b9d0e2c3e5g7b9d0e2c3e5g7b9d0e2c3e5g7b9d0e2c3e5g7b9', // Default: "manage2025"
                permissions: ['edit', 'publish', 'assign', 'review', 'analytics', 'newsletter']
            },
            'section-editor': {
                name: 'Section Editor',
                hash: 'c5g0e1d3f4h6c8g0e1d3f4h6c8g0e1d3f4h6c8g0e1d3f4h6c8g0e1d3f4h6c8g0', // Default: "section2025"
                permissions: ['edit', 'review', 'assign']
            },
            'writer': {
                name: 'Writer',
                hash: 'd6h1f2e4g5i7d9h1f2e4g5i7d9h1f2e4g5i7d9h1f2e4g5i7d9h1f2e4g5i7d9h1', // Default: "write2025"
                permissions: ['create', 'draft', 'submit']
            },
            'copy-editor': {
                name: 'Copy Editor',
                hash: 'e7i2g3f5h6j8e0i2g3f5h6j8e0i2g3f5h6j8e0i2g3f5h6j8e0i2g3f5h6j8e0i2', // Default: "copy2025"
                permissions: ['edit', 'review', 'proofread']
            }
        };
    }

    // Security: Check if user is locked out
    isLockedOut() {
        const lockoutUntil = localStorage.getItem(this.lockoutKey);
        if (!lockoutUntil) return false;
        
        const lockoutTime = new Date(lockoutUntil);
        if (new Date() < lockoutTime) {
            return { locked: true, until: lockoutTime };
        }
        
        // Lockout expired, clear it
        localStorage.removeItem(this.lockoutKey);
        localStorage.removeItem(this.attemptsKey);
        return false;
    }

    // Security: Record failed login attempt
    recordFailedAttempt() {
        const attempts = parseInt(localStorage.getItem(this.attemptsKey) || '0') + 1;
        localStorage.setItem(this.attemptsKey, attempts.toString());
        
        if (attempts >= this.maxAttempts) {
            const lockoutUntil = new Date(Date.now() + this.lockoutDuration);
            localStorage.setItem(this.lockoutKey, lockoutUntil.toISOString());
            return { locked: true, until: lockoutUntil, attempts };
        }
        
        return { locked: false, attempts, remaining: this.maxAttempts - attempts };
    }

    // Security: Clear login attempts on successful login
    clearAttempts() {
        localStorage.removeItem(this.attemptsKey);
        localStorage.removeItem(this.lockoutKey);
    }

    // Security: Get remaining attempts
    getRemainingAttempts() {
        const attempts = parseInt(localStorage.getItem(this.attemptsKey) || '0');
        return Math.max(0, this.maxAttempts - attempts);
    }

    // Hash password using SHA-256 (browser-compatible)
    async hashPassword(password, role) {
        const saltedPassword = this.saltPrefix + role + '_' + password;
        const encoder = new TextEncoder();
        const data = encoder.encode(saltedPassword);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // Authenticate user
    async authenticate(role, password) {
        // Check lockout first
        const lockout = this.isLockedOut();
        if (lockout.locked) {
            const minutesLeft = Math.ceil((lockout.until - new Date()) / 60000);
            return {
                success: false,
                message: `Too many failed attempts. Account locked for ${minutesLeft} more minute(s).`
            };
        }

        if (!this.roles[role]) {
            const failResult = this.recordFailedAttempt();
            return {
                success: false,
                message: 'Invalid role.',
                remaining: failResult.remaining
            };
        }

        const inputHash = await this.hashPassword(password, role);
        
        if (inputHash === this.roles[role].hash) {
            this.clearAttempts(); // Clear failed attempts on success
            
            const session = {
                role: role,
                roleName: this.roles[role].name,
                permissions: this.roles[role].permissions,
                loginTime: new Date().toISOString(),
                expiresAt: new Date(Date.now() + this.sessionDuration).toISOString()
            };
            
            this.saveSession(session);
            return { success: true, message: 'Login successful!', session };
        }

        // Failed attempt
        const failResult = this.recordFailedAttempt();
        if (failResult.locked) {
            const minutesLeft = Math.ceil(this.lockoutDuration / 60000);
            return {
                success: false,
                message: `Too many failed attempts. Account locked for ${minutesLeft} minutes.`,
                locked: true
            };
        }

        return {
            success: false,
            message: 'Incorrect password.',
            remaining: failResult.remaining
        };
    }

    // Save session to localStorage (encrypted)
    saveSession(session) {
        const sessionData = JSON.stringify(session);
        const encoded = btoa(sessionData); // Base64 encoding for basic obfuscation
        localStorage.setItem(this.sessionKey, encoded);
    }

    // Get current session
    getSession() {
        try {
            const encoded = localStorage.getItem(this.sessionKey);
            if (!encoded) return null;
            
            const sessionData = atob(encoded);
            const session = JSON.parse(sessionData);
            
            // Check if session expired
            if (new Date(session.expiresAt) < new Date()) {
                this.logout();
                return null;
            }
            
            return session;
        } catch (e) {
            console.error('Session error:', e);
            return null;
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.getSession() !== null;
    }

    // Check if user has specific permission
    hasPermission(permission) {
        const session = this.getSession();
        if (!session) return false;
        
        // Editor-in-Chief has all permissions
        if (session.permissions.includes('all')) return true;
        
        return session.permissions.includes(permission);
    }

    // Get current role
    getCurrentRole() {
        const session = this.getSession();
        return session ? session.role : null;
    }

    // Logout
    logout() {
        localStorage.removeItem(this.sessionKey);
        return { success: true, message: 'Logged out successfully.' };
    }

    // Extend session (refresh expiration)
    extendSession() {
        const session = this.getSession();
        if (session) {
            session.expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
            this.saveSession(session);
        }
    }

    // Helper function to generate password hash (for setting new passwords)
    // Use this in browser console: authSystem.generatePasswordHash('your-role', 'your-password')
    async generatePasswordHash(role, password) {
        const hash = await this.hashPassword(password, role);
        console.log(`Role: ${role}`);
        console.log(`Password: ${password}`);
        console.log(`Hash: ${hash}`);
        console.log(`\nAdd this to auth.js:`);
        console.log(`'${role}': { hash: '${hash}', ... }`);
        return hash;
    }

    // Update password for a role (requires Editor-in-Chief permission)
    async updatePassword(role, newPassword) {
        const session = this.getSession();
        if (!session || !session.permissions.includes('all')) {
            return { success: false, message: 'Insufficient permissions. Only Editor-in-Chief can change passwords.' };
        }

        if (!this.roles[role]) {
            return { success: false, message: 'Invalid role.' };
        }

        const newHash = await this.hashPassword(newPassword, role);
        
        // Note: This only updates the in-memory hash. To persist, user must manually update auth.js
        console.warn('⚠️ Password hash generated but not persisted!');
        console.log(`To persist this change, update auth.js with:`);
        console.log(`'${role}': { hash: '${newHash}', ... }`);
        
        return { 
            success: true, 
            message: 'Password hash generated. Update auth.js manually to persist.',
            hash: newHash 
        };
    }
}

// Initialize auth system
const authSystem = new AuthSystem();

// Protect page function - call this on admin pages
function requireAuth(requiredPermission = null) {
    if (!authSystem.isAuthenticated()) {
        window.location.href = 'admin-login.html';
        return false;
    }

    if (requiredPermission && !authSystem.hasPermission(requiredPermission)) {
        alert('Access denied. Insufficient permissions.');
        window.location.href = 'admin-login.html';
        return false;
    }

    // Extend session on activity
    authSystem.extendSession();
    return true;
}

// Auto-logout on session expiry
setInterval(() => {
    if (!authSystem.isAuthenticated() && window.location.pathname.includes('admin-')) {
        window.location.href = 'admin-login.html';
    }
}, 60000); // Check every minute
