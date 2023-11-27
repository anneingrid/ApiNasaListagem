import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const App = () => {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async (page = 0) => {
    try {
      const apiKey = 'gvlSdtSzWfitsAyLFD9obP1SZ6anSeE7dzbQsUIU'
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=${page}&api_key=${apiKey}`);
      setNeoData(response.data.near_earth_objects);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching NEO data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

    return (
        <div className="App">
          <div className="container py-5">
            <div className="row mb-4 align-items-center">
              <div className="col-md-10">
                <div className="col-md-2">
                </div>
                <h1 className="text-right">Objetos Perto da Terra</h1>
                <p className="text-secondary text-right">Informações sobre asteroides e cometas perto do nosso planeta.</p>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {neoData.map((neo) => (
                <div key={neo.id} className="col">
                  <div className="card h-100 shadow">
                    <div className="card-body">
                      <h5 className="card-title">{neo.name}</h5>
                      <p className="card-text">Diâmetro estimado: {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                      <p className="card-text">Observado de {(neo.orbital_data.first_observation_date)} até {(neo.orbital_data.last_observation_date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ReactPaginate
              pageCount={neoData.length}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      );
  };

  export default App;
