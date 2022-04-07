const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const notEmpty = {
  validate: (str: string) => str.length === 0,
  message: 'Please enter a value',
};

const isEmail = {
  validate: (str: string) => str.search(EMAIL_REGEX) < 0,
  message: `Please enter a valid email`,
};

const isPhone = {
  validate: (str: string) => str.search(/^\d{10}$/) < 0,
  message: `Please enter a valid phone number`,
};

const upper = {
  validate: (str: string) => str.search(/(?=.*[a-z])/) < 0,
  message: `Should contain at least one lower case`,
};

const lower = {
  validate: (str: string) => str.search(/(?=.*[A-Z])/) < 0,
  message: `Should contain at least one upper case`,
};

const digit = {
  validate: (str: string) => str.search(/(?=.*\d)/) < 0,
  message: `Should contain at least one digit`,
};

const special = {
  validate: (str: string) => str.search(/(?=.*[!@#$%^&*])/) < 0,
  message: `Should contain at least one spacial character`,
};

const min = (num: number) => ({
  validate: (str: string) => str.length < num,
  message: `Minimum ${num} characters`,
});

const max = (num: number) => ({
  validate: (str: string) => str.length > num,
  message: `Maximum ${num} characters`,
});

const match = (match: string) => ({
  validate: (str: string) => str !== match,
  message: "Conformation dosen't match",
});

export const v = {
  notEmpty,
  isEmail,
  isPhone,
  upper,
  lower,
  digit,
  special,
  min,
  max,
  match,
};
