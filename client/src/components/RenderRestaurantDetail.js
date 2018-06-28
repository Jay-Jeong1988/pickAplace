import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RenderRestaurantDetail(props) {

    const { photos } = props;
    if( !photos ) return null;

    return (
        <main className="RenderRestaurantDetail container">
            <div className="form-group">
                <div className="form-group container photos"
                    style={{width: '400px', height: '250px', 
                    backgroundImage: `url(${photos[0].getUrl({'maxWidth': 400, 'maxHeight': 240})}`, 
                    backgroundSize: 'cover'}}>
                    
                </div>
            </div>
        </main>
    )
    
}


export default RenderRestaurantDetail;