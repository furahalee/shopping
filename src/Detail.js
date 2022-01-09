import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { 재고context } from "./App.js";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";

let 박스 = styled.div`
  padding: 20px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

// class Detail2 extends React.Component {
//   componentDidMout(){

//   }
//   componentWillUnmount(){

//   }
// }

//detail 페이지 방문 후 alert창이 2초 후에 사라지게
function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState("");

  let [누른탭, 누른탭변경] = useState(0);

  let 재고 = useContext(재고context);

  useEffect(() => {
    //Detail 컴포넌트 로드시 ajax로 데이터를 가져오고 싶을 때
    //Detail컴포넌트 등장 &업데이트시 실행할 코드
    //axios.get()
    //업데이트 시 실행 안되게 마지막에 콤마, 대괄호 잊지 말것

    //세일 마감 알람
    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);
    return () => {
      clearTimeout(타이머);
    };
  }, []);

  let history = useHistory();
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id;
  });

  return (
    <div className="container">
      <박스>
        <제목 색상={"red"}>상세페이지</제목>
        <제목 className="red">보기</제목>
      </박스>
      {inputData}
      <input
        onChange={(e) => {
          inputData변경(e.target.value);
        }}
      />
      {alert === true ? (
        <div className="my-alert">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>

          <Info 재고={props.재고}></Info>

          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 11, 12]);
              props.dispatch({ type : '항목추가', payload : {id:2, name:'새로운상품', quan:1} })
              history.push('/cart');
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{누른탭변경(0)}}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{누른탭변경(1)}}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 누른탭={누른탭}/>
      
    </div>
  );
}

function TabContent(props){
  if(props.누른탭 ===0){
    return (<div>0번째 내용입니다.</div>)
  }else if(props.누른탭 ===1){
    return (<div>1번째 내용입니다.</div>)
  }else if(props.누른탭 === 2){
    return (<div>1번째 내용입니다.</div>)
  }
}

function Info(props) {
  return <p>재고: {props.재고[0]}</p>;
}

function state를props화(state){
  console.log(state)
  return {
    state : state.reducer,
    alert열렸니 : state.reducer2
  }
}
export default connect(state를props화)(Detail)