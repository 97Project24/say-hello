import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div className="background-image">
           <div className="content">
               {hello}
           </div>
        </div>
    );
}

export default App;