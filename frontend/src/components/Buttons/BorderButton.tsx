type BorderButtonProps = { text: string, className: string};

const BorderButton = ({ text, className }: BorderButtonProps) => {
  return (
    <button className={`border border-solid border-black py-1 px-2 rounded-md ${className}`}>
      {text}
    </button>
  );
};

export default BorderButton;
