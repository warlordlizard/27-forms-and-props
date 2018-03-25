'use strict';

import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import request from 'superagent';

const API_URL = `https://www.reddit.com/r`;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      boardName: '',
      limit: 0,
    };
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleLimitChange(e) {
    if((e.target.value > 0) && (e.target.value < 100)) {
      this.setState({ limit: e.target.value });
    }
  }

  handleBoardNameChange(e) {
    this.setState({boardName: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    if ((this.state.boardName !== '' )&&(this.state.limit !== '')) {
      this.props.handleSearch(this.state.boardName, this.state.limit);
    } 
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.error ? 'formError' : 'formValid'}>
        <input 
          type='text'
          name='boardName'
          placeholder='enter board name'
          required
          value={this.boardName}
          onChange={this.handleBoardNameChange} />
        <input 
          type='number'
          name='limit'
          required
          min='1'
          max='99'
          placeholder='enter number between 1 and 100 to set how may results you would like'
          value={this.limit}
          onChange={this.handleLimitChange} />
        <button type="submit">Find Topics</button>
      </form>
    );
  }
}
class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.topics ?
          <section>
            <h2>Results</h2>
            <ul>
              {this.props.topics.map((item, i) => {
                  
                return (
                  <li key={i}>
                    <h4>{i+1}</h4><a href={item.data.url}><h3>   .  {item.data.title}</h3></a><p>{item.data.ups} upvotes</p>
                  </li>
                );
              })}
            </ul> 
          </section> :
          <div>
            <p>nada</p>
          </div>
        }
      </div> 
      
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics:[],
      error: null,
    };
    // this.handleTopics = this.handleTopics.bind(this);
    this.getApp = this.getApp.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(boardName, limit) {
    request.get(`${API_URL}/${boardName}.json?limit=${limit}`)
      .then(res => { 
        let topics = res.body.data.children;
        let topics2 = topics.filter(topics => !topics.data.stickied);
        return topics2;
      })
      .then(topics => this.setState({topics, error: null}))
        
      .catch(err => {
        this.setState({
          topics: null,
          error: err,
        });
      });
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }


  getApp() {
    return{
      state: this.state,
      setState: this.setState.bind(this),
    };
  }

  render() {
    return(
      
      <section className='app'>
        <h2>Search Form</h2>
        <SearchForm handleSearch={this.handleSearch} error={this.state.error}/>
        <div>
          <SearchResultList topics={this.state.topics} />
        </div>
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));

