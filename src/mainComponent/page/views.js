import React , {Component}from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import * as todoAction from './actions'
import {view as ItemList} from './itemsList'

class Page extends Component{

	render(){
			const {pageData} = this.props;
		    return (
		    		<div>
		    			<p></p>
		    			<input placeholder="输入任务"/><button>提交</button>
		    			<div>
		    				<ul>
				    		 	{pageData.map((v,i)=>{
				    		 		return <ItemList 
				    		 			key={v.id}
				    		 			listData = {v}
				    		 		/>
				    		 	})}
				    		 </ul>
		    			</div>		
		    		</div>
		    		 
		    	)
		
	}
}

const mapStateToProps = (state) => {
  return {
    pageData: state.page
  };
}

export default connect(mapStateToProps)(Page);

