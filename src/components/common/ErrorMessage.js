const ErrorMessage = ({ error }) => {
  console.log();
  if (!error) return null;
  return <div className="my-form-error">{error}</div>;
};

export default ErrorMessage;
