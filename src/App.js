import React, { Component } from "react";
import styled from "styled-components";
import Runs from "./Runs";
import Faq from "./Faq";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppHeader = styled.div`
  background-color: white;
  align-items: center;
  justify-content: center;
  color: black;
  margin: auto;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-family: "Roboto Condensed";
  font-size: 3em;
`;

const Counter = styled.div`
  opacity: 0.4;
  font-weight: bold;
  font-family: "Roboto Condensed";
`;

const Button = styled.div`
  cursor: pointer;
  font-weight: bold;
  padding: 10px 40px;
  border: 1px solid black;
  font-family: "Roboto Condensed";
  color: #333;
  &:hover {
    background: #333;
    color: white;
  }
  text-decoration: none;
`;

const TheEnd = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  max-width: 880px;
  a {
    color: white;
  }
`;

const ButtonContainer = styled.div`
  flex-direction: row;
  display: flex;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    text-align: center;
  }
`;

class HeaderButtons extends Component {
  state = {
    faq: false,
  };

  render() {
    return (
      <>
        {this.state.faq ? <Faq /> : null}

        <ButtonContainer>
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.youtube.com/watch?v=Yb7ZIl3Qaes"
          >
            <Button>Watch the video</Button>
          </a>
          <div style={{ width: 10, height: 10 }} />
          <Button
            onClick={() => {
              this.setState((prevState) => ({
                faq: !prevState.faq,
              }));
            }}
          >
            FAQ
          </Button>
          <div style={{ width: 10, height: 10 }} />
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer noopener"
            href="https://twitter.com/JNYBGR"
          >
            <Button>@JNYBGR</Button>
          </a>
        </ButtonContainer>
      </>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Container>
        <AppHeader>
          <Title>RAN EVERY DAY</Title>
          <Counter>19.2.2016 - 16.12.2020</Counter>
          <div style={{ flex: 1 }} />
          <div style={{ height: 20 }} />
          <HeaderButtons />
          <div style={{ height: 20 }} />
          <div style={{ maxWidth: 900 }}>
            <TheEnd>
              My Run Every Day challenge ended after 1763 days on December 16th,
              2020, after I got Corona. This was the best thing I ever did and I
              have no regrets.{" "}
              <a
                href="https://twitter.com/JNYBGR/status/1339993707957903364"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch my farewell video!
              </a>
            </TheEnd>
          </div>
        </AppHeader>
        <div style={{ flex: 1 }}>
          <Runs />
        </div>
      </Container>
    );
  }
}

export default App;
