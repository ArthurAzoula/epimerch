type NudeButtonProps = { text: string; className: string };

const NudeButton = ({ text, className }: NudeButtonProps) => {
  return (
    <button
      className={`${className}`}
    >
      {text}
    </button>
  );
};

export default NudeButton;
