export const validateAndFormatEthiopianPhone = (phone) => {
  if (!phone) return null;

  // Remove spaces and non-digits
  let cleaned = phone.replace(/\D/g, "");

  // Remove country code if exists
  if (cleaned.startsWith("251")) {
    cleaned = cleaned.slice(3);
  }

  // Remove leading zero
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  }

  // Must start with 9 and be 9 digits
  const phoneRegex = /^9\d{8}$/;

  if (!phoneRegex.test(cleaned)) {
    return null;
  }

  // Return normalized format
  return `251${cleaned}`;
};
