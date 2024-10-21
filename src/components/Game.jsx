import { useState, useEffect, useRef } from 'react';

function Card({ url, desc }) {
    return (
        <div className="card">
            <img src={url} alt="" />
            <p>{desc}</p>
        </div>
    );
}

export default function Game() {
    const [ids, setIds] = useState([1, 2, 3]);
    const [data, setData] = useState([]);
    const loading = useRef(true);

    async function getImages(list) {
        loading.current = true;
        try {
            const fetchedData = await Promise.all(
                list.map(async (id) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                    const json = await response.json();
                    return [id, json.name, json.sprites.front_default];
                })
            );
            setData(fetchedData);
        } catch (error) {
            console.error(error);
        } finally {
            loading.current = false;
        }
    };

    useEffect(() => {
        getImages(ids);
    }, [ids]);

    return (
        <div className="board">
            
            {loading.current && <div>Loading</div>}
            {
                !loading.current &&
                data.map((pokemon) => {
                    return <Card key={pokemon[0]} url={pokemon[2]} desc={pokemon[1]} />;
                })
            }
        </div>
    );
}