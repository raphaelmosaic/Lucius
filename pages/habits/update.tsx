import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
    { label: "Morning", value: "grapes" },
    { label: "Evening", value: "mango" },
    { label: "Afternoon", value: "strawberry" },
];

const Example = () => {
    const [selected, setSelected] = useState([]);

    return (
        <div>
            <h1>Select Fruits</h1>
            <pre>{JSON.stringify(selected)}</pre>
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
                isCreatable={true}
                onCreateOption={(e: any) => console.log(e)}
                hasSelectAll={false}
                closeOnChangedValue={true}
                ItemRenderer={({ checked, option, onClick }: any) =>

                    <div onClick={onClick}>{option.label}</div>
                }
            />
        </div>
    );
};

export default Example;