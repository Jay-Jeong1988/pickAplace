

const Restaurant = {
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

const User = {
    create(params) {
        return fetch('/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            }).then( res => res.json() ).then( (res) => console.log(res))
        }
}

export { User };