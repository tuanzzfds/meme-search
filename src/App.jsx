import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
    const [filter, setFilter] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            if (filter) {
                setIsLoading(true);
                try {
                    const res = await fetch(`https://api.memegen.link/images?filter=${filter}`);
                    if (res.ok) {
                        const data = await res.json();
                        setImages(data);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error(error);
                    setError(error.message);
                }
            } else {
                setImages([]);
            }
        };

        const timeout = setTimeout(fetchImages, 300);
        return () => clearTimeout(timeout);
    }, [filter]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };
    return (
        <div className="container">
            <h1 className="app-title">Meme search</h1>
            <div className="search-field">
                <input
                    type="text"
                    className="search-field__input"
                    value={filter}
                    onChange={handleSearchChange}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="search-field__icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </div>
            {isLoading && <span className="loading">Loading...</span>}
            {filter && !isLoading && (
                <span className="result">Kết quả tìm thấy: {images.length}</span>
            )}
            {images.length > 0 && (
                <ul className="images">
                    {images.map((image) => (
                        <li className="image" key={image.url}>
                            <img loading="lazy" src={image.url} alt={image.url} />
                        </li>
                    ))}
                </ul>
            )}
            {error && <span className="error">{error}</span>}
        </div>
    );
}

export default App;
