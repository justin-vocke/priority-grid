import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../../actions/ItemActions';
import PropTypes from 'prop-types';
import './ShoppingList.css';
import Spinner from '../layout/spinner';

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }
  render() {
    const { items, loading } = this.props.item;
    return loading ? (
      <Spinner />

    ) :
      (
        <Container>
          <Row className="center">
            <Col>
              Quadrant 1
          </Col>
            <Col>
              Quadrant 2
          </Col>
          </Row>
          <Row className="margin-bottom">
            <Col>
              <ListGroup>


                {items.map(({ _id, name }) => (

                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >&times;

                  </Button>
                    {name}
                    {console.log(name)}
                  </ListGroupItem>

                ))}

              </ListGroup>
            </Col>
            <Col>
              <ListGroup>


                {items.map(({ _id, name }) => (

                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >&times;

                  </Button>
                    {name}
                    {console.log(name)}
                  </ListGroupItem>

                ))}

              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>


                {items.map(({ _id, name }) => (

                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >&times;

                  </Button>
                    {name}
                    {console.log(name)}
                  </ListGroupItem>

                ))}

              </ListGroup>
            </Col>
            <Col>
              <ListGroup>


                {items.map(({ _id, name }) => (

                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >&times;

                  </Button>
                    {name}
                    {console.log(name)}
                  </ListGroupItem>

                ))}

              </ListGroup>
            </Col>

          </Row>
          <Row className="center">
            <Col>
              Quadrant 3
          </Col>
            <Col>
              Quadrant 4
          </Col>
          </Row>


        </Container>

      );
  }
}
ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  item: state.item,
  loading: state.item
})
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);