import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
    { label: "Morning", value: "grapes" },
    { label: "Evening", value: "mango" },
    { label: "Afternoon", value: "strawberry" },
];

const Example = () => {
    const [selected, setSelected] = useState<{ label: string, value: string }[]>([]);

    function setSelectedDings(e: { label: string, value: string }[]) {

        setSelected(prev => e.filter(i => !prev.includes(i)))
    }

    return (
        <div>
            <MultiSelect
                // className={ }
                options={options}
                value={selected}
                onChange={setSelectedDings}
                labelledBy="Select"
                isCreatable={true}
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