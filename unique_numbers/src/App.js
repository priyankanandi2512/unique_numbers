import React from 'react';
import './App.css';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
        this.existingArray = [1, 2, 3, 4, 5];
    }

    render() {
        return (
            <div className="App">
                <input type="text"
                    onChange={this.handleChange}
                    value={this.state.inputValue}
                />
                <button onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    getNumbers = (acc, num) => {
        if (num.split("-").length === 2) {
            const range = num.split("-");
            const rangeStart = parseInt(range[0]);
            const rangeEnd = parseInt(range[1]);
            const list = [];
            for (var i = rangeStart; i <= rangeEnd; i++) {
                list.push(i);
            }
            acc = acc.concat(list);
        }
        else if (!isNaN(parseInt(num))) {
            const intVal = parseInt(num);
            acc.push(intVal);
        }
        return acc;

    }
    handleSubmit = (e) => {
        const { inputValue } = this.state;
        const numbers = inputValue.split(',').reduce(this.getNumbers, []);
        const uniqueNumbers = numbers.filter(this.onlyUnique);
        const duplicates = this.existingArray.filter(val => uniqueNumbers.includes(val));
        console.log('duplicates from existing are:', duplicates);
        console.log('unique array count is:', this.existingArray.length - duplicates.length);
    }

    onlyUnique = (value, index, self) => self.indexOf(value) === index;
}

export default App;
