// $.ajax({
//   type: 'GET',
//   url: '/data/skillsequence.csv',
//   dataType: 'text',
//   success: function(data) {
//     console.log("You got it!");
//     console.log(data);
//     Sunburst($('#skillChart'), data);
//   },
//   error: function(err) {
//     console.log("Keep trying!");
//     console.log(err);
//   }
// }) ;

var skillsdata;

skillsdata = {
  "Skills": {
    "Social": {
      "Communication": {
        "Written": [5, 5, 20, 40, 75],
        "Verbal": [20, 20, 40, 70, 90]
      },
      "Management": {
        "Team": [0, 0, 0, 40, 50],
        "Project": [0, 10, 40, 50, 100],
        "Budget": [0, 0, 20, 40, 80]
      }
    },
    "Web Development": {
      "Backend": {
        "DB": {
          "MySQL": [0, 15, 30, 50, 75],
          "PostgreSQL": [0, 15, 30, 30, 20],
          "SQLite": [0, 0, 0, 10, 20]
        },
        "Server": {
          "nginx": [0, 0, 0, 0, 50],
          "Apache": [0, 10, 30, 50, 50]
        },
        "API": {
          "OAuth2.0": [0, 5, 10, 30, 30],
          "XML": [0, 10, 20, 50, 30],
          "REST": [0, 0, 30, 50, 85]
        },
        "Framework": {
          "Zend": [0, 10, 15, 0, 0],
          "Ruby on Rails": [0, 20, 40, 30, 10],
          "Laravel": [0, 0, 0, 20, 70],
        }
      },
      "Frontend": {
        "Markup": {
          "HTML": {
            "HTML5": [15, 30, 50, 80, 100],
            "ARIA": [0, 0, 10, 30, 75],
          }
        },
        "Styles": {
          "CSS": [0, 20, 60, 80, 100],
          "LESS": [0, 0, 10, 20, 10],
          "SASS": [0, 10, 30, 60, 100]
        },
        "JS": {
          "ES2015": [0, 0, 0, 10, 50],
          "jQuery": [5, 15, 50, 75, 100],
          "Angular": [0, 10, 30, 25, 30],
          "ReactJS": [0, 0, 0, 0, 20],
          "VueJS": [0, 0, 0, 0, 30],
          "D3.js": [0, 0, 0, 0, 20]
        },
        "Template": {
          "Pug": [0, 0, 0, 30, 30],
          "Handlebars": [0, 20, 40, 80, 80],
          "Liquid": [0, 25, 50, 70, 80]
        }
      }
    },
    "Language": {
      "Script": {
        "Javascript": [5, 10, 20, 40, 60],
        "PHP": [10, 20, 30, 40, 60],
        "Ruby": [0, 0, 10, 30, 50],
        "Python": [0, 0, 0, 0, 20]
      },
      "Embedded": {
        "C": [50, 45, 40, 40],
        "C++": [50, 50, 45, 40, 40]
      },
      "Other": {
        "Haskall": [0, 0, 0, 0, 5]
      }
    },
    "Tools": {
      "Development": {
        "Vim": [30, 40, 45, 50, 55],
        "Sublime Text": [30, 40, 45, 50, 55],
        "Bash": [10, 10, 30, 35, 40],
      },
      "Project": {
        "Agile": [40, 50, 60, 70, 80],
        "CI": [50, 70, 70, 80, 80],
        "Repos": {
          "Git": [0, 0, 0, 30, 50]
        },
        "Track": {
          "Redmine": [0, 0, 0, 10, 30],
          "Trello": [0, 0, 10, 10, 20],
          "JIRA": [0, 0, 10, 10, 20]
        }
      },
      "Test": {
        "TDD": [5, 5, 5, 5, 15],
        "PHPUnit": [0, 0, 0, 5, 15]
      }
    }
  }
};



function initchart() {
  var data = {
    _proficiency: [0, 0, 0, 0, 0],
    children: null,
    value: 0,
    key: "",
    depth: 1
  };
  chart.refreshChart(data)
}


/**
 * Mouseover Handler
 *
 * Sets the sunburst data based on crumbpath
 * @param  {Object} data
 */
function mouseover(data) {
  chart.refreshChart(data);
  var c = getcrumbpath(data);
  console.log(c);
  i(c);
  d3.selectAll(".skills-sunburst path")
    .style("opacity", .3), sunburst
    .selectAll("path")
    .filter(function (a) { return c.indexOf(a) >= 0 })
    .style("opacity", 1);
}


