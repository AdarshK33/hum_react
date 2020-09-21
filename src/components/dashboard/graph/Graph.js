import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';


const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Graph extends Component {
    constructor() {
		super();
		this.createPareto = this.createPareto.bind(this);
	}
	shouldComponentUpdate() {
		return false;
	  }
	componentDidMount(){
		this.createPareto();
	}
	createPareto(){
		var dps = [];
		var chart = this.chart;
		
		console.log(chart);
		var yValue, yTotal = 0, yPercent = 0;
		// dps.push({ y: 0});
		for(var i = 0; i < chart.data[0].dataPoints.length; i++)
			yTotal += chart.data[0].dataPoints[i].y;
		for(var i = 0; i < chart.data[0].dataPoints.length; i++){
			yValue = chart.data[0].dataPoints[i].y;
			yPercent += (yValue / yTotal * 50);
			dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
		}
		chart.creditText = "";
		chart.addTo("data",{type:"line",showInLegend: true, name: "Planned Hours", yValueFormatString: "0.##"%"", lineDashType: "dash", dataPoints: this.props.Qty});
		chart.data[1].set("axisYType", "secondary", false);
		chart.axisY[0].set("maximum", Math.round(yTotal / 20) * 5);
		chart.axisY2[0].set("maximum", 100);
		
		
		
	}
	render() {
		const options = {
			title:{
				text: this.props.name,
				// fontColor: "red",
				 fontSize: 20,
				//  horizontalAlign: "left",
				//  fontWeight: "lighte"
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
				// dockInsidePlotArea: true,
				// verticalAlign: "top",
				cursor: "pointer",
				
			},
			axisY2: {
				title: "Quality Targets",
				// suffix: "%",
				lineColor: "#C0504E",
				tickColor: "#C0504E",
				labelFontColor: "#C0504E"
			},
			data: [{
				type: "column",
				showInLegend: true,
				name: "Qty Target",
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