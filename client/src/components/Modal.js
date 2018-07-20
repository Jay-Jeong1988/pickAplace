import React, {Component} from 'react';
import EvalGauge from './EvalGauge';

class Modal extends Component {

    constructor(props){
        super(props);

        this.state = {
            score: 0
        }
    }

    setScore = (score) => {
        console.log(score)
        this.setState({
            score: score
        })
    }

    render() {
        return (
            <main>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#eval_modal">
                    Launch demo modal
                </button>
                <div id="eval_modal" className="modal" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document" style={{marginTop: '200px', maxWidth: '600px'}}>
                        <div className="modal-content bg-primary" style={{height: '350px', opacity: '0.95',borderColor: 'white'}}>
                            <div className="modal-body">
                                <h1>How is price? </h1>
                                <h1 style={{fontSize: '80px'}}>{Math.round(this.state.score)}</h1>
                                <EvalGauge getScore={this.setScore} />
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
                </div>
            </main>
        )
    }
}

export default Modal;