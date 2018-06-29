import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RenderRestaurantDetail(props) {

    const { photos } = props;
    if( !photos ) return null;

    return (
        <main className="RenderRestaurantDetail">
            <div className="photo_container d-flex justify-content-center">
                <div className="photos"
                    style={{
                    backgroundImage: `url(${photos[0].getUrl({'maxWidth': 400, 'maxHeight': 240})}`, 
                    backgroundSize: 'cover'}}>
                </div>
            </div>
        </main>
    )
    
}


export default RenderRestaurantDetail;