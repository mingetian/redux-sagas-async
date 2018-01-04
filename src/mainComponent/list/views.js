import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import * as ListAction from './actions'

const List = ({num,add,less,asyncLess,asyncAdd}) => {
    return (<div>
              <h2>你好我是list{num}</h2>
              <button onClick={()=>add(num)}>增加1</button>
              <button onClick={()=>less(num)}>减少1</button>
              <button onClick={()=>asyncLess(num)}>异步减少1</button>
              <button onClick={()=>asyncAdd(num)}>异步增加1</button>
          </div>)
}

List.propTypes = {
  num: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  less: PropTypes.func.isRequired,
  asyncAdd: PropTypes.func.isRequired,
  asyncLess: PropTypes.func.isRequired,
};
 
const mapStateToProps = (state) => {
  return {
    num: state.list
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListAction, dispatch)
};
export default connect(mapStateToProps,mapDispatchToProps)(List);
