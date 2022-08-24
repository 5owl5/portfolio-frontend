import React from "react";



const Award=()=>{
    let [isEditing,setisEditing]= useState(false)
    return(
        <>
        {
            isEditing ? (
                <></>
                // 편집창
            )
            :(
               <></>
                // 목록들
            )
        }
        </>
    )
}


export default Award