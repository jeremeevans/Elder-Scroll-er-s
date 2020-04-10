import React from 'react';
import Card from './components/card';
import cardService from './services/card-service';
import { Container, Row, Col } from 'react-grid-system';
import styled from '@emotion/styled';
import Sticky from "react-stickynode";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getParameterByName } from './utilities';

const SearchForm = styled.form`
  margin-bottom: 1rem;
  display: flex;

  input, button {
    padding: .5rem;
    border: 1px solid rgb(26,26,51);
  }

  input {
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
    flex-grow: 1;
    border-right-style: dotted;
  }

  button {
    background: rgb(0,94,0);
    color: rgb(239,239,247);
    font-weight: bold;
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
    flex-grow: 0;
    border-left: none;
    cursor: pointer;
    transition: background-color cubic-bezier(0.23, 1, 0.320, 1) .6s;

    &:hover {
      background: rgb(0,55,0);
    }
  }
`;

const SearchRow = styled(Row)`
  z-index: 100;
  position: relative;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    const searchName = getParameterByName("search-name");
    this.state = { cards: [], searchName: searchName ? searchName : '', nextPage: 1, hasMore: true };
  }

  componentDidMount = async () => {
    await this.loadCards();
  }

  loadCards = async () => {
    const page = await cardService.getPage(this.state.nextPage, this.state.searchName);
    const withAddedCards = this.state.cards.concat(page.cards);
    const hasMore = page.total > withAddedCards.length;

    this.setState({
      cards: withAddedCards,
      hasMore: hasMore,
      nextPage: (this.state.nextPage + 1)
    });
  }

  searchByName = async (event) => {
    event.preventDefault();
    window.location = `${window.location.origin}?search-name=${this.state.searchName}`;
  }

  nameChanged = (event) => {
    this.setState({ searchName: event.target.value });
  }

  render = () => {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <a href="/">
                <h1>Elder Scrolls Cards</h1>
              </a>
            </Col>
          </Row>
          <SearchRow>
            <Col md={6} lg={4}>
              <Sticky top={10}>
                <SearchForm onSubmit={this.searchByName}>
                  <input placeholder="Name" value={this.state.searchName} onChange={this.nameChanged} onKeyDown={this.onKeyDown} />
                  <button type="button" onClick={this.searchByName}>Search</button>
                </SearchForm>
              </Sticky>
            </Col>
          </SearchRow>
        </Container>
        <InfiniteScroll
          dataLength={this.state.cards.length}
          next={this.loadCards}
          hasMore={this.state.hasMore}
          loader={<Container>
            <Row>
              <Col>
                <h4>Loading...</h4>
              </Col>
            </Row>
          </Container>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          <Container>
            <Row>
              {this.state.cards.map((card) =>
                <Col key={card.id} md={6} lg={4}>
                  <Card {...card}></Card>
                </Col>)}
            </Row>
          </Container>
        </InfiniteScroll>
      </>
    );
  }
}

export default App;
