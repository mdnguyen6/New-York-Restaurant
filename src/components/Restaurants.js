import { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { Pagination, Card, Table } from "react-bootstrap";
import useFetch from "../customHook/useFetch";
import NotFound from "./NotFound";

export default function Restaurants() {
  const [page, setPage] = useState(1);
  const { search } = useLocation();
  const { borough } = queryString.parse(search);
  let history = useHistory();
  let Borough = "";
  if (borough) {
    Borough = `&borough=${borough}`;
  }
  
  useEffect(()=>{
    setPage(1);
  },[borough])
  
  const { response, error, isLoading } = useFetch(
    `https://radiant-headland-87984.herokuapp.com/api/restaurants?page=${page}&perPage=10${Borough}`
  );

  const previousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Restaurant List</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Full list of restaurants. Optional sorted by borough
          </Card.Text>
        </Card.Body>
      </Card>
      <hr />

      {isLoading && <NotFound message="Loading restaurants..." />}
      {error && <NotFound message={`Server: ${error}`} />}
      {response?.length === 0 ? 
      (
        <NotFound message={`There is no restaurants with borough: ${borough}`} />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Borough</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {response?.map((restaurant) => {
              return (
                <tr
                  onClick={() => {
                    history.push(`/restaurant/${restaurant._id}`);
                  }}
                  key={restaurant._id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.cuisine}</td>
                  <td>{restaurant.borough}</td>
                  <td>{`${restaurant.address.building} ${restaurant.address.street}`}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <br />
      <Pagination className="d-flex justify-content-center">
        <Pagination.Prev onClick={previousPage} hidden={page === 1} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </>
  );
}
