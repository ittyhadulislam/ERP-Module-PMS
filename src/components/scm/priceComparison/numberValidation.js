export const checkValidation = (value, length, acceptZero = false) => {
  const validations = [];

  if (value !== "") {
    if (!/^\d+(\.\d+)?$/.test(value)) {
      validations.push("Please enter a valid positive number.");
    }

    if (value?.length > length) {
      validations.push(`It must be under ${length} characters.`);
    }

    if (value <= 0 && !acceptZero) {
      validations.push("It must be greater than 0.");
    }
  }

  return validations;
};
