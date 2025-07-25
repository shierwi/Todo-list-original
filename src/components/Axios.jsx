import { useEffect, useState, Fragment } from "react";
import axios from "axios";

function Axios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://potterapi-fedeperin.vercel.app/en/spells")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error fetching: {error}</h1>
      ) : (
        <Fragment>
          <h1>Hechizos</h1>
          <ul>
            {data.map((hechizo) => (
              <div>
                <li key={hechizo.index}>Hechizo: {hechizo.spell}</li>
                <p>Uso: {hechizo.use}</p>
              </div>
            ))}
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Axios;
