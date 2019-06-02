import React, { Component } from 'react';
import './multiSelectDropdown.css';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDropdown: false,
            checkedOptions: [],
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.renderValues = this.renderValues.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    toggleDropdown = () => {
        this.setState({ openDropdown: !this.state.openDropdown });
    }

    renderValues = (checkedValues) => {
        let checkedOptions = [];
        checkedValues.map(option => checkedOptions.push(option.key));
        return checkedOptions.toString()
    }

    selectOption = (event, option) => {
        let selectedOption = this.state.checkedOptions;
        let staticOptionKeys = this.props.staticOptions.map(option => option.key); //remove static option if checking checkboxes
        if (event.target.nodeName === 'INPUT') {
            if (event.target.checked) {
                for (let x in staticOptionKeys) {
                    let staticIndex = selectedOption.findIndex(option => option.key === staticOptionKeys[x]);
                    if (staticIndex !== -1) {
                        selectedOption = [];
                    }
                }
                selectedOption.push(option);
                this.setState({ checkedOptions: selectedOption });
            }
            else {
                let optionIndex = selectedOption.findIndex(x => x.key == option.key);
                if (optionIndex !== -1) {
                    selectedOption.splice(optionIndex, 1);
                    this.setState({ checkedOptions: selectedOption });
                }
            }
        }
        if (event.target.nodeName === 'A') {
            selectedOption = [];
            selectedOption.push(option);
            this.setState({ checkedOptions: selectedOption });
        }
        this.props.getCheckedValues(selectedOption);
    }

    isChecked = (option) => {
        let checkedValues = this.state.checkedOptions;
        let index = checkedValues.findIndex(x => x.key === option.key);
        let checked = (index !== -1) ? true : false;
        return checked;
    }

    render() {
        debugger;
        let renderCheckedValues = this.renderValues(this.props.default);
        return (
            <div className="search-controls">
                <div className="dropdown wd130" style={{ margin: '60px' }}>
                    <button className="btn btn-default dropdown-toggle wd130 ht34" type="button" id="dropdownMenu1" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style={{ borderColor: '#b0bcd0', color: '#566f99', fontSize: '16px', background: '#F6FAFE' }}
                        onClick={() => this.toggleDropdown()}>
                        {renderCheckedValues}
                        <span className="caret mgL70"></span>
                    </button>

                    <ul className="dropdown-menu wd170" aria-labelledby="dropdownMenu1" style={{ height: '250px', overflowY: 'scroll', display: this.state.openDropdown ? 'block' : 'none' }}>

                        {this.props.staticOptions && this.props.staticOptions.map((res, index) => {
                            return (
                                <li key={index}>
                                    <a onClick={(event) => {
                                        this.toggleDropdown();
                                        this.selectOption(event, res)
                                    }
                                    }>
                                        {res.key}
                                    </a>
                                </li>
                            )
                        })}

                        <li role="separator" className="v-line" style={{ border: '1px solid rgb(227, 232, 238)' }}></li>

                        {this.props.checkboxOptions && this.props.checkboxOptions.map((res, index) => {
                            return (
                                <li className="checkbox-menu" key={index}>
                                    <a>
                                        <span className="rc-checkbox">
                                            <input type="checkbox" className="rc-checkbox-input" onChange={(event) => this.selectOption(event, res)}
                                                checked = {this.isChecked(res)} />
                                            <span className="rc-checkbox-inner"></span>
                                        </span>{res.key}
                                    </a>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </div>
        )
    }
}
export default Dropdown;
