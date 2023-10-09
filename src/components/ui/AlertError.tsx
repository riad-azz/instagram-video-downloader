import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

interface AlertErrorProps {
  errorMsg: string;
  handleReset: () => void;
}

const AlertError = (props: AlertErrorProps) => {
  const { errorMsg, handleReset } = props;
  return (
    <div className="mb-2 w-full">
      {!!errorMsg && (
        <div
          role="alert"
          aria-label="Alert"
          className="flex items-center justify-between border-l-4 border-red-500 bg-red-50 p-2"
        >
          <div className="flex items-center gap-1 text-red-500">
            <BiErrorCircle className="hidden text-2xl sm:block" />
            <span className="text-sm  md:text-base">{errorMsg}</span>
          </div>
          <button
            aria-label="Close alert"
            onClick={handleReset}
            className="hidden text-sm text-red-500 sm:block md:text-base"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertError;
