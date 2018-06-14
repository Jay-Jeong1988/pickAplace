const BASE = 'http://localhost:5000/';

Restaurant = {
    all() {
        fetch('/restaurants').then( res => res.json() )
    }
    // all = async() => {
    //     const res = await fetch('/restaurants');
    //     const body = await res.json();

    //     if ( res.status !== 200 ) throw Error(body.message);
    //     return body;
    // }
}