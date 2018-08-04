import React from 'react';

function HomeModalContentA(props) {
    const {types, handleClick, handleHover} = props;

    return (
        <div className="modal-body" style={{backgroundColor: 'white'}}>
            <svg className="left-container" id="svg_food">
                <g stroke="black" strokeWidth="0.5" fill="url(#food-image)">
                    <path d="M0,0h300l-30,400h-270v-400"></path>
                </g>
            </svg>
            <div className="right-container" id="containerA">

            {
                types.map( (d, i) => {
                    if( i % 2 === 0 ){
                        return d ? (
                            <div key={i} className="rows">
                                <div onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleHover}>
                                    <div className="foodicons" id={d} style={{ backgroundImage: `url(/assets/images/food_types/icons/${d}.png)` }}></div>
                                    <h6 style={{color: 'gray'}}>{d}</h6>
                                </div>
                                {
                                    types[i+1] ? (
                                        <div onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleHover}>
                                            <div className="foodicons" id={ types[i+1] } style={{ backgroundImage: `url(/assets/images/food_types/icons/${types[i+1]}.png)` }}></div>
                                            <h6 style={{color: 'gray'}}>{types[i+1]}</h6>
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
                <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Meat">Meat</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" >CC 3.0 BY</a></div>
                <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Socrates">Socrates</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" >CC 3.0 BY</a></div>
            </div>
        </div>
    )
}

export default HomeModalContentA;