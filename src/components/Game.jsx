import { useState, useEffect, useRef } from 'react';

function shuffleData(a, b) {
    const test = Math.random();
    if (test > 0.5) {
        return -1;
    } else if (test < 0.5) {
        return 1;
    } else {
        return 0;
    }
}

function Card({ url, desc, handleCardClick }) {
    return (
        <div className="card" onClick={handleCardClick}>
            <img src={url} alt="" />
            <p>{desc}</p>
        </div>
    );
}

export default function Game({ setScore }) {
    const [ids, setIds] = useState([1, 2, 3, 500, 350, 432, 155, 634, 72, 13, 345, 795, 158, 852, 346]);
    const [data, setData] = useState([]);
    const [gotClicked, setGotClicked] = useState({});
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
            const clickedObj = {};
            fetchedData.forEach((n) => {
                clickedObj[n[0]] = false;
            });
            setData(fetchedData);
            setGotClicked(clickedObj);
        } catch (error) {
            console.error(error);
        } finally {
            loading.current = false;
        }
    };

    useEffect(() => {
        getImages(ids);
    }, [ids]);

    function handleCardClick(id) {
        if (!gotClicked[id]) {
            setScore((n) => n + 1);
            setGotClicked({...gotClicked, [id]:true});
        } else {
            setScore(0);
            setGotClicked(Object.keys(gotClicked).reduce((obj, key) => {
                obj[key] = false;
                return obj;
            }, {}));
        }
        setData((arr) => arr.sort(shuffleData));
    }

    return (
        <div className="board">
            {loading.current && <div>Loading</div>}
            {
                !loading.current &&
                data.map((pokemon) => {
                    return (
                        <Card 
                            key={pokemon[0]}
                            url={pokemon[2]}
                            desc={pokemon[1]}
                            handleCardClick={() => handleCardClick(pokemon[0])}
                        />
                    )
                })
            }
        </div>
    );
}