import React from 'react'
import axios from 'axios'
import Showcase from './showcase'
export default class Home extends React.Component{
	constructor(props){
		super(props)
		this.state={
			data: [

			],
			title: ""
		}
	}
	componentDidMount(){
		axios.get("https://ozcom-backend.herokuapp.com/upload/showcase-data")
		.then(res=> {
			let data = []
			for(let i in res.data){
				if(res.data[i][0]){
					console.log(res.data[i][0])
					data.push({catagory: i, data: res.data[i]})
				}
			}
			this.setState({title: "Get Best Deals On Your Favourite Items",data: data})
			console.log(this.state.data)
		})
		.catch(err=>this.setState({title: "No Data Found..."}))
	}
	render(){
		let toRender;
		if(this.state.data[0]){
			toRender = this.state.data.map(doc=><Showcase data={doc.data} catagory={doc.catagory} />)
		}
		return (

			<div>
				{this.state.title?<h2 id="home-title" style={{textAlign: "center"}}>{this.state.title}</h2>:<h1 style={{textAlign: 'center', color: 'gray'}}>Loading...</h1>}
				<div id="home-ads-div">	
					{toRender&&toRender}
				</div>
			</div>
			)
	}
}