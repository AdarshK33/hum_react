import React from 'react';

const Dropdown2 = ({value, data, placeholder, styleClass, onChange}) => {

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
                    <option key={key} value={item.value}>
                        {item.value}
                    </option>
                ))}
            </select>
        </div>
    )
};




export default Dropdown2;
