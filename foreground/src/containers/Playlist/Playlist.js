import React from "react";

class Playlist extends React.Component {
  render() {
    return (
      <div className="mainarea">
        <div>Playlist</div>
      </div>
    );
  }
}

export default Playlist;

// // in Product.js
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as ProductActions from './ProductActions';

// // component part
// export function Product({ name, description }) {
//     return <div>
//         <h1>{ name }</h1>
//         <div className="description">
//             {description}
//         </div>
//     </div>
// }

// // container part
// function mapStateToProps(state) {
//     return {...state};
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         ...ProductActions,
//     }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Product);