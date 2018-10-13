import React from 'react';

function HomeModalContentC(props) {
    const {otherThings, handleClick, handleHover} = props;

    return (
        <div className="modal-body" style={{backgroundColor: 'white'}}>
            <svg className="left-container" id="svg_otherThings">
                <g stroke="black" strokeWidth="0.5" fill="url(#otherThings-image)">
                    <path d="M0,0h375l-30,500h-345v-500"></path>
                </g>
            </svg>
            <div className="right-container" id="containerC">

            {
                otherThings.map( (d, i) => {
                    if( i % 2 === 0 ){
                        return d ? (
                            <div key={i} className="rows">
                                <div onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleHover}>
                                    <div className="foodicons" id={d} style={{ backgroundImage: `url(/assets/images/food_types/icons/${d}.png)` }}></div>
                                    <h6 style={{color: 'gray'}}>{d}</h6>
                                </div>
                                {
                                    otherThings[i+1] ? (
                                        <div onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleHover}>
                                            <div className="foodicons" id={ otherThings[i+1] } style={{ backgroundImage: `url(/assets/images/food_types/icons/${otherThings[i+1]}.png)` }}></div>
                                            <h6 style={{color: 'gray'}}>{otherThings[i+1]}</h6>
                                        </div>
                                    )
                                    :
                                    ''
                                }
                            </div>
                        )
                        :
                        ''
                    }else{
                        return '';
                    }
                })
            }
                <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
                <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
                <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/turkkub" title="turkkub">turkkub</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
            </div>
        </div>
    )
}

export default HomeModalContentC;