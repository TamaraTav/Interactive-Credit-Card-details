import * as yup from "yup";

// Dynamic year validation helpers
// YY format: 2-digit year (00-99)
// % 100 აბრუნებს ბოლო 2 ციფრს (ნაშთს 100-ზე გაყოფისას)
// მაგალითად: 2024 % 100 = 24, 2100 % 100 = 0
const getCurrentYearYY = () => {
  return new Date().getFullYear() % 100;
};

const getMaxYearYY = () => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 15; // მომავალი 15 წელი (credit card expiration max)
  // პრაქტიკაში 2100, 2200, 2300 არ იქნება valid, რადგან ძალიან შორს არის
  // ამიტომ % 100 safe-ია ამ კონტექსტში
  return maxYear % 100;
};

const currentYearYY = getCurrentYearYY();
const maxYearYY = getMaxYearYY();

export const cardFormSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be maximum 30 characters")
    .test(
      "includes-space",
      "You should include both first and last names",
      (value) => value.includes(" ")
    ),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .min(19, "Card number must be 16 characters"),
  mm: yup
    .string()
    .required("MM is required")
    .min(2, "Month must be at least 2 characters")
    .test(
      "month validation",
      "Month must be valid",
      (value) => parseInt(value) > 0 && parseInt(value) <= 12
    ),
  yy: yup
    .string()
    .required("YY is required")
    .min(2, "Year must be at least 2 characters")
    .test(
      "year validation",
      `Year must be between ${String(currentYearYY).padStart(
        2,
        "0"
      )} and ${String(maxYearYY).padStart(2, "0")}`,
      (value) => {
        const yearNum = parseInt(value);
        if (isNaN(yearNum)) return false;

        // Century transition case: მაგ. currentYearYY = 99, maxYearYY = 14 (2085-2100)
        // Valid years: 99, 00, 01, ..., 14 (სადაც 00 = 2100, არა 2200, რადგან მხოლოდ 15 წელი მომავალში)
        if (currentYearYY > maxYearYY) {
          return yearNum >= currentYearYY || yearNum <= maxYearYY;
        }

        // Normal case: მაგ. currentYearYY = 24, maxYearYY = 39 (2024-2039)
        // Valid years: 24-39
        return yearNum >= currentYearYY && yearNum <= maxYearYY;
      }
    ),
  cvc: yup
    .string()
    .required("CVC is required")
    .min(3, "CVC must be at least 3 characters"),
});
