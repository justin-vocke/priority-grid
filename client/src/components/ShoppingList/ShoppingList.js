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
    let q1Items = items.filter(item => item.quadrant== '1');
    let q2Items = items.filter(item => item.quadrant== '2');
    let q3Items = items.filter(item => item.quadrant== '3');
    let q4Items = items.filter(item => item.quadrant== '4');
    return loading ? (
      <Spinner />

    ) :
      (
        <Container>
          
          <Row className="margin-bottom">
            <Col>
              <ListGroup>
              Quadrant 1


                {

                q1Items.map(({ _id, name }) => (

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

Quadrant 2
                {q2Items.map(({ _id, name }) => (

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
Quadrant 3

                {q3Items.map(({ _id, name }) => (

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
Column 4

                {q4Items.map(({ _id, name }) => (

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