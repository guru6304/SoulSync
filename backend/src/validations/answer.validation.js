const MEDIA_TYPES = [
    'image',
    'video',
    'audio',
    'music',
];

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const validateCreateAnswer = (data = {}) => {
  const errors = [];

  const { content, media = [] } = data;

  if (
    typeof content !== 'string' ||
    content.trim().length === 0
  ) {
    errors.push({
      field: 'content',
      message: 'Answer is required.',
    });
  } else if (content.length > 3000) {
    errors.push({
      field: 'content',
      message: 'Answer cannot exceed 3000 characters.',
    });
  }

  if (!Array.isArray(media)) {
    errors.push({
      field: 'media',
      message: 'Media must be an array.',
    });
  } else {
    media.forEach((item, index) => {
      if (!isValidUrl(item.media_url)) {
        errors.push({
          field: `media[${index}].media_url`,
          message: 'Valid media URL is required.',
        });
      }

      if (!MEDIA_TYPES.includes(item.media_type)) {
        errors.push({
          field: `media[${index}].media_type`,
          message: 'Media type must be image, video or audio.',
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const validateUpdateAnswer = (data = {}) => {
  const errors = [];

  const { content, media } = data;

  if (content !== undefined) {
    if (
      typeof content !== 'string' ||
      content.trim().length === 0
    ) {
      errors.push({
        field: 'content',
        message: 'Answer cannot be empty.',
      });
    } else if (content.length > 3000) {
      errors.push({
        field: 'content',
        message: 'Answer cannot exceed 3000 characters.',
      });
    }
  }

  if (media !== undefined) {
    if (!Array.isArray(media)) {
      errors.push({
        field: 'media',
        message: 'Media must be an array.',
      });
    } else {
      media.forEach((item, index) => {
        if (!isValidUrl(item.media_url)) {
          errors.push({
            field: `media[${index}].media_url`,
            message: 'Valid media URL is required.',
          });
        }

        if (!MEDIA_TYPES.includes(item.media_type)) {
          errors.push({
            field: `media[${index}].media_type`,
            message: 'Media type must be image, video or audio.',
          });
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  MEDIA_TYPES,
  validateCreateAnswer,
  validateUpdateAnswer,
};