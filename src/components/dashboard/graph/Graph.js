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
		chart.addTo("data",{type:"line",showInLegend: true, name: "Planned Hours", yValueFormatString: "0.##"%"", lineDashType: "dash", dataPoints: dps});
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
				dockInsidePlotArea: true,
				verticalAlign: "top",
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
				dataPoints: [
					{ label: "6-7am", y: 104 },
					{ label: "7-8am", y: 120 },
					{ label: "8-9am", y: 150},
					{ label: "9-10am", y: 200 },
					{ label: "10-11am", y: 90 },
					{ label: "11am-12pm", y: 100 },
					{ label: "12-1pm", y: 170 },
					{ label: "1-2pm", y: 250 },
					{ label: "2-3pm", y: 70 },
					{ label: "3-4pm", y: 50 }
				]
			}]
		}
		return (
		 <div>
      
   
            <CanvasJSChart options = {options}
            onRef={ref => this.chart = ref}
            />
        
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    
   
  
		);
	}
}
 
export default Graph;