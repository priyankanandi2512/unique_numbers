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
                <input type="text"
                    onChange={this.handleChange}
                    value={this.state.inputValue}
                />
                <button onClick={this.handleSubmit}>
                    Submit
                </button>
                {this.state.error ? <div className="error"> Invalid Input</div>
                : (<React.Fragment>
                    <div>
                    { (this.state.duplicatesArr.length > 0 &&
                     <div>{this.state.duplicatesArr.toString()} are duplicates and will be skipped.</div>)
                    }
                    </div>
                    <div>
                    {
                   (this.state.uniques.length > 0 && <div> Unique numbers are {this.state.uniques.toString()} </div>)
                   }
                   </div>
                   </React.Fragment>)
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
        const uniqueNumersCount = this.existingArray.length - duplicates.length;
        this.setState({ uniqueNumersCount, uniques, duplicatesArr: duplicates });
        console.log('duplicates from existing are:', duplicates);
        console.log('unique array count is:', this.existingArray.length - duplicates.length);
    }

    onlyUnique = (value, index, self) => self.indexOf(value) === index;
}
