import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Styles from './index.less';
import img from 'img/app.png';
console.log(Styles.a);
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      
    }
  }
  render(){
    return (
      <div>
        <img src={img} />
        <div className={Styles.a}>asdasdasdasd</div>
      </div>
    )
  }
}
const appRoot = document.getElementById('app');
ReactDOM.render(<App/>,appRoot);

