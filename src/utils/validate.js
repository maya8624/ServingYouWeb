import Joi from "joi";

const validateData = (data, schema) => {
  const options = { abortEarly: false };
  const { error } = Joi.object(schema).validate(data, options);

  if (!error) return null;

  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }

  return errors;
};

const validateProperty = (name, value, schema) => {
  var obj = { [name]: value };
  const newSchema = { [name]: schema[name] };
  const { error } = Joi.object(newSchema).validate(obj);

  return error === undefined ? null : error.details[0].message;
};

const validate = {
  validateData,
  validateProperty,
};

export default validate;
