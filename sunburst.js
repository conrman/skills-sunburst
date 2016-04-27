// var Sunburst = function (element, data, settings) {
//
//   console.log(element);
//   console.log(data);
//
//   #<{(|*
//    * Dimensions of svg, sunburst, legend, breadcrumbs
//    * @type {Number} width
//    * @type {Number} height
//    * @type {Number} radius
//    |)}>#
//   var width = settings === undefined ? 500 : settings.width;
//   var height = settings === undefined ? 500 : settings.height;
//   var radius = settings === undefined ? Math.min(width, height) / 2 : settings.radius;
//
//   #<{(|*
//    * Breadcrumb dimensions: width, height, spacing, width of tip/tail.
//    * @type {Object}
//    |)}>#
//   var b = {
//     w: 60,
//     h: 30,
//     s: 3,
//     t: 10
//   };
//
//   #<{(|*
//    * Legend dimensions: width, height, spacing, radius of rounded rect.
//    * @type {Object}
//    |)}>#
//   var legend = {
//     w: 75,
//     h: 30,
//     s: 3,
//     r: 3
//   };
//
//   #<{(|*
//    * Chart Margins
//    * @type {Object}
//    |)}>#
//   var margin = {
//     top: radius,
//     bottom: 50,
//     left: radius,
//     right: 0
//   };
//
//   #<{(|*
//    * Sunburst Margins
//    * @type {Object}
//    |)}>#
//   var sunburstMargin = {
//     top: 2 * radius + b.h,
//     bottom: 0,
//     left: 0,
//     right: radius / 2
//   };
//
//   ////////////////////////
//   // Drawing variables: //
//   ////////////////////////
//
//   #<{(|*
//    * Color mapping of nodes to colorscale.
//    * e.g. colors, totalSize, partitions, arcs
//    * @type {d3}
//    |)}>#
//   var colors = d3.scale.category10();
//
//   #<{(|*
//    * Total size of all nodes, to be used later when data is loaded
//    * @type {Number}
//    |)}>#
//   var totalSize = 0;
//
//   #<{(|*
//    * Create layout partitions
//    *
//    * Like layers of an onion, creates circular wedges
//    * @type {d3}
//    |)}>#
//   var partition = d3.layout.partition()
//     .size([2 * Math.PI, radius * radius])
//     .value(function(d) {
//       return d.size;
//     });
//     console.log("Where the fuck is the partition");
//     console.log(partition);
//
//   #<{(|*
//    * Create arc paths
//    * @type {d3}
//    |)}>#
//   var arc = d3.svg.arc()
//     .startAngle(function(d) {
//       return d.x;
//     })
//     .endAngle(function(d) {
//       return d.x + d.dx;
//     })
//     .innerRadius(function(d) {
//       return Math.sqrt(d.y);
//     })
//     .outerRadius(function(d) {
//       return Math.sqrt(d.y + d.dy);
//     });
//
//
//
//
//   /////////////////////////
//   // Element containers: //
//   /////////////////////////
//
//   #<{(|*
//    * Visualization initialization
//    |)}>#
//   var vis = d3.select(element[0])
//     .append("div").classed("vis-continer", true)
//     .style("position", "relative")
//     .style("margin-top", "20px")
//     .style("margin-bottom", "20px")
//     .style("left", "50px")
//     .style("height", height + 2 * b.h + "px");
//
//   #<{(|*
//    * Sunburst initialization
//    |)}>#
//   var sunburst = vis
//     .append("div").classed("sunburst-container", true)
//     .style("position", "absolute")
//     .style("left", sunburstMargin.left + "px")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//     console.log('I choose you sunburst!');
//     console.log(sunburst);
//
//   #<{(|*
//    * Legend initialization
//    |)}>#
//   var legend = vis
//     .append("div").classed("legend-container", true)
//     .style("position", "absolute")
//     .style("top", b.h + "px")
//     .style("left", 2 * radius + sunburstMargin.right + "px")
//     .style("width", 50 + "px")
//     .style("height", 50 + "px")
//     .append("svg")
//     .attr("width", legend.w)
//     .attr("height", height);
//
//   #<{(|*
//    * Breadcrumbs initialization
//    |)}>#
//   var breadcrumbs = vis
//     .append("div").classed("breadcrumbs-container", true)
//     .style("position", "absolute")
//     .style("top", sunburstMargin.top + "px")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", b.h)
//     .attr("fill", "white")
//     .attr("font-weight", 600);
//
//   // last breadcrumb element
//   var lastCrumb = breadcrumbs
//     .append("text").classed("lastCrumb", true);
//
//   #<{(|*
//    * Summary initialization
//    |)}>#
//   var summary = vis
//     .append("div").classed("summary-container", true)
//     .style("position", "absolute")
//     .style("top", radius * 0.80 + "px")
//     .style("left", sunburstMargin.left + radius / 2 + "px")
//     .style("width", radius + "px")
//     .style("height", radius + "px")
//     .style("text-align", "center")
//     .style("color", "#666")
//     .style("z-index", "-1");
//
//
//
//   #<{(|*
//    * Render visualization
//    *
//    * 1) Load data
//    * 2) Build tree
//    * 3) Draw visualization
//    * @param  {String} data
//    * @return
//    |)}>#
//   function render(data) {
//     var parsedData = d3.csv.parseRows(data); // 1) load data
//     console.log("Parsed Data!");
//     console.log(parsedData);
//     var json = buildHierarchy(parsedData); // 2) build json tree
//     console.log("JSN!");
//     console.log(json);
//     createVisualization(json); // 3) visualize json tree
//   }
//
//
//
//   ///////////////////////
//   // Helper functions: //
//   ///////////////////////
//
//   #<{(|*
//    * Removes existing SVG components
//    |)}>#
//   function removeVisualization() {
//     sunburst.selectAll(".nodePath").remove();
//     legend.selectAll("g").remove();
//   }
//
//
//   #<{(|*
//    * Vizualize json tree structure
//    *
//    * @param  {Object} json
//    |)}>#
//   function createVisualization(json) {
//     console.log('Creating Visualization');
//     drawSunburst(json); // draw sunburst
//     drawLegend(); // draw legend
//   };
//
//
//   #<{(|*
//    * Color map helper function
//    *
//    * color gray if "end" is deteected
//    * @param  {Object} d node name
//    * @return {d3} color
//    |)}>#
//   function colorMap(d) {
//
//     return colors(d.name);
//   }
//
//
//   #<{(|*
//    * Draw sunburst helper function
//    *
//    * @param  {Object} json
//    |)}>#
//   function drawSunburst(json) {
//     console.log("Draw Sunburst with this data!");
//     console.log(json);
//     console.log('Where is the sunburst!');
//     console.log(sunburst);
//
//     // Build only nodes of a threshold "visible" sizes to improve efficiency
//     var nodes = partition.nodes(json)
//       .filter(function(d) {
//         return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
//       });
//
//     // this section is required to update the colors.domain() every time the data updates
//     var uniqueNames = (function(a) {
//       var output = [];
//       console.log(a);
//       a.forEach(function(d) {
//         console.log(d);
//         if (output.indexOf(d.name) === -1) output.push(d.name);
//       });
//       return output;
//     })(nodes);
//     colors.domain(uniqueNames); // update domain colors
//
//     // create path based on nodes
//     var path = sunburst.data([json]).selectAll("path")
//       .data(nodes).enter()
//       .append("path").classed("nodePath", true)
//       .attr("display", function(d) {
//         return d.depth ? null : "none";
//       })
//       .attr("d", arc)
//       .attr("fill", colorMap)
//       .attr("opacity", 1)
//       .attr("stroke", "white")
//       .on("mouseover", mouseover);
//
//
//     // // trigger mouse click over sunburst to reset visualization summary
//     vis.on("click", click);
//
//     // Update totalSize of the tree = value of root node from partition.
//
//     totalSize = path.node().__data__.value;
//   }
//
//
//   #<{(|*
//    * Draw legend helper function
//    |)}>#
//   function drawLegend() {
//     // remove "root" label from legend
//     var labels = colors.domain().splice(1, colors.domain().length);
//
//     // create legend "pills"
//     var g = legend.selectAll("g")
//       .data(labels).enter()
//       .append("g")
//       .attr("transform", function(d, i) {
//         return "translate(0," + i * (legend.h + legend.s) + ")";
//       });
//
//     g.append("rect").classed("legend-pills", true)
//       .attr("rx", legend.r)
//       .attr("ry", legend.r)
//       .attr("width", legend.w)
//       .attr("height", legend.h)
//       .style("fill", function(d) {
//         return colors(d);
//       });
//
//     g.append("text").classed("legend-text", true)
//       .attr("x", legend.w / 2)
//       .attr("y", legend.h / 2)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .attr("fill", "white")
//       .attr("font-size", "10px")
//       .attr("font-weight", 600)
//       .text(function(d) {
//         return d;
//       });
//   }
//
//
//   #<{(|*
//    * Mouseover helper function
//    *
//    * Handle mouseover events/animations and calculation of ancestor nodes etc
//    * @param  {Number} d value of area under the cursor
//    * @return {[type]}   [description]
//    |)}>#
//   function mouseover(d) {
//     // build percentage string
//     var percentage = (100 * d.value / totalSize).toPrecision(3);
//     var percentageString = percentage + "%";
//     if (percentage < 1) {
//       percentageString = "< 1.0%";
//     }
//
//     // update breadcrumbs (get all ancestors)
//     var ancestors = getAncestors(d);
//     updateBreadcrumbs(ancestors, percentageString);
//
//     // update sunburst (Fade all the segments and highlight only ancestors of current segment)
//     sunburst.selectAll("path")
//       .attr("opacity", 0.3);
//     sunburst.selectAll("path")
//       .filter(function(node) {
//         return (ancestors.indexOf(node) >= 0);
//       })
//       .attr("opacity", 1);
//
//     // update summary
//     summary.html(
//       "Stage: " + d.depth + "<br />" +
//       "<span class='percentage'>" + percentageString + "</span><br />" +
//       d.value + " of " + totalSize + "<br />"
//     );
//
//     // display summary and breadcrumbs if hidden
//     summary.style("visibility", "");
//     breadcrumbs.style("visibility", "");
//   }
//
//
//   // helper function click to handle mouseleave events/animations
//   function click(d) {
//     // Deactivate all segments then retransition each segment to full opacity.
//     sunburst.selectAll("path").on("mouseover", null);
//     sunburst.selectAll("path")
//       .transition()
//       .duration(1000)
//       .attr("opacity", 1)
//       .each("end", function() {
//         d3.select(this).on("mouseover", mouseover);
//       });
//
//     // hide summary and breadcrumbs if visible
//     breadcrumbs.style("visibility", "hidden");
//     summary.style("visibility", "hidden");
//   }
//
//
//   // Return array of ancestors of nodes, highest first, but excluding the root.
//   function getAncestors(node) {
//     var path = [];
//     var current = node;
//
//     while (current.parent) {
//       path.unshift(current);
//       current = current.parent;
//     }
//     return path;
//   }
//
//
//   // Generate a string representation for drawing a breadcrumb polygon.
//   function breadcrumbPoints(d, i) {
//     var points = [];
//     points.push("0,0");
//     points.push(b.w + ",0");
//     points.push(b.w + b.t + "," + (b.h / 2));
//     points.push(b.w + "," + b.h);
//     points.push("0," + b.h);
//
//     if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
//       points.push(b.t + "," + (b.h / 2));
//     }
//     return points.join(" ");
//   }
//
//
//   // Update the breadcrumb breadcrumbs to show the current sequence and percentage.
//   function updateBreadcrumbs(ancestors, percentageString) {
//     // Data join, where primary key = name + depth.
//     var g = breadcrumbs.selectAll("g")
//       .data(ancestors, function(d) {
//         return d.name + d.depth;
//       });
//
//     // Add breadcrumb and label for entering nodes.
//     var breadcrumb = g.enter().append("g");
//
//     breadcrumb
//       .append("polygon").classed("breadcrumbs-shape", true)
//       .attr("points", breadcrumbPoints)
//       .attr("fill", colorMap);
//
//     breadcrumb
//       .append("text").classed("breadcrumbs-text", true)
//       .attr("x", (b.w + b.t) / 2)
//       .attr("y", b.h / 2)
//       .attr("dy", "0.35em")
//       .attr("font-size", "10px")
//       .attr("text-anchor", "middle")
//       .text(function(d) {
//         return d.name;
//       });
//
//     // Set position for entering and updating nodes.
//     g.attr("transform", function(d, i) {
//       return "translate(" + i * (b.w + b.s) + ", 0)";
//     });
//
//     // Remove exiting nodes.
//     g.exit().remove();
//
//     // Update percentage at the lastCrumb.
//     lastCrumb
//       .attr("x", (ancestors.length + 0.5) * (b.w + b.s))
//       .attr("y", b.h / 2)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .attr("fill", "black")
//       .attr("font-weight", 600)
//       .text(percentageString);
//   }
//
//
//
//   #<{(|*
//    * Build data hierarchy
//    *
//    * Take a 4-column CSV of ["sequence", "stage", "node", "value"] and
//    * transform it into a hierarchical structure suitable for a partition layout.
//    * @param  {String} csv
//    * @return {Object} root node tree
//    |)}>#
//   function buildHierarchy(csv) {
//     var data = csv2json(csv); // build JSON dataframe from csv using helper function
//
//     // build tree
//     var root = {
//       name: "root",
//       children: []
//     };
//
//     data.forEach(function(d) {
//       var nodes = d.nodes;
//       var size = parseInt(d.size);
//
//       // build graph, nodes, and child nodes
//       var currentNode = root;
//       for (var j = 0; j < nodes.length; j++) {
//         var children = currentNode.children;
//         var nodeName = nodes[j];
//         var childNode;
//
//         if (j + 1 < nodes.length) {
//           // Not yet at the end of the sequence; move down the tree.
//           var foundChild = false;
//           for (var k = 0; k < children.length; k++) {
//             if (children[k].name == nodeName) {
//               childNode = children[k];
//               foundChild = true;
//               break;
//             }
//           }
//           if (!foundChild) { // If we don't already have a child node for this branch, create it.
//             childNode = {
//               name: nodeName,
//               children: []
//             };
//             children.push(childNode);
//           }
//           currentNode = childNode;
//         } else { // Reached the end of the sequence; create a leaf node.
//           childNode = {
//             name: nodeName,
//             size: size
//           };
//           children.push(childNode);
//         }
//       }
//     });
//     return root;
//   }
//
//
//
//   #<{(|*
//    * CSV to JSON
//    *
//    * Helper function to buildHierarchy to transform 4-column CSV into a JSON dataframe.
//    * @param  {String} csv
//    * @return {Object} data
//    |)}>#
//   function csv2json(csv) {
//     var data = [];
//     var sequences = [];
//
//     // sort the dataframe ascending by sequence (d[0]) then by stage (d[1])
//     csv.sort(function(a, b) {
//       if (a[2] === b[2]) {
//         return d3.ascending(a[0], b[0]);
//       }
//       return d3.ascending(a[1], b[1]);
//     });
//     csv.forEach(function(record) {
//       var sequence = record[0];
//       if (sequences.indexOf(sequence) < 0) sequences.push(sequence);
//     });
//
//     sequences.forEach(function(sequence) {
//       var d = {
//         nodes: [],
//         size: 0
//       };
//       csv.forEach(function(record) {
//         var node = record[2];
//         var size = record[3];
//         if (sequence === record[0]) {
//           d.nodes.push(node);
//           d.size = size;
//         }
//       });
//       data.push(d);
//     });
//     return data;
//   }
//
//   render(data);
//
// }
