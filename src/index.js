import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {view as ListView} from './mainComponent/list'
import {view as PageView} from './mainComponent/page'
import creatStore from './store/configureStore'

let store = creatStore();


render(
  <Provider store={store}>
  	<div>
  		<ListView />
   		{/*<PageView />*/}
  	</div>		
   
  </Provider>,
  document.getElementById('root')
)
