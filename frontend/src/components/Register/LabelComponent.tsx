type LabelComponentProps = {
    className: string;
    children: React.ReactNode;
    };

const LabelComponent = ({ className, children}: LabelComponentProps) => {
    return (
        <label className={`text-xs pl-2 text-neutral-500 ${className}`}>
            {children}
        </label>
    )
};
 
export default LabelComponent;