/**
 * [mouseleave description]
 * @return {[type]} [description]
 */
function mouseleave() {
  d3.selectAll("path")
    .on("mouseover", null);
  d3.selectAll("path")
    .transition()
    .duration(1e3)
    .style("opacity", 1)
    .each("end", function () { d3.select(this).on("mouseover", mouseover) });
}


function getcrumbpath(a) {
  for (var temp = [], c = a; c.parent;) temp.unshift(c), c = c.parent;
  return temp
}


function initbreadcrumb() {
  d3.select("#skills-chart-breadcrumb")
    .append("svg:svg")
    .attr("width", 500)
    .attr("height", 50)
    .attr("class", "trail")
}


/**
 * Create Breadcrumb Heirarchy
 * @param  {[type]} a  [description]
 * @param  {[type]} d3 [description]
 * @return {Array}    [description]
 */
function h(a, d3) {
  var c = [];
  c.push("0,0");
  c.push(r.w + ",0");
  c.push(r.w + r.t + "," + r.h / 2);
  c.push(r.w + "," + r.h);
  c.push("0," + r.h);
  if (d3 > 0) {
    c.push(r.t + "," + r.h / 2);
  }
  return c.join(" ");
}


function i(a) {
  a[a.length - 1]._color, a.length;

  var c = d3.select("#skills-chart-breadcrumb .trail")
    .selectAll("g")
    .remove();

  c = d3.select("#skills-chart-breadcrumb .trail")
    .selectAll("g")
    .data(a, function (a) { return a.key + a.depth });

  var d = c.enter().append("svg:g");

  d.append("svg:polygon")
    .attr("points", h)
    .style("fill", function (a) { return a._color });

    d.append("svg:text")
      .attr("x", r.w / 2 + 2)
      .attr("y", r.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("class", "breadcumb-text")
      .style("fill", function (a) { return getcolor(d3.rgb(a._color)) < 150 ? "#fff" : "#000" })
      .text(function (a) { return a.key });

      c.attr("transform", function (a, b) { return "translate(" + b * (r.w + r.s) + ", 0)" });
        c.exit().remove();
        d3.select(".trail").style("visibility", "");
}


function getcolor(color) {
  return .299 * color.r + .587 * color.g + .114 * color.b
}


function k(a) {
  var c = ["#ffae00", "#2199e8", "#3adb76", "#ec5840", "#404040"],
  d = [-.1, -.05, 0];
  if (1 == a.depth) {
    var e = c[coloralternative % 5];
    return coloralternative++, e
  }
  if (a.depth > 1) {
    var f = d[a.value % 3];
    return d3.rgb(a.parent._color).brighter(.2 * a.depth + f * a.depth)
  }
}

var t = function (a, b) {
  var c = [];
  var d = a.length;
  if (a.length !== b.length) {
    c = a.length > b.length ? a : b;
  }
  else {
    for (var e = 0; d > e; e++) {
      var f = Math.max(a[e], b[e]) - Math.abs(a[e] - b[e]) / 8;
      c.push(f)
    }
  }
  return c
}

var u = function (a) {
  if (a instanceof Array) return a;
  var b = [];
  return $.each(a, function (a, c) {
    b = t(u(c), b)
  }), b
}

var l;

// Line Chart
var chart = function (d3) {

  var chart = {};
  var rect = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  };

  var g = 500 - rect.left - rect.right;
  var h = 400 - rect.top - rect.bottom;
  var i = [2012, 2013, 2014, 2015, 2016];
  var j = d3.scale.linear().range([0, g]);
  var k = d3.scale.linear().range([h, 0]);

  var bottomtick = d3.svg
                    .axis()
                    .scale(j)
                    .tickValues(i)
                    .tickFormat(d3.format(".0f"))
                    .tickPadding(10)
                    .tickSize(0)
                    .orient("bottom");

  var lefttick = d3.svg
                  .axis()
                  .scale(k)
                  .tickSize(0)
                  .tickPadding(10)
                  .tickValues([20, 40, 60, 80, 100])
                  .orient("left");

  var n = d3.svg.line().interpolate("basis").x(function (a) {
    return j(a.date)
  }).y(function (a) {
    return k(a.p)
  });

  var cpath = d3.select(".skills-chart")
              .append("svg")
              .attr("width", g + rect.left + rect.right)
              .attr("height", h + rect.top + rect.bottom)
              .append("g")
              .attr("transform", "translate(" + rect.left + "," + rect.top + ")");

  function processdata(data) {
    var b = [],
    c = 0;
    return (data._proficiency.forEach(function (a) {
      if(c <= i.length) {
        (b.push({
          p: a,
          date: i[c]
        }), c++)
      }
    }), b);
  }


  function c(b, c) {
    // Set chart domain/range
    j.domain(d3.extent(b, function (a) { return a.date }));
    k.domain([0, 100]);

    // Build chart
    cpath.append("g")
      .attr("class", "x-axis axis")
      .attr("transform", "translate(0," + h + ")")
      .call(bottomtick)
      .append("text")
      .attr("x", 450)
      .attr("y", -8)
      .style("text-anchor", "end")
      .text("Time");

    cpath.append("g")
      .attr("class", "y-axis axis")
      .call(lefttick)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".91em")
      .style("text-anchor", "end")
      .text("Proficiency");

    cpath.append("path")
      .datum(b)
      .attr("class", "line")
      .attr("id", "skills-chart-line")
      .attr("d", n)
      .attr("stroke", function () { return c._color })
  }

  function refreshChart(data) {
    var e = processdata(data),
    f = d3.select("#skills-chart-line");
    if (null === f[0][0]) {
      c(e, data)
    }
    else {
      f.datum(e)
        .attr("d", n)
        .attr("stroke", function () { return data._color })
    }
  }



  chart.refreshChart = refreshChart;
  return chart;
}(d3);

