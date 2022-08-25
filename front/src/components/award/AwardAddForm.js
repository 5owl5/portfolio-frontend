import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardAddForm=({portfolioOwnerId, setAwards, setIsAdding})=>{
    let [title,setTitle]=useState('')
    let [awardDetail, setAwardDetail]= useState('')
    const handleSubmit= async(e)=>{
        e.preventDefault();
        e.stopPropagation(); //이벤트버블링 방지
    
    const userId= portfolioOwnerId;

    await Api.post('award/create', {
        userId: portfolioOwnerId,
        title,
        awardDetail,
    });
    const res= await Api.get('awardList', userId)
    const update=res.data
    setAwards(update);
    }

    return(             
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type='text'
                    placeholder="수상내역"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </Form.Group>
            
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type='text'
                    placeholder="상세내역"
                    value={awardDetail}
                    onChange={(e)=>setAwardDetail(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span:20}}>
                    <Button variant="primary" type='submit' className="me-3">확인</Button>
                    <Button variant='secondary' onClick={()=>setIsAdding(false)}>취소</Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default AwardAddForm;