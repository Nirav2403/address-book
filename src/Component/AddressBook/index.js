import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteContact } from "./action";
import ContactPopup from "./ContactPopup";

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactPopup: false,
      searchContactWord: "",
      contactList: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { searchContactWord } = this.state;
    if (this.props.contactList?.length !== nextProps.contactList?.length) {
      const filteredContact = nextProps.contactList.filter((item) =>
        item.name.includes(searchContactWord)
      );
      this.setState({
        contactList: searchContactWord
          ? filteredContact
          : nextProps.contactList,
      });
    }
  }
  componentDidMount() {
    const { contactList } = this.props;
    this.setState({ contactList });
  }

  toggleContactPopup = () => {
    const { showContactPopup } = this.state;
    this.setState({
      showContactPopup: !showContactPopup,
      selectedContactData: {},
    });
  };

  updateContact = (data) => {
    this.setState({ selectedContactData: data, showContactPopup: true });
  };

  deleteContact = (id) => {
    this.props.deleteContact(id);
  };

  handleSearch = (e) => {
    const { contactList } = this.state;
    this.setState({ searchContactWord: e.target.value }, () => {
      setTimeout(() => {
        const filteredContact = contactList.filter((item) =>
          item.name.includes(e.target.value)
        );
        this.setState({
          contactList: e.target.value
            ? filteredContact
            : this.props.contactList,
        });
      }, 1000);
    });
  };

  render() {
    const {
      showContactPopup,
      selectedContactData,
      contactList,
      searchContactWord,
    } = this.state;
    return (
      <Container fluid className="address-book">
        <Row>
          <Col xs={12} className="address-book-header">
            <h2>Address Book</h2>
            <div>
              <input
                className="search-field"
                value={searchContactWord}
                onChange={this.handleSearch}
                placeholder="Search contact"
              />
              <Button variant="secondary" onClick={this.toggleContactPopup}>
                Add contact
              </Button>
            </div>
          </Col>
          <Col xs={12}>
            <table>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th></th>
              </tr>
              <tbody>
                {contactList &&
                  contactList.length > 0 &&
                  contactList.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td className="action-column">
                        <Button
                          variant="info"
                          onClick={() => this.updateContact(item)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteContact(item.id)}
                          className="ml-2"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {contactList && contactList.length === 0 && (
              <div className="empty-row">No contacts available</div>
            )}
          </Col>
          <ContactPopup
            show={showContactPopup}
            handleClose={this.toggleContactPopup}
            updateData={selectedContactData}
          />
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  deleteContact,
};

const mapStateToProps = (state) => ({
  contactList: state.contactDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook);
