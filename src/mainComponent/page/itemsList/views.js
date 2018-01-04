import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import {actions as todoAction} from '../'

const Page = ({listData,toggleList,removeList}) => {
    return (
    		  <li>
                <input type="checkbox"/>
                <span>{listData.text}</span>
                <button>删除</button>
          </li>
    	)
}

Page.propTypes = {
  listData: PropTypes.object.isRequired,
  toggleList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch,ownprops) => {
  console.log(ownprops)
  return bindActionCreators(todoAction, dispatch)
};

export default connect(null,mapDispatchToProps)(Page);

