import React, {Component} from 'react';
import EvalGauge from './EvalGauge';

class Modal extends Component {

    constructor(props){
        super(props);

        this.state = {
            page: 1,
            price_score: 0,
            price_comment: '',
            cozy_score: 0,
            cozy_comment: '',
            luxury_score: 0,
            luxury_comment: '',
            taste_score: 0,
            taste_comment: '',
            loud_score: 0,
            loud_comment: '',
            modern_score: 0,
            modern_comment: '',
            services_score: 0,
            services_comment: '',
            recurrence_score: false,
        }

    }

    setScore = (key, score) => {
        console.log(score)
        switch(key){
            case 'price':
            this.setState({
                ...this.state,
                price_score: score,
            })
            break;
            case 'cozy':
            this.setState({
                ...this.state,
                cozy_score: score,
            })
            break;
            case 'luxury':
            this.setState({
                ...this.state,
                luxury_score: score,
            })
            break;
            case 'taste':
            this.setState({
                ...this.state,
                taste_score: score,
            })
            break;
            case 'loud':
            this.setState({
                ...this.state,
                loud_score: score,
            })
            break;
            case 'modern':
            this.setState({
                ...this.state,
                modern_score: score,
            })
            break;
            case 'services':
            this.setState({
                ...this.state,
                services_score: score,
            })
            break;
            default:
        }
    }

