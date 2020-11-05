import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';


// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Graph extends Component {
    constructor() {
		super();
		this.createPareto = this.createPareto.bind(this);
	}
	
	componentDidMount(){
		this.createPareto();
		let Alink = document.getElementsByClassName('canvasjs-chart-credit')
		Alink[0].parentNode.removeChild(Alink[0]);
	}

	componentDidUpdate(){
		this.createPareto();
		let Alink = document.getElementsByClassName('canvasjs-chart-credit')
		Alink[0].parentNode.removeChild(Alink[0]);
	}
	createPareto(){
		
		var chart = this.chart;
		
		var  yTotal = 0;
		
		for(var i = 0; i < chart.data[0].dataPoints.length; i++)
			yTotal += chart.data[0].dataPoints[i].y;
	
		chart.creditText = "";
		chart.addTo("data",{type:"line",showInLegend: true, name: "Qty Target", yValueFormatString: "0.##"%"", lineDashType: "dash", dataPoints: this.props.Qty});
		chart.data[1].set("axisYType", "secondary", false);
		chart.axisY[0].set("maximum", Math.round(yTotal / 10) * 5);
		chart.axisY2[0].set("maximum", 200);
		chart.axisY2[0].set("minimum", 0);
		
		
		
	}
	render() {
		const options = {
			title:{
				text: this.props.name,
				
				 fontSize: 20,
				
			},
			axisX : {
				// labelAngle: 20
			},
			dataPointWidth: 25,
			axisY: {
				title: "No of Teammates",
				lineColor: "#4F81BC",
				tickColor: "#4F81BC",
				labelFontColor: "#4F81BC"
			},
			legend: {
				
				cursor: "pointer",
				
			},
			axisY2: {
				title: "Quantity Targets",
				suffix: "%",
				lineColor: "#C0504E",
				tickColor: "#C0504E",
				labelFontColor: "#C0504E"
			},
			data: [{
				type: "column",
				showInLegend: true,
				name: "Planned Hours",
				dataPoints:this.props.hours
				
			}]
		}
		return (
		 <div>
      
   
            <CanvasJSChart options = {options}
            onRef={ref => this.chart = ref}
            />
        
        
        </div>
    
   
  
		);
	}
}
 
export default Graph;