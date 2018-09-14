//Provider is like any other React component, we will wrap everything inside
// the provider component
import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results"
      };
    case "CLEAR_TRACKS":
      return {
        ...state,
        track_list: []
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 Tracks", //Changes to 'Search Results" later on
    dispatch: action =>
      this.setState(state => {
        return reducer(state, action);
      })
  };
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(({ data: { message: { body: { track_list } } } }) => {
        this.setState({ track_list });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

//We import below in our components to access the value inside Context
export const Consumer = Context.Consumer;
// Above is similar to connect() from react-redux
