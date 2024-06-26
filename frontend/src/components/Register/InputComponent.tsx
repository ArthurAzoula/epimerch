type InputComponentProps = {
  name: string;
  typeInput: string;
  inputValue: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isRequired: boolean;
  className: string;
};

const InputComponent = ({
  name,
  typeInput,
  inputValue,
  handleOnChange,
  placeholder,
  isRequired,
  className,
}: InputComponentProps) => {
  return (
    <label className="flex justify-center mr-6">
      <input
        name={name}
        type={typeInput}
        value={inputValue}
        onChange={handleOnChange}
        required={isRequired}
        placeholder={placeholder}
        className={`text-sm w-full px-4 py-2 m-2 mt-0 border border-solid border-black rounded-md ${className}`}
      />
    </label>
  );
};

export default InputComponent;
