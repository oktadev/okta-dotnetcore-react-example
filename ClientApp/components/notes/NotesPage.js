import React from 'react';
import $ from 'jquery';

export default class NotesPage extends React.Component{
  constructor(){
    super();
    this.state = { notes: [] };
  }

  componentDidMount(){
    $.get("/api/notes")
      .done((data) => {
        this.setState({ notes: data });
      })
      .fail(err => console.error(err));
  }

  render() {
    return (
      <section>
        <h1>My Notes</h1>
        <ul>
          {
            this.state.notes.map(note => {
              return <li>{note.message}</li>;
            })
          }
        </ul>
      </section>
    )
  }
}