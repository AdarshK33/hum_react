import React from 'react';

const Dropdown = ({value, data, placeholder, styleClass, onChange}) => {

    const handleChange = (event) => {
        const {value} = event.target;
        onChange(value);
    };

    return (
        <div>
            <select
                value={value}
                className="form-control"
                required
                onChange={handleChange}>
                <option value="">{placeholder}</option>
                {data.map((item, key) => (
                    <option value={item.value}>
                        {item.value}
                    </option>
                ))}
            </select>
        </div>
    )
};




export default Dropdown;
