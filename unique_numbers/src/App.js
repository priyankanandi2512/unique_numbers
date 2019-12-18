import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            value: ''
        }
        this.initialArray = [ 1,2,3,4,5];
    }

    render() {
        return (
            <div className="App">
                <input type="text" pattern="^[0-9]+[,0-9-]+"
                    onChange={this.handleChange} 
                    value={this.state.value}
                />
                <button onClick={this.handleSubmit}>
                    Submit 
                </button>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleSubmit = (e) => {
        const { value } = this.state;
        const numbers = value.split(',');
        const uniques = numbers.filter(this.onlyUnique);
        console.log(uniques); 
    }

    onlyUnique = (value, index, self) => self.indexOf(value) === index;
}

export default App;
