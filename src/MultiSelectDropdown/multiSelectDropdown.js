import React, { Component } from 'react';
import Modal from "react-modal";    
import Dropdown from './dropdown';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '70%',
        width: '60%',
        background: 'bisque',
    }
};

Modal.setAppElement('#root');

class MultiSelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupValue: [{key: 'Any', value: '0'}],
        }
        this.fetchCheckedValues = this.fetchCheckedValues.bind(this);
    }

    fetchCheckedValues = (groups) => {
        console.log('groups checked', groups);
        this.setState({groupValue: groups});
    }
 
    render() {
        debugger;
        const staticOptions = [{key: 'Any', value: '0'}, {key: 'CurrentGroup', value: '1'}];
        const checkboxOptions = [{key:'G&A', value: '1'}, {key: 'DirSls', value: '2'}, {key:'IndSls', value: '3'}, {key: 'Prcrmt', value: '4'},
    {key: 'TechOp', value: '5'}, {key: 'ITCost', value: '6'}, {key: 'Price', value: '7'}, {key: 'Growth', value: '8'}]
        return (
            <Modal isOpen={this.props.isOpen} style={customStyles} contentLabel="Dropdown Modal">
                <button type="button" className="btn btn-outline-dark" onClick={this.props.toggle}>Close</button>
                <Dropdown 
                groupId="group"
                staticOptions={staticOptions}
                checkboxOptions= {checkboxOptions}
                default={this.state.groupValue}
                getCheckedValues={this.fetchCheckedValues}
                />
            </Modal>
        )
    }
}
export default MultiSelectDropdown;
