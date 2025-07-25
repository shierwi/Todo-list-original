import { getDefaultNormalizer } from "@testing-library/dom";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

function Fetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      res
        .json()
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
        })
    );
  });
  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error fetching: {error}</h1>
      ) : (
        <Fragment>
          <h1>Users</h1>
          <ul>
            {data.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
}
export default Fetch;
