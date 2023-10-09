import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Searchbar() {
  return (
    <Container className="searchbar-container">
        <Row>
            <Col md="auto" className="vertically-center-no-padding">
                <div className="searchbar-input-box-container">
                    <Form.Control size="lg" type="text" placeholder="File Search" />
                </div>
            </Col>
            <Col md="auto" className="vertically-center-no-padding">
                <div className="search-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" height="38" width="38" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
            </Col>
        </Row>
    </Container>
  );
}

export default Searchbar;