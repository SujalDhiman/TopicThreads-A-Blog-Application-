import { forwardRef, useId } from "react";

function Select({
    options=[],
    label,
    className="",
    ...props
},ref)
{
    const id=useId()
    return (
        <select {...props} ref={ref} id={id}  className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
            {
                options?.map((item)=>item?(
                    <option key={item} value={item} >
                        {item}
                    </option>
                ):null)
            }
        </select>
    )
}


export default forwardRef(Select)