import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './home'
import About from './about'

export default Routers = () => (
	<Router>
		<Scene key="root">
			<Scene key="home" component={Home} title="Home" initial={true} />
			<Scene key="about" component={About} title="About" />
		</Scene>
  </Router>
)