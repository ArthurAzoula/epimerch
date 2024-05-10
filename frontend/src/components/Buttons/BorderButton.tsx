type BorderButtonProps = { text: string, className: string, disabled?: boolean};

const BorderButton = ({ text, className, disabled }: BorderButtonProps) => {
  return (
    <button className={`border border-solid border-black py-1 px-2 rounded-md ${className}`} disabled={disabled}>
      {text}
    </button>
  );
};

export default BorderButton;