var width = 600;
var height = 600;
var coloralternative = 0;
var rad = Math.min(width, height) / Math.PI - 25;
var q = k;
var r = {
  w: 116,
  h: 30,
  s: 3,
  t: 7
};


// Build
sunburst = d3.select(".skills-sunburst")
              .append("svg:svg")
              .attr("width", width)
              .attr("height", height)
              .append("svg:g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


sunburst.append("svg:circle").attr("r", rad).style("opacity", 0);



proficiencydata = d3.layout
                    .partition()
                    .sort(null)
                    .size([2 * Math.PI, rad])
                    .children(function (a) {
                      return a.value instanceof Array
                        ? (a._proficiency = a.value, d3.entries([a.value[a.value.length - 1]]))
                        : (a._proficiency = u(a.value), isNaN(a.value) ? d3.entries(a.value) : null)
                    }).value(function (a) { return a.value });

arc = d3.svg.arc()
            .startAngle(function (a) { return a.x })
            .endAngle(function (a) { return a.x + a.dx - .01 / (a.depth + .5) })
            .innerRadius(function (a) { return rad / Math.PI * a.depth })
            .outerRadius(function (a) { return rad / Math.PI * (a.depth + 1) - 1 });



/**
 * Build paths based on data
 */
var path = sunburst.data(d3.entries(skillsdata))
                    .selectAll("g")
                    .data(proficiencydata)
                    .enter()
                    .append("svg:g")
                    .attr("display", function (a) { return a.depth ? null : "none" });


path.append("svg:path")
    .attr("d", arc)
    .attr("stroke", "#fff")
    .attr("fill", function (a) { return a._color = q(a), a._color })
    .attr("fill-rule", "evenodd").attr("display", function (a) { return a.children ? null : "none" })
    .on("mouseover", mouseover);


/**
 * Add text to areas
 * @type {[type]}
 */
path.append("svg:text")
    .attr("transform", function (a) {
      var r = 180 * ((a.x + a.dx / 2 - Math.PI / 2) / Math.PI);
      return "rotate(" + r + ")"
    })
    .attr("x", function (a) { return rad / Math.PI * a.depth})
    .attr("dx", "6").attr("dy", ".1em").text(function (a) { return a.key })
    .attr("display", function (a) { return a.children ? null : "none" })
    .on("mouseover", mouseover);


/**
 * Reset sunburst when mouse leaves
 */
d3.select(".skills-sunburst")
  .on("mouseleave", mouseleave);

// l = path.node().__data__.value;

// sunburst.append("circle")
//         .attr("r", rad / Math.PI)
//         .attr("opacity", 0);


initbreadcrumb();
initchart();
