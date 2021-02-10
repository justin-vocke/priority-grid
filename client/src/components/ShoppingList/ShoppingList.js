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
    return loading ? (
      <Spinner />
    ) : (
      <Container>
        <Row className="center">
          <Col className="padding-bottom">Quadrant 1</Col>
          <Col className="padding-bottom">Quadrant 2</Col>
        </Row>
        <Row className="margin-bottom">
          <Col>
            <ListGroup>
              <TransitionGroup className="shopping-list">
                {items
                  .filter((item) => {
                    return item.quadrant == "1";
                  })
                  .map(({ _id, name, quadrant }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <ListGroupItem>
                        <UpdateModal quadrant={quadrant} id={_id} name={name} />
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                        {name}
                        {console.log(typeof _id)}
                        {console.log(`${name} is the name, ${_id} is the id`)}
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <TransitionGroup className="shopping-list">
                {items
                  .filter((item) => {
                    return item.quadrant == "2";
                  })
                  .map(({ _id, name }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <ListGroupItem>
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                        {name}
                        {console.log(name)}
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </ListGroup>
          </Col>
        </Row>
        <Row className="center">
          <Col className="padding-bottom">Quadrant 3</Col>
          <Col className="padding-bottom">Quadrant 4</Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              <TransitionGroup className="shopping-list">
                {items
                  .filter((item) => {
                    return item.quadrant == "3";
                  })
                  .map(({ _id, name }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <ListGroupItem>
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                        {name}
                        {console.log(name)}
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <TransitionGroup className="shopping-list">
                {items
                  .filter((item) => {
                    return item.quadrant == "4";
                  })
                  .map(({ _id, name }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <ListGroupItem>
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                        {name}
                        {console.log(name)}
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
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
  loading: state.item,
});
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
