const ErrorMessage = ({ error }) => {
  console.log();
  if (!error) return null;
  return <div className="val-error">{error}</div>;
};

export default ErrorMessage;
