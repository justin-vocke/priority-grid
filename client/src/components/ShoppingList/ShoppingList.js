import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { getItems, deleteItem } from "../../actions/ItemActions";
import PropTypes from "prop-types";
import "./ShoppingList.css";
import Spinner from "../layout/spinner";
import UpdateModal from "../UpdateModal";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };
  render() {
    //items and loading come from state
    const { items, loading } = this.props.item;
    const {isAuthenticated} = this.props.auth;
    let q1Items = items.filter(item => item.quadrant== '1');
    let q2Items = items.filter(item => item.quadrant== '2');
    let q3Items = items.filter(item => item.quadrant== '3');
    let q4Items = items.filter(item => item.quadrant== '4');
    return loading ? (
      <Spinner />

    ) : !isAuthenticated ? (
      <h1>You should log in</h1>
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
};
const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth
});
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
