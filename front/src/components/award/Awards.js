import React, {useState, useEffect} from 'react'
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

const Awards=({portfolioOwnerId, isEditable})=>{
    let [awards, setAwards]= useState([]);
    let [isAdding,setIsAdding]=useState(false);

    useEffect(()=>{
        Api.get('awardlist', portfolioOwnerId)
            .then((result)=>setAwards(result.data))
    },[portfolioOwnerId]);

    return(
        <Card>
            <Card.Body>
                <Card.Title>수상이력</Card.Title>
                {/* awards 맵으로 데이터 변환 */}
                {isEditable && (
                    <Row className='mt-3 text-center mb-4'>
                        <Col sm={{span:20}}>
                            <Button onClick={()=> setIsAdding(true)}>+</Button>
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    // 어워드 추가하는 창 뜨게 하면 된다
                )}
            </Card.Body>
        </Card>
    )
}



export default Awards;