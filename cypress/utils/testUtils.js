/**
 * Test Utilities - Common helper functions for Cypress tests
 * Contains data generators, formatters, and utility functions
 */

class TestUtils {
  /**
   * Generate random string
   * @param {number} length - Length of the string
   * @param {string} charset - Character set to use
   * @returns {string} - Random string
   */
  static generateRandomString(
    length = 10,
    charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
  ) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Generate random email
   * @param {string} domain - Email domain (default: example.com)
   * @returns {string} - Random email address
   */
  static generateRandomEmail(domain = 'example.com') {
    const username = this.generateRandomString(8);
    return `${username}@${domain}`;
  }

  /**
   * Generate random phone number
   * @param {string} format - Phone format (default: US format)
   * @returns {string} - Random phone number
   */
  static generateRandomPhone(format = 'US') {
    switch (format) {
      case 'US':
        return `+1${this.generateRandomString(10, '0123456789')}`;
      case 'UK':
        return `+44${this.generateRandomString(10, '0123456789')}`;
      default:
        return this.generateRandomString(10, '0123456789');
    }
  }

  /**
   * Generate random date
   * @param {Date} startDate - Start date range
   * @param {Date} endDate - End date range
   * @returns {Date} - Random date
   */
  static generateRandomDate(
    startDate = new Date(2020, 0, 1),
    endDate = new Date()
  ) {
    const start = startDate.getTime();
    const end = endDate.getTime();
    return new Date(start + Math.random() * (end - start));
  }

  /**
   * Format date to string
   * @param {Date} date - Date object
   * @param {string} format - Date format (ISO, US, etc.)
   * @returns {string} - Formatted date string
   */
  static formatDate(date, format = 'ISO') {
    switch (format) {
      case 'ISO':
        return date.toISOString().split('T')[0];
      case 'US':
        return date.toLocaleDateString('en-US');
      case 'UK':
        return date.toLocaleDateString('en-GB');
      default:
        return date.toString();
    }
  }

  /**
   * Generate test user data
   * @param {object} overrides - Override specific fields
   * @returns {object} - User data object
   */
  static generateUserData(overrides = {}) {
    const defaultData = {
      firstName: this.generateRandomString(6),
      lastName: this.generateRandomString(8),
      email: this.generateRandomEmail(),
      phone: this.generateRandomPhone(),
      username: this.generateRandomString(8),
      password: 'Test123!',
      dateOfBirth: this.formatDate(
        this.generateRandomDate(new Date(1980, 0, 1), new Date(2000, 11, 31))
      ),
      address: {
        street: `${Math.floor(Math.random() * 9999)} Test St`,
        city: 'Test City',
        state: 'CA',
        zipCode: this.generateRandomString(5, '0123456789'),
        country: 'US',
      },
    };

    return { ...defaultData, ...overrides };
  }

  /**
   * Generate product data
   * @param {object} overrides - Override specific fields
   * @returns {object} - Product data object
   */
  static generateProductData(overrides = {}) {
    const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
    const defaultData = {
      name: `Test Product ${this.generateRandomString(5)}`,
      description: `This is a test product description ${this.generateRandomString(10)}`,
      price: (Math.random() * 1000).toFixed(2),
      category: categories[Math.floor(Math.random() * categories.length)],
      sku: this.generateRandomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
      inStock: Math.random() > 0.5,
      quantity: Math.floor(Math.random() * 100),
    };

    return { ...defaultData, ...overrides };
  }

  /**
   * Wait for condition with timeout
   * @param {function} condition - Function that returns boolean
   * @param {number} timeout - Maximum time to wait in milliseconds
   * @param {number} interval - Check interval in milliseconds
   * @returns {Promise} - Promise that resolves when condition is met
   */
  static waitForCondition(condition, timeout = 10000, interval = 100) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const check = () => {
        if (condition()) {
          resolve();
        } else if (Date.now() - startTime >= timeout) {
          reject(new Error(`Condition not met within ${timeout}ms`));
        } else {
          setTimeout(check, interval);
        }
      };

      check();
    });
  }

  /**
   * Retry function with exponential backoff
   * @param {function} fn - Function to retry
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} delay - Initial delay in milliseconds
   * @returns {Promise} - Promise that resolves with function result
   */
  static async retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await this.sleep(delay * Math.pow(2, i));
      }
    }
  }

  /**
   * Sleep for specified duration
   * @param {number} ms - Duration in milliseconds
   * @returns {Promise} - Promise that resolves after specified time
   */
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid email format
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @param {string} format - Expected format (US, UK, etc.)
   * @returns {boolean} - True if valid phone format
   */
  static isValidPhone(phone, format = 'US') {
    const patterns = {
      US: /^\+1\d{10}$/,
      UK: /^\+44\d{10}$/,
      GENERIC: /^\+\d{1,3}\d{4,14}$/,
    };

    return patterns[format]
      ? patterns[format].test(phone)
      : patterns.GENERIC.test(phone);
  }

  /**
   * Generate random coordinates
   * @param {object} bounds - Geographical bounds
   * @returns {object} - Lat/lng coordinates
   */
  static generateRandomCoordinates(
    bounds = { north: 90, south: -90, east: 180, west: -180 }
  ) {
    return {
      lat: Math.random() * (bounds.north - bounds.south) + bounds.south,
      lng: Math.random() * (bounds.east - bounds.west) + bounds.west,
    };
  }

  /**
   * Convert string to kebab case
   * @param {string} str - String to convert
   * @returns {string} - Kebab case string
   */
  static toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  /**
   * Convert string to camel case
   * @param {string} str - String to convert
   * @returns {string} - Camel case string
   */
  static toCamelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  /**
   * Deep clone object
   * @param {object} obj - Object to clone
   * @returns {object} - Cloned object
   */
  static deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Get random element from array
   * @param {Array} array - Array to pick from
   * @returns {*} - Random element
   */
  static getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Shuffle array
   * @param {Array} array - Array to shuffle
   * @returns {Array} - Shuffled array
   */
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code
   * @param {string} locale - Locale for formatting
   * @returns {string} - Formatted currency string
   */
  static formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  /**
   * Generate unique ID
   * @returns {string} - Unique identifier
   */
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  /**
   * Log with timestamp
   * @param {string} message - Message to log
   * @param {string} level - Log level
   */
  static log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
  }

  /**
   * Get environment-specific data
   * @param {string} key - Data key
   * @returns {*} - Environment-specific value
   */
  static getEnvData(key) {
    const env = Cypress.env('CYPRESS_ENVIRONMENT') || 'dev';
    const envData = {
      dev: {
        apiUrl: 'https://dev-api.example.com',
        timeout: 30000,
        retries: 3,
      },
      staging: {
        apiUrl: 'https://staging-api.example.com',
        timeout: 20000,
        retries: 2,
      },
      prod: {
        apiUrl: 'https://api.example.com',
        timeout: 10000,
        retries: 1,
      },
    };

    return envData[env]?.[key] || envData.dev[key];
  }
}

export default TestUtils;
