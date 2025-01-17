export function validateUrl(value) {
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/.*)?$/;
    return urlRegex.test(value);
  }
  