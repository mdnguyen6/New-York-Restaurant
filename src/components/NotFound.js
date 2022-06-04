import PropTypes from 'prop-types'
import { Card } from "react-bootstrap";
NotFound.propTypes = {
  message: PropTypes.string
}
NotFound.defaultProps = {
  message: "Page Not Found"
}
export default function NotFound(props) {
  return (
    <Card>
    <Card.Body>
      <Card.Title className="mb-2 text-muted text-center">
      {props.message}
      </Card.Title>
    </Card.Body>
  </Card>
  );
}
