import { useState } from 'react';

const Select = ({ options, onChange, values, clearable, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState(values);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value) => {
        let newValues = [...selectedValues];
        if (newValues.includes(value)) {
            newValues = newValues.filter((v) => v !== value);
        } else {
            newValues.push(value);
        }
        setSelectedValues(newValues);
        onChange(newValues);
    };

    const clearSelection = () => {
        setSelectedValues([]);
        onChange([]);
    };

    return (
        <div className="select-container">
            <div className="select-header" onClick={toggleSelect}>
                <div className="select-values">
                    {selectedValues.length > 0 ? (
                        selectedValues.map((value) => (
                            <span key={value} className="select-value">
                {value}
              </span>
                        ))
                    ) : (
                        <span className="select-placeholder">Select an option</span>
                    )}
                </div>
                <div className="select-icon">&#9660;</div>
            </div>
            {isOpen && (
                <div className="select-options">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`select-option ${
                                selectedValues.includes(option) ? 'selected' : ''
                            }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
            {clearable && selectedValues.length > 0 && (
                <div className="select-clear" onClick={clearSelection}>
                    Clear
                </div>
            )}
        </div>
    );
};

export default Select;
