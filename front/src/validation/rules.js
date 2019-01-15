export default {
  required: val => ({
    isValid: !!(val && val.length),
    errorMessage: (val && val.length) ? null : 'This field is required',
  }),
  email: (val) => {
    // regex taken from http://emailregex.com
    const isValid = !!(val && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val));
    return {
      isValid,
      errorMessage: (isValid) ? null : 'This value should be a valid email',
    };
  },
  url: (val) => {
    const isValid = !!(val && /^https?:\/\/([-a-zA-Z0-9@:%._+~#=]{2,256}\.)+[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(val));
    return {
      isValid,
      errorMessage: (isValid) ? null : 'This value should be a valid url',
    };
  },
};
