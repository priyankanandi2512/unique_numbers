import React from 'react';
import './unique-number.css';

export default class UniqueNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            duplicatesArr: [],
            uniques: [],
            error: false,
        }
        this.existingArray = [1, 2, 3, 4, 5];
    }

    render() {
        return (
            <div className="App">
                <div className="inp">
                    <input type="text"
                        onChange={this.handleChange}
                        value={this.state.inputValue}
                    />
                    <button className="submit-btn" onClick={this.handleSubmit}>
                        Submit
                </button>
                </div>
                {this.state.error ? <div className="error">Please Enter Valid Input!</div>
                    : (<div>
                        <div className="result">
                            {(this.state.duplicatesArr.length > 0 &&
                                <div>{this.state.duplicatesArr.toString()} are duplicates and will be skipped.</div>)
                            }
                        </div>
                        <div className="result">
                            {
                                (this.state.uniques.length > 0 && <div> Unique numbers are {this.state.uniques.toString()} </div>)
                            }
                        </div>
                    </div>)
                }
            </div>
        );
    }

    handleChange = (e) => {
        const inputValue = e.target.value;
        const values = inputValue.split(",");
        let i = 0;
        for (i = 0; i < values.length; i++) {
            const val = values[i];
            if (!(/^[0-9]+(-[0-9]+){0,1}$/g.test(val))) {
                break;
            }
        };
        if (i === values.length) {
            this.setState({ error: false });
        }
        else {
            this.setState({ error: true });
        }
        this.setState({ inputValue })
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
        const uniques = this.existingArray.filter(val => !uniqueNumbers.includes(val));
        this.setState({ uniques, duplicatesArr: duplicates });
    }

    onlyUnique = (value, index, self) => self.indexOf(value) === index;
}
