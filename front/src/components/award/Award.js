import React from "react";
import AwardEditForm from "./AwardEditForm";


const Award=(award,setAwards,isEditable)=>{
    let [isEditing,setisEditing]= useState(false)
    return(
        <>
        {
            isEditing ? (
                <AwardEditForm
                    currentAward={award}
                    setAwards={setAwards}
                    setisEditing={setisEditing}
                />
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