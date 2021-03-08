import React, { Component } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { connect } from 'react-redux';

import { addItem } from '../actions/ItemActions';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    quadrant: 1
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onQuadrantChange = e => {
    this.setState({
      quadrant: e.target.value
    }, () => console.log("successful quadrant change"))
  }
  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      quadrant: this.state.quadrant
    }



    //Add item via addItem action
    this.props.addItem(newItem);

    //Close modal
    this.toggle();
  }

  render() {

    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}>
          Add Item
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}>
            Add To Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">
                  Item
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />

                <Label for="select">
                  Which quadrant?
                </Label>
                <Input type="select" name="quadrant" id="select" onChange={this.onChange}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Input>
                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item
});
export default connect(mapStateToProps, { addItem })(ItemModal);