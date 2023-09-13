import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

interface AlertErrorProps {
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

const AlertError = (props: AlertErrorProps) => {
  const { errorMsg, setErrorMsg } = props;
  return (
    <div className="mb-2 w-full">
      {!!errorMsg && (
        <div
          role="alert"
          aria-label="Alert"
          className="flex items-center justify-between border-l-4 border-red-500 bg-red-50 p-2"
        >
          <div className="flex items-center gap-1 text-red-500">
            <BiErrorCircle className="text-2xl" />
            <span className="text-sm  md:text-base">{errorMsg}</span>
          </div>
          <button
            aria-label="Close alert"
            onClick={() => setErrorMsg("")}
            className="text-sm text-red-500 md:text-base"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertError;
