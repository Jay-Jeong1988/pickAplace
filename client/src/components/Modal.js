import React, {Component} from 'react';
import EvalGauge from './EvalGauge';

class Modal extends Component {

    constructor(props){
        super(props);

        this.state = {
            page: 1,
            price_score: 0,
            cozy_score: 0,
            luxury_score: 0,
            taste_score: 0,
            loud_score: 0,
            modern_score: 0,
            services_score: 0,
            recurrence_score: 0,
        }

    }

    setScore = (score) => {
        console.log(score)
        this.setState({
            ...this.state,
            price_score: score,
        })
    }

    getNextGauge = (event) => {
        event.preventDefault();
        const nextPageNum = this.state.page + 1;
        this.setState({
            ...this.state,
            page: nextPageNum
        })
    }

    getPrevGauge = (event) => {
        event.preventDefault();
        const prevPageNum = this.state.page - 1;
        this.setState({
            ...this.state,
            page: prevPageNum
        })
    }

    renderSwitch = (param) => {
        switch(param) {
            case 1:
            return (
                <div className="modal-body">
                    <h1>How is price? </h1>
                    <h1 style={{fontSize: '80px'}}>{Math.round(this.state.price_score)}</h1>
                    <EvalGauge getScore={this.setScore} />
                    <button className="btn btn-success" onClick={this.getNextGauge}>Next</button>
                </div>
            )
            break;
            case 2:
            return (
                <div className="modal-body">
                    <h1>How cozy is it? </h1>
                    <h1 style={{fontSize: '80px'}}>{Math.round(this.state.cozy_score)}</h1>
                    <EvalGauge getScore={this.setScore} />
                    <button className="btn btn-success" onClick={this.getPrevGauge}>Prev</button>
                    <button className="btn btn-success" onClick={this.getNextGauge}>Next</button>
                </div>
            )
            break;
            case 3:
            return (
                <div className="modal-body">
                    <h1>How clean is it? </h1>
                    <h1 style={{fontSize: '80px'}}>{Math.round(this.state.luxury_score)}</h1>
                    <EvalGauge getScore={this.setScore} />
                    <button className="btn btn-success" onClick={this.getPrevGauge}>Prev</button>
                    <button className="btn btn-success" onClick={this.getNextGauge}>Next</button>
                </div>
            )
            break;
            case 4:
            return (
                <div className="modal-body">
                    <h1>How is taste? </h1>
                    <h1 style={{fontSize: '80px'}}>{Math.round(this.state.taste_score)}</h1>
                    <EvalGauge getScore={this.setScore} />
                    <button className="btn btn-success" onClick={this.getPrevGauge}>Prev</button>
                    <button className="btn btn-success" onClick={this.getNextGauge}>Next</button>
                </div>
            )
            break;
            case 5:
            return (
                <div className="modal-body">
                    <h1>How loud is it? </h1>
                    <h1 style={{fontSize: '80px'}}>{Math.round(this.state.loud_score)}</h1>
                    <EvalGauge getScore={this.setScore} />
                    <button className="btn btn-success" onClick={this.getPrevGauge}>Prev</button>
                    <button className="btn btn-success" onClick={this.getNextGauge}>Next</button>
                </div>
            )
            break;
            case 6:
            return (
                <div className="modal-body">
                    <h1>How modern is it? </h1>
                    <h1 style={{fontSize: '80px'}}>{Math.round(this.state.modern_score)}</h1>
                    <EvalGauge getScore={this.setScore} />
                    <button className="btn btn-success" onClick={this.getPrevGauge}>Prev</button>
                    <button className="btn btn-success" onClick={this.getNextGauge}>Next</button>
                </div>
            )
            break;
            case 7:
            return (
                <div className="modal-body">
                    <h1>How is the services? </h1>
                    <h1 style={{fontSize: '80px'}}>{Math.round(this.state.services_score)}</h1>
                    <EvalGauge getScore={this.setScore} />
                    <button className="btn btn-success" onClick={this.getPrevGauge}>Prev</button>
                    <button className="btn btn-success" onClick={this.getNextGauge}>Next</button>
                </div>
            )
            break;
            case 8:
            return (
                <div className="modal-body">
                    <h1>Would you go there again? </h1>
                    <div style={{margin: '60px 0'}}>
                        <button style={{fontSize: '80px', borderColor:'white'}} className="btn btn-success" onClick={ () => this.setState({ ...this.state, recurrence_score: 1 }) }>Yes</button>
                        <button style={{fontSize: '80px', borderColor:'white'}} className="btn btn-danger" onClick={ () => this.setState({ ...this.state, recurrence_score: 0 }) }>No&nbsp;</button>
                    </div>
                    <button className="btn btn-success" onClick={this.getPrevGauge}>Prev</button>
                    <button className="btn btn-lg btn-secondary">Submit</button>
                </div>
            )
            break;
        }
    }

    render() {
        return (
            <main>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#eval_modal">
                    Rate this restaurant!
                </button>
                <div id="eval_modal" className="modal" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document" style={{marginTop: '200px', maxWidth: '600px'}}>
                        <div className="modal-content bg-primary" style={{height: '350px', opacity: '0.95',borderColor: 'white'}}>
                            { this.renderSwitch(this.state.page) }
                                {/* <form onSubmit={props.evaluate}>
                                    <label>price<input type="number" name="price"/></label>
                                    <label>sanitation<input type="number" name="luxury"/></label>
                                    <label>taste<input type="number" name="taste"/></label>
                                    <label>cozy<input type="number" name="cozy"/></label>
                                    <label>loud<input type="number" name="loud"/></label>
                                    <label>modern<input type="number" name="modern"/></label>
                                    <label>services<input type="number" name="services"/></label>
                                    <h4> Do you think you will go to this restaurant again?</h4>
                                    <div>
                                        <label><input type="radio" name="recurrence" value="true"/>yes</label>
                                    </div>
                                    <div>
                                        <label><input type="radio" name="recurrence" value="false"/>no</label>
                                    </div>

                                    <input className="btn btn-primary" type="submit" value="Done"/>
                                </form> */}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Modal;