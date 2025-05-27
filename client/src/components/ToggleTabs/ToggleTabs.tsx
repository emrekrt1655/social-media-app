import "./ToggleTabs.scss";

export type ToggleOption<T extends string> = {
  label: string;
  value: T;
};

type ToggleTabsProps<T extends string> = {
  options: ToggleOption<T>[];
  active: T;
  onChange: (value: T) => void;
};

const ToggleTabs = <T extends string>({ options, active, onChange }: ToggleTabsProps<T>) => {
  return (
    <div className="toggle-tabs">
      {options.map((option) => (
        <button
          key={option.value}
          className={`toggle-btn ${active === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleTabs;