    setComment = (key, score) => {
        let Lv = '';
        switch(key){
            case 'price':
                if(score > 95) Lv = "almost free";
                else if(score > 86) Lv = "very cheap";
                else if(score > 65) Lv = "cheap";
                else if(score >= 50) Lv = "fair";
                else if(score > 37) Lv = "little pricy";
                else if(score > 20) Lv = "pricy";
                else if(score > 0) Lv = "very pricy";
                this.setState({
                    ...this.state,
                    price_comment: Lv
                })
            break;
            case 'cozy':
                if(score > 95) Lv = "My second home";
                else if(score > 86) Lv = "Very cozy";
                else if(score > 65) Lv = "Cozy";
                else if(score >= 50) Lv = "So so";
                else if(score > 37) Lv = "Not really cozy";
                else if(score > 20) Lv = "Uncomfortable";
                else if(score > 0) Lv = "Very uncomfortable";
                this.setState({
                    ...this.state,
                    cozy_comment: Lv
                })
            break;
            case 'luxury':
                if(score > 95) Lv = "White room";
                else if(score > 86) Lv = "Very clean";
                else if(score > 65) Lv = "Clean";
                else if(score >= 50) Lv = "Normal";
                else if(score > 37) Lv = "Not so clean";
                else if(score > 20) Lv = "Needs to be cleaned";
                else if(score > 0) Lv = "Very unsanitary";
                this.setState({
                    ...this.state,
                    luxury_comment: Lv
                })
            break;
            case 'taste':
                if(score > 95) Lv = "Unbelievably tasty";
                else if(score > 86) Lv = "Very delicious";
                else if(score > 65) Lv = "Tasty";
                else if(score >= 50) Lv = "Fair";
                else if(score > 37) Lv = "Not bad";
                else if(score > 20) Lv = "Not good";
                else if(score > 0) Lv = "Awful";
                this.setState({
                    ...this.state,
                    taste_comment: Lv
                })
            break;
            case 'loud':
                if(score > 95) Lv = "Heavy metal concert";
                else if(score > 86) Lv = "Very loud";
                else if(score > 65) Lv = "Loud";
                else if(score >= 50) Lv = "Normal";
                else if(score > 37) Lv = "Quiet";
                else if(score > 20) Lv = "Peaceful";
                else if(score > 0) Lv = "Silent";
                this.setState({
                    ...this.state,
                    loud_comment: Lv
                })
            break;
            case 'modern':
                if(score > 95) Lv = "Future interior";
                else if(score > 86) Lv = "Very fancy";
                else if(score > 65) Lv = "Fancy";
                else if(score >= 50) Lv = "Ordinary";
                else if(score > 37) Lv = "Classic";
                else if(score > 20) Lv = "Old";
                else if(score > 0) Lv = "Middle Ages";
                this.setState({
                    ...this.state,
                    modern_comment: Lv
                })
            break;
            case 'services':
                if(score > 95) Lv = "The best services ever";
                else if(score > 86) Lv = "Very nice services";
                else if(score > 65) Lv = "Good sevices";
                else if(score >= 50) Lv = "Fair services";
                else if(score > 37) Lv = "Not good";
                else if(score > 20) Lv = "Definitely not good";
                else if(score > 0) Lv = "Awful services";
                this.setState({
                    ...this.state,
                    services_comment: Lv
                })
            break;
            default:
        }
        
       
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
                    <div style={{height: '182px'}}>
                        <h1>How is price? </h1>
                        <h1 style={{fontSize: '80px'}}>{Math.round(this.state.price_score)}</h1>
                        <h3>{this.state.price_comment.toUpperCase()}</h3>
                    </div>
                    <EvalGauge getScore={this.setScore} setComment={this.setComment} entry="price" />
                    <button className="btn btn-info nextPage" onClick={this.getNextGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow next"/>Next</button>
                </div>
            )
            case 2:
            return (
                <div className="modal-body">
                    <div style={{height: '182px'}}>
                        <h1>How cozy is it? </h1>
                        <h1 style={{fontSize: '80px'}}>{Math.round(this.state.cozy_score)}</h1>
                        <h3>{this.state.cozy_comment.toUpperCase()}</h3>
                    </div>
                    <EvalGauge getScore={this.setScore} setComment={this.setComment}entry="cozy"/>
                    <button className="btn btn-info prevPage" onClick={this.getPrevGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow prev"/>Prev</button>
                    <button className="btn btn-info nextPage" onClick={this.getNextGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow next"/>Next</button>
                </div>
            )
            case 3:
            return (
                <div className="modal-body">
                    <div style={{height: '182px'}}>
                        <h1>How clean is it? </h1>
                        <h1 style={{fontSize: '80px'}}>{Math.round(this.state.luxury_score)}</h1>
                        <h3>{this.state.luxury_comment.toUpperCase()}</h3>
                    </div>
                    <EvalGauge getScore={this.setScore} setComment={this.setComment}entry="luxury"/>
                    <button className="btn btn-info prevPage" onClick={this.getPrevGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow prev"/>Prev</button>
                    <button className="btn btn-info nextPage" onClick={this.getNextGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow next"/>Next</button>
                </div>
            )
            case 4:
            return (
                <div className="modal-body">
                    <div style={{height: '182px'}}>
                        <h1>How is taste? </h1>
                        <h1 style={{fontSize: '80px'}}>{Math.round(this.state.taste_score)}</h1>
                        <h3>{this.state.taste_comment.toUpperCase()}</h3>
                    </div>
                    <EvalGauge getScore={this.setScore} setComment={this.setComment}entry="taste"/>
                    <button className="btn btn-info prevPage" onClick={this.getPrevGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow prev"/>Prev</button>
                    <button className="btn btn-info nextPage" onClick={this.getNextGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow next"/>Next</button>
                </div>
            )
            case 5:
            return (
                <div className="modal-body">
                    <div style={{height: '182px'}}>
                        <h1>How loud is it? </h1>
                        <h1 style={{fontSize: '80px'}}>{Math.round(this.state.loud_score)}</h1>
                        <h3>{this.state.loud_comment.toUpperCase()}</h3>
                    </div>
                    <EvalGauge getScore={this.setScore} setComment={this.setComment}entry="loud"/>
                    <button className="btn btn-info prevPage" onClick={this.getPrevGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow prev"/>Prev</button>
                    <button className="btn btn-info nextPage" onClick={this.getNextGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow next"/>Next</button>
                </div>
            )
            case 6:
            return (
                <div className="modal-body">
                    <div style={{height: '182px'}}>
                        <h1>How modern is it? </h1>
                        <h1 style={{fontSize: '80px'}}>{Math.round(this.state.modern_score)}</h1>
                        <h3>{this.state.modern_comment.toUpperCase()}</h3>
                    </div>
                    <EvalGauge getScore={this.setScore} setComment={this.setComment}entry="modern"/>
                    <button className="btn btn-info prevPage" onClick={this.getPrevGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow prev"/>Prev</button>
                    <button className="btn btn-info nextPage" onClick={this.getNextGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow next"/>Next</button>
                </div>
            )
            case 7:
            return (
                <div className="modal-body">
                    <div style={{height: '182px'}}>
                        <h1>How is the services? </h1>
                        <h1 style={{fontSize: '80px'}}>{Math.round(this.state.services_score)}</h1>
                        <h3>{this.state.services_comment.toUpperCase()}</h3>
                    </div>
                    <EvalGauge getScore={this.setScore} setComment={this.setComment}entry="services"/>
                    <button className="btn btn-info prevPage" onClick={this.getPrevGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow prev"/>Prev</button>
                    <button className="btn btn-info nextPage" onClick={this.getNextGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow next"/>Next</button>
                </div>
            )
            case 8:
            return (
                <div className="modal-body">
                    <h1>Would you go there again? </h1>
                    <div style={{margin: '60px 0'}}>
                        <button style={{fontSize: '80px', borderColor:'white'}} className="btn btn-success" onClick={this.onRecurrenceButton}>Yes</button>
                        <button style={{fontSize: '80px', borderColor:'white'}} className="btn btn-danger" onClick={this.onRecurrenceButton}>No&nbsp;</button>
                    </div>
                    <button className="btn btn-info prevPage" onClick={this.getPrevGauge}><img alt="/" src="/assets/images/navarrow.png" className="arrow prev"/>Prev</button>
                    <img alt="/" src="/assets/images/click_submit_hover.png" id="hoverImg" />
                    <img alt="/" src="/assets/images/click_submit.png" id="clickSubmitPng"/>
                    <button className="btn btn-lg btn-success submit" onClick={this.evaluate} onMouseEnter={this.animateImg} onMouseLeave={this.stopAnimateImg}>Submit!!</button>
                </div>
            )
            default:
        }
    }
    animateImg = (e) => {
        const img = e.currentTarget.previousSibling;
        img.style.animationName = 'hoverSubmit';
        img.style.animationDuration = '1.5s';
        img.style.animationIterationCount = 'infinite';
        document.getElementById('hoverImg').style.visibility = 'visible';
    }
    stopAnimateImg = (e) => {
        const img = e.currentTarget.previousSibling;
        img.style.animationName = null;
        document.getElementById('hoverImg').style.visibility = 'hidden';
    }

    onRecurrenceButton = (e) => {
        e.preventDefault();
        e.currentTarget.style.borderWidth = '3px';
        e.currentTarget.style.boxShadow = '0 0 10px rgb(255, 255, 255)';

        if(e.currentTarget.innerHTML === 'Yes') {
            e.currentTarget.nextSibling.style.borderWidth = '1px';
            e.currentTarget.nextSibling.style.boxShadow = 'none';
            this.setState({ ...this.state, recurrence_score: true });
        }else {
            e.currentTarget.previousSibling.style.borderWidth = '1px';
            e.currentTarget.previousSibling.style.boxShadow = 'none';
            this.setState({ ...this.state, recurrence_score: false });
        }
    }

    evaluate = () => {
        this.props.evaluate( this.state );
    }

    render() {
        return (
            <main>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#eval_modal">
                    Rate this restaurant!
                </button>
                <div id="eval_modal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document" style={{marginTop: '200px', maxWidth: '600px'}}>
                        <div className="modal-content bg-primary" style={{height: '365px', opacity: '0.95',borderColor: 'white'}}>
                            { this.renderSwitch(this.state.page) }
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Modal;