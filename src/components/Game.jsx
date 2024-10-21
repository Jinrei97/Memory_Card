import { useState, useEffect, useRef } from 'react';

const ids = [1, 2, 3];
let hasLoaded = false;

function Card({ url, desc }) {
    return (
       <>
        <div className="card">
            <img src={url} alt="" />
            <p>{desc}</p>
        </div>
       </> 
    );
}

export default function Game() {
    const [data, setData] = useState([]);
    const renderCount = useRef(0);

    console.log('Render number: ', renderCount.current);
    renderCount.current += 1;
    console.log(data);

    async function getImages(list) {
        const fetchedData = [];
        list.map((id) => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                .then(response => response.json())
                .then(json => {
                    fetchedData.push([id, json.name, json.sprites.front_default]);
                }).catch(error => {
                    console.error(error);
                    fetchedData.push([id, '', '']);
                });
            });
        setData(fetchedData);
    };

    useEffect(() => {
        console.log('has loaded: ', hasLoaded);
        if (!hasLoaded) {
            hasLoaded = true;
            getImages(ids);
        } else {
            console.log('not running');
        };
    }, []);

    return (
        <div className="board">
            {!hasLoaded ? <div>Loading</div> :
            data.map((pokemon) => {
                return <Card key={pokemon.id} url={pokemon[2]} desc={pokemon[1]} />
            })}
        </div>
    )
}