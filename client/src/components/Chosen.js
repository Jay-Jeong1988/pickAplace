import React, { Component } from 'react';
import $ from 'jquery';
import "chosen-js/chosen.jquery.js";
import "chosen-js/chosen.css";


class Chosen extends Component {

    constructor(props) {
        super(props)
    }


    componentDidMount(){
        this.$el = $(this.el);
        this.$el.chosen();
    }

    componentWillUnmount(){
        this.$el.chosen('destroy');
    }
    render() {
        return (
            <div>
                <select className="Chosen-select" ref={ el => this.el = el }>
                    { this.props.children }
                </select>
            </div>
        )
    }
}

export default Chosen;