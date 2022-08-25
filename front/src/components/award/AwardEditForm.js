import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardEditForm=({currentAward,setAwards,setisEditing})=>{
    let [title, setTitle]= useState(currentAward?.title)
    let [awardDetail,setAwardDetil]= useState(currentAward?.awardDetail)
    const handleSubmit= async(e) =>{
        e.preventDefault()
        e.stopPropagation();
        const userId=currentAward.userId;
        await Api.put(`awards/${currentAward.id}`,{
            userId,
            title,
            awardDetail
        })

        const res= await Api.get('상목록',userId);
        const edit=res.data
        setAwards(edit)
        setisEditing(false)
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="texrt"
                    placeholder="수상내역"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder='상세내역'
                    value={awardDetail}
                    onChange={(e)=>setAwardDetil(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Row} className='mt-3 text-center mb-4'>
                <Col sm={{span:20}}>
                    <Button variant="primary" type='submit' className="me-3">확인</Button>
                    <Button variant='secondary' onClick={()=>{
                        setisEditing(false)
                    }}>취소</Button>
                </Col>
            </Form.Group>
        </Form>
        
    )
}

export default AwardEditForm;