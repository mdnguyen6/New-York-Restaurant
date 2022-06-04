import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import useFetch from "../customHook/useFetch";
import { Card, CardDeck } from "react-bootstrap";
import NotFound from "./NotFound";

export default function Restaurant() {
  const { id } = useParams();
  const { response, error, isLoading } = useFetch(
    `https://radiant-headland-87984.herokuapp.com/api/restaurants/${id}`
  );

  return (
    <>
      {isLoading && <NotFound message="Loading..." />}
      {error && (
        <NotFound message={`We can't find the restaurant with id: ${id}`} />
      )}
      {response && (
        <>
          <Card>
            <Card.Header>
              <Card.Title>{response.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                {`${response.address.building} ${response.address.street}`}
              </Card.Text>
            </Card.Body>
          </Card>
          <hr />
          <MapContainer
            style={{ height: "400px" }}
            center={[response.address.coord[1], response.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[response.address.coord[1], response.address.coord[0]]}
            ></Marker>
          </MapContainer>
          <hr />

          <h3>Rates</h3>
          <CardDeck>
            {response.grades.map((grade) => {
              return (
                <Card key={grade.date}>
                  <Card.Header>
                    <Card.Title>{`Grade: ${grade.grade}`}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {`Date: ${new Date(grade.date).toLocaleDateString()}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </CardDeck>
          <br />
        </>
      )}
    </>
  );
}
