import * as React from 'react';
import * as d3 from 'd3';
import { ValueFn } from 'd3';

export default class GeoMap extends React.Component {
  async componentDidMount() {
      var width = 900;
      var height = 450;

      var projection = d3.geoMercator();

      var svg = d3.select("#map").append("svg")
          .attr("width", width)
          .attr("height", height);
      var geoGenerator = d3.geoPath()
          .projection(projection);
      var g = svg.append("g");

    try {
      const topo = await d3.json("countries.geo.json") as any;
      g.selectAll("path")
        .data(topo.features)
        .enter()
        .append('path')
        .attr('id', (d: any) => d.id)
        .attr('fill', 'red')
        .attr('d', geoGenerator as any)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return <div id="map" />
  }
}