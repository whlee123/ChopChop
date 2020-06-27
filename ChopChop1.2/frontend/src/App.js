/*global google*/
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import auth0Client from "./Auth";
import NavBar from "./NavBar/NavBar";
import Introduction from "./Introduction/Introduction";
import Callback from "./Callback";
import Distance from "./Distance/Distance";
import { Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import CurrentLocation from "./Map";
import Favourites from "./Pages/Favourites";
import History from "./Pages/History";
import Blacklist from "./Pages/Blacklist";
import testpage from "./Pages/testpage";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LocationSearchInput from "./LocationSearchInput";
import MapsContainer from "./PlaceGenerator/containers/MapContainer";
import App2 from "./PlaceGenerator/App2";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkingSession: true,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPKvgOhMorW7BVV6O9Z597wYb7L7p9Tcw&libraries=places" />
        <NavBar />
        <Route exact path="/" component={Introduction} />
        <Route exact path="/callback" component={Callback} />
        <Route exact path="/" component={Distance} />
        <Route exact path="/History" component={History} />
        <Route exact path="/Favourites" component={Favourites} />
        <Route exact path="/Blacklist" component={Blacklist} />
        <Route exact path="/testpage" component={App2} />
        {/*
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker onClick={this.onMarkerClick} name={"current location"} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
        <LocationSearchInput />
      */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBQlZDHkXFuTFhDdgn8T286dkWQije7d80",
})(withRouter(App));
