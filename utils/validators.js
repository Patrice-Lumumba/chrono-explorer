/**
 * Validators for event service
 */

/**
 * Validate event data
 * @param {Object} data - Event data to validate
 * @returns {Array} - Array of error messages, empty if validation passes
 */
const validateEvent = (data) => {
  const errors = [];
  const { title, period_id } = data;

  // Title validation
  if (!title) {
    errors.push('Title is required');
  } else if (typeof title !== 'string') {
    errors.push('Title must be a string');
  } else if (title.trim() === '') {
    errors.push('Title cannot be empty');
  }

  // Period ID validation
  if (!period_id) {
    errors.push('Period ID is required');
  }

  // Date validation if provided
  if (data.date && isNaN(Date.parse(data.date))) {
    errors.push('Invalid date format');
  }

  return errors;
};

/**
 * Validate period data
 * @param {Object} data - Period data to validate
 * @returns {Array} - Array of error messages, empty if validation passes
 */
const validatePeriod = (data) => {
  const errors = [];
  const { name } = data;

  // Name validation
  if (!name) {
    errors.push('Name is required');
  } else if (typeof name !== 'string') {
    errors.push('Name must be a string');
  } else if (name.trim() === '') {
    errors.push('Name cannot be empty');
  }

  // Date validations if provided
  if (data.start_date && isNaN(Date.parse(data.start_date))) {
    errors.push('Invalid start date format');
  }

  if (data.end_date && isNaN(Date.parse(data.end_date))) {
    errors.push('Invalid end date format');
  }

  // Check that start date is before end date if both are provided
  if (data.start_date && data.end_date) {
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    if (startDate > endDate) {
      errors.push('Start date must be before end date');
    }
  }

  return errors;
};

// media type validation

const getMediaTypeFromMimetype = (mimetype) => {
  const allowImagesTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  const allowVideoTypes = [
    'video/avi',
    'video/mp4',
    'video/webm',
  ];
  return [
    ...allowImagesTypes,
    ...allowVideoTypes,
  ].includes(mimetype);
};

module.exports = {
  validateEvent,
  validatePeriod,
  getMediaTypeFromMimetype,
};
