import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'

/**Component and api imports */
import * as bookApi from './BooksApi'
import SearchScreen from './components/SearchScreen'
import ShelfScreen from './components/ShelfScreen'

class App extends Component {
  
  state = {
    shelvedBooks: []
  }

  componentDidMount() {
    bookApi.getAll()
    .then((books) => {
      if(books.length > 0) {
        this.setState({
          shelvedBooks: [...books]
        })
      }
    })
  }

  toTop = (evt) => {
    evt.preventDefault()
    window.scrollTo({ top: 0, left:0, behavior: 'smooth' })
  }

  //clones the current shelved books and finds the book that matches the one who's shelf has changed
  //then replaces said books' shelf property to the new one and sets the new state to show this
  updateBook = (newDeets) => {
    console.log('update book', newDeets.book)
    bookApi.update(newDeets.book, newDeets.shelf)
    .then(() =>
      bookApi.getAll()
    )
    .then(books => {
      console.log('updated books', books)
      this.setState({
        shelvedBooks: [...books]
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
            <div>
              <ShelfScreen shelvedBooks={this.state.shelvedBooks} updateBook={this.updateBook} />
              <footer onClick={this.toTop}>To Top</footer>
            </div>
          )}
        />
        <Route path={'/search'} render={() => (
            <SearchScreen updateBook={this.updateBook} shelvedBooks={this.state.shelvedBooks} />
          )}
        />
      </div>
    )
  }
}

export default App;
