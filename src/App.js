/* eslint-disable */
import React, { useState, useContext } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import "./App.css";
import Data from "./data.js";
import Detail from "./Detail.js";
import axios from "axios";

import { Link, Route, Switch } from "react-router-dom";
import Cart from "./Cart.js";
export let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);
  //재고데이터
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link> */}
              <Nav.Link as={Link} to="/"></Nav.Link>
              <Nav.Link as={Link} to="/detil"></Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className="background">
            <h1>Season off</h1>
          </div>
          <div className="container">
            <재고context.Provider value={재고}>
              <div className="row">
                {shoes.map(function (a, i) {
                  return <Card shoes={a} i={i} key={i}></Card>;
                })}
              </div>
            </재고context.Provider>
            <button
              className="btn btn-primary"
              onClick={() => {
                //axios.post('서버URL', { id: 'eefe', pw: 1234 });
                //요청시의 header  설정도 가능

                //로딩중이라는 UI 띄움
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    // let newArray = [...shoes];
                    // for(var i=0; i<result.data.length; i++){
                    //   newArray.push(result.data[i]);
                    // }
                    // shoes변경(newArray);
                    shoes변경([...shoes, ...result.data]); //...은 대괄호 벗겨서 집어넣기
                    //로딩중이라는 UI안보이게 처리
                  })
                  .catch(() => {
                    //로딩중이라는 UI안보이게 처리
                    console.log("실패");
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
          </재고context.Provider>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
        <Route path="/:id">
          <div>아무거나 적었을 때</div>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {
  let 재고 = useContext(재고context);
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content}&{props.shoes.price}
      </p>
      <p>재고: {재고[props.i]}</p>
      <Test></Test>
    </div>
  );
}

function Test() {
  let 재고 = useContext(재고context);
  return <p>{재고[0]}</p>;
}
export default App;
