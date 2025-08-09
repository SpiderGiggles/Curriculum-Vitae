export function compliantEmail(
  includeDots: boolean = true,
  includeNumbers: boolean = true
): string {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = "-_";
  const dotChar = ".";

  // Common domain options
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];

  // Build character set for local part
  let localChars = lowerCaseChars + upperCaseChars;
  if (includeNumbers) {
    localChars += digits;
  }
  localChars += specialChars;

  let localPart = "";

  // Ensure at least one character from each required set is included
  localPart +=
    lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  localPart +=
    upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];

  if (includeNumbers) {
    localPart += digits[Math.floor(Math.random() * digits.length)];
  }

  // Add at least one special character
  localPart += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Generate random length for local part (6-15 characters for reasonable email length)
  const localLength = Math.floor(Math.random() * 10) + 6;

  // Fill the rest of the local part
  while (localPart.length < localLength) {
    const nextChar = localChars[Math.floor(Math.random() * localChars.length)];

    // Add dots occasionally if enabled, but avoid consecutive dots or dots at start/end
    if (
      includeDots &&
      Math.random() < 0.15 &&
      localPart.length > 0 &&
      !localPart.endsWith(".") &&
      localPart.length < localLength - 1
    ) {
      localPart += dotChar;
    } else {
      localPart += nextChar;
    }
  }

  // Ensure local part doesn't start or end with dot or special characters
  while (
    localPart.startsWith(".") ||
    localPart.startsWith("-") ||
    localPart.startsWith("_")
  ) {
    localPart =
      localPart.substring(1) +
      lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  }

  while (
    localPart.endsWith(".") ||
    localPart.endsWith("-") ||
    localPart.endsWith("_")
  ) {
    localPart =
      localPart.substring(0, localPart.length - 1) +
      lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  }

  // Shuffle the local part to ensure random order (excluding first and last char to maintain validity)
  if (localPart.length > 2) {
    const firstChar = localPart[0];
    const lastChar = localPart[localPart.length - 1];
    const middlePart = localPart
      .substring(1, localPart.length - 1)
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    localPart = firstChar + middlePart + lastChar;
  }

  // Select random domain
  const selectedDomain = domains[Math.floor(Math.random() * domains.length)];

  // Combine to form complete email
  const email = localPart + "@" + selectedDomain;

  return email;
}

export function compliantPassword(includeSpecialChars: boolean = true): string {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*()";
  let allChars = lowerCaseChars + upperCaseChars + digits;
  if (includeSpecialChars) {
    allChars += specialChars;
  }

  let password = "";

  // Ensure at least one character from each required set is included
  password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  if (includeSpecialChars) {
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  }

  // Fill the rest of the password to meet the minimum length requirement
  const passwordLength = Math.floor(Math.random() * 9) + 8; // Generates a number between 8 and 16

  while (password.length < passwordLength) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to ensure random order of characters
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}
