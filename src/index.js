import React from 'react';
import ReactDOM from 'react-dom';
import './res/style/index.css';

class Form extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<form onSubmit={e => {e.preventDefault(); this.clickAddBtn()}}>
				<input type='text' name='textNote' placeholder='Enter your Note' ref={(input) => { this.textNote = input; }} />
				<input type='button' value='+' onClick={() => this.clickAddBtn()} />
			</form>
		);
	}
	
	clickAddBtn() {
		const t = this.textNote.value;
		if(t && t.length > 0) {
			this.props.addNote(t);
			this.textNote.value = '';
			this.textNote.focus();
		}
	}
}

class Notes extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	renderNotes() {
		const notes = this.props.value.map((singleItem, index) =>
			<div className='noteItem' key={index}>
				<div className='Note'>{singleItem}</div><button onClick={() => this.props.delNote(index)} title='Delete this Note'>X</button>
			</div>
		);
		return (
			<div className='items'>{notes}</div>
		);
	}
			
	render() {
		return (
			<div className='Notes'>
				{this.renderNotes()}
			</div>
		);
	}
}

function Header(props) {
	return (
		<div className='Header'>
			{props.value}
		</div>
	);
}

function Bottom(props) {
	return (
		<div className='Bottom'>
			Created by {props.value}
		</div>
	);
}

class Desk extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			Title: 'Simple ToDo App',
			Author: 'Sergey Novik',
			NotesArr: Array()
		}
	}
		
	clickAddBtn = (textNote) => {
		let nts = this.state.NotesArr.slice();
		let note = textNote;
		if(note && note.length > 0) {
			nts.unshift(note);
			this.setState({NotesArr: nts});
		}
		else alert('Error!');
	}
	
	clickDelBtn = (index) => {
		let nt = this.state.NotesArr.slice();
		nt.splice(index, 1);
		this.setState({NotesArr: nt});
	}
	
	render() {
		return (
			<div className='todoapp'>
				<Header value={this.state.Title} />
				<div className='desk'>
					<div className='inputForm'>
						<Form addNote={this.clickAddBtn} />
					</div>
					<Notes value={this.state.NotesArr} delNote={this.clickDelBtn} />
				</div>
				<Bottom value={this.state.Author} />
			</div>
		);
	}
}

ReactDOM.render(
	<Desk />,
	document.getElementById('root')
)