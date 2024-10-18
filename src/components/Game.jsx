import { useState, useEffect, useRef } from 'react';

const ids = [1, 2, 3];

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
    const gotData = useRef(false);

    useEffect(() => {
        async function getImages(list) {
            list.map((id) => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                    .then(response => response.json())
                    .then(data => {
                        setData((arr) => {
                            arr.push([id, data.name, data.sprites.front_default]);
                            return arr;
                        });
                    }).catch(error => {
                        console.error(error);
                        setData((arr) => {
                            arr.push([id, '', '']);
                            return arr;
                        });
                    });
            })
        }
        if (!gotData.current) {
            getImages(ids);
            gotData.current = true;
        }
    }, []);

    console.log('data ', data);
    return (
        <div className="board">
            {data.map((pokemon) => {
                return <Card key={pokemon.id} url={pokemon[2]} desc={pokemon[1]} />
            }) }
        </div>
    )
}