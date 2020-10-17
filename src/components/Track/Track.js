import React, { PureComponent } from "react";



class Track extends PureComponent {
  media = React.createRef();

  
  componentDidMount() {
    const { track } = this.props;

    track.attach(this.media.current);
  }

  render() {
    const { track } = this.props;

    return <track.kind autoPlay ref={this.media} />;
  }
}

export default Track;
