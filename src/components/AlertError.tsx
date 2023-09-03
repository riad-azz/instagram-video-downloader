interface AlertErrorProps {
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

const AlertError = ({ errorMsg, setErrorMsg }: AlertErrorProps) => {
  return (
    <div className="mb-2 w-full">
      {!!errorMsg && (
        <div
          role="alert"
          aria-label="Alert"
          className="flex items-center border-l-4 border-red-500 bg-gray-800 p-2"
        >
          <span className="text-sm text-red-500 md:text-base">{errorMsg}</span>
          <button
            aria-label="Close alert"
            onClick={() => setErrorMsg("")}
            className="ml-auto text-sm text-red-500 md:text-base"
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertError;
