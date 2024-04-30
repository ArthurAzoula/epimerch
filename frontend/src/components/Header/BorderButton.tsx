type BorderButtonProps = { text: string };

const BorderButton = ({ text }: BorderButtonProps) => {
  return (
    <button className="border-2 border-solid border-black py-1 px-2 rounded-md">
      {text}
    </button>
  );
};

export default BorderButton;
