import React, { Component } from 'react';
import $ from 'jquery';
import "chosen-js/chosen.jquery.js";
import "chosen-js/chosen.css";


class Chosen extends Component {


    componentDidMount(){
        this.$el = $(this.el);
        this.$el.chosen({width: this.props.w, 
                        allow_single_deselect: true,
                        no_results_text: 'Oops, nothing found!',
                        });

        this.handleChange = this.handleChange.bind(this);
        this.$el.on('change', this.handleChange);
    }

    componentWillUnmount(){
        this.$el.off('change', this.handleChange);
        this.$el.chosen('destroy');
    }

    componentDidUpdate(prevProps) {
        if( prevProps.childeren !== this.props.childeren ){
            this.$el.trigger('chosen:updated');
        }
    }

    handleChange(event){
        this.props.onChange(event.target.value)
    }

    render() {
        return (
            <div>
                <select className="Chosen-select" ref={ el => this.el = el }
                        data-placeholder={this.props.placeholder} name={this.props.name}>
                    { this.props.children }
                </select>
            </div>
        )
    }
}

export default Chosen;