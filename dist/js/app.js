var rendererD3 = {
  data: {
    widthMap: 0,
    heightMap: 0,
    img: {},
    // zoom: d3.zoom()
    //   .on('zoom', () => {
    //     d3.select('svg').attr('transform', d3.event.transform);
    //   })
  },
  moca: {
    objects: [
      {
        id: 'test1',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 182, "y": 452},
            {"x": 150, "y": 443},
            {"x": 17, "y": 397},
            {"x": 27, "y": 358},
            {"x": 31, "y": 354},
            {"x": 130, "y": 394},
            {"x": 208, "y": 422},
          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test2',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '11',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 182, "y": 412},
            {"x": 130, "y": 394},
            {"x": 32, "y": 354},
            {"x": 64, "y": 325},
            {"x": 210, "y": 381},
          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test3',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 210, "y": 381},
            {"x": 64, "y": 325},
            {"x": 89, "y": 313},
            {"x": 109, "y": 305},
            {"x": 127, "y": 305},
            {"x": 210, "y": 341},
            {"x": 237, "y": 350},
          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test4',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 237, "y": 350},
            {"x": 210, "y": 341},
            {"x": 125, "y": 305},
            {"x": 155, "y": 302},
            {"x": 175, "y": 283},
            {"x": 265, "y": 316},
          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test5',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 265, "y": 316},
            {"x": 175, "y": 283},
            {"x": 210, "y": 253},
            {"x": 240, "y": 265},
            {"x": 292, "y": 283},

          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test6',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 238, "y": 469},
            {"x": 195, "y": 455},
            {"x": 182, "y": 452},
            {"x": 232, "y": 396},
            {"x": 285, "y": 418},
          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test7',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 285, "y": 418},
            {"x": 243, "y": 402},
            {"x": 232, "y": 396},
            {"x": 276, "y": 345},
            {"x": 329, "y": 366},

          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test8',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 329, "y": 366},
            {"x": 276, "y": 345},
            {"x": 276, "y": 345},
            {"x": 320, "y": 294},
            {"x": 374, "y": 312},
          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test9',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 383, "y": 386},
            {"x": 329, "y": 366},
            {"x": 332, "y": 364},
            {"x": 374, "y": 312},
            {"x": 428, "y": 333},
          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
      {
        id: 'test10',
        status: 'sales',
        // TODO if need this or add new field
        otherInfo: {
          number: '10',
          kadNumber: '43342347343:67346:888',
          square: '0,536',
          price: '15000'
        },
        modelView: {
          polygon: [
            {"x": 339, "y": 438},
            {"x": 285, "y": 417},
            {"x": 329, "y": 366},
            {"x": 383, "y": 386},
          ],
          fill: 'yellow',
          stroke: 'red'
        }
      },
    ]
  },
  elements: {
    map: {class: '', id: 'map', el: {}, d3El: {}},
    svg: {name: 'svg', d3El: {}},
    g: {name: 'g', d3El: {}},
    scaleLinerX: {},
    scaleLinerY: {},
    layout: {id: 'layout', el: {}},
    closer: {id: 'closer', el: {}},
    modal: {id: 'modal', el: {}},
    start: {id: 'start', el: {}},
    stop: {id: 'stop', el: {}},
  },
  actions: {
    init: () => {
      rendererD3.actions.initElements();
      rendererD3.actions.initData();
      rendererD3.actions.initView();
      rendererD3.actions.initActions();
      rendererD3.elements.closer.el.addEventListener('click', () => {
        rendererD3.actions.hideModal();
        rendererD3.actions.hideLayout();
      });
      rendererD3.elements.layout.el.addEventListener('click', () => {
        rendererD3.actions.hideModal();
        rendererD3.actions.hideLayout();
      });
      rendererD3.actions.updateInputRange();

    }
    ,
    initElements: () => {
      rendererD3.elements.map.el = rendererD3.ui.getElId(rendererD3.elements.id);
      rendererD3.elements.map.d3El = d3.select(`#${rendererD3.elements.id}`);
      rendererD3.elements.layout.el = rendererD3.ui.getElId(rendererD3.elements.layout.id);
      rendererD3.elements.modal.el = rendererD3.ui.getElId(rendererD3.elements.modal.id);
      rendererD3.elements.closer.el = rendererD3.ui.getElId(rendererD3.elements.closer.id);
      rendererD3.elements.start.el = rendererD3.ui.getElId(rendererD3.elements.start.id);
      rendererD3.elements.stop.el = rendererD3.ui.getElId(rendererD3.elements.stop.id);
    },
    initData: () => {
      const mapImg = rendererD3.ui.getElId('mapImg')
      rendererD3.data.widthMap = rendererD3.ui.getWidthD3(mapImg);
      rendererD3.data.heightMap = rendererD3.ui.getHeightD3(mapImg);
    },
    initView: () => {
      rendererD3.ui.appendSvg();
      rendererD3.ui.appendG();
      rendererD3.ui.appendScaleLiner();
      window.removeEventListener('resize', rendererD3.resize.handlers.resize);
      window.addEventListener('resize', rendererD3.resize.handlers.resize);
      rendererD3.ui.getElId('map').addEventListener('wheel', w => {
        if (w.deltaY < 0) {
          w.preventDefault();
          rendererD3.ui.getElId('nav').classList.add('hide');
          rendererD3.ui.getElId('sales-wrapper').classList.add('zoom')
        } else {
          rendererD3.ui.getElId('sales-wrapper').classList.remove('zoom')
          rendererD3.ui.getElId('nav').classList.remove('hide');
        }
      })
      rendererD3.ui.createPolygon(rendererD3.moca.objects);
      const height = document.documentElement.clientHeight / 2;
      const width = document.documentElement.clientWidth / 2;
      window.scrollTo((document.documentElement.scrollWidth / 2) - width, (document.documentElement.scrollHeight / 2) - height);
    },
    initActions: () => {

      d3.select("svg")
        .selectAll("polygon")
        .on("click", (d) => {
          d3.event.stopPropagation();
          rendererD3.actions.showModal();
          rendererD3.actions.showLayout();
        })
        .on("mouseover", (d) => {
        })
        .on("mouseleave", (d) => {
        })
    },
    showModal: () => {
      rendererD3.elements.modal.el.classList.remove('hide')
    },
    showLayout: () => {
      rendererD3.elements.layout.el.classList.remove('hide')
    },
    hideLayout: () => {
      rendererD3.elements.layout.el.classList.add('hide')
    },
    hideModal: () => {
      rendererD3.elements.modal.el.classList.add('hide')
    },
    updateInputRange: () => {
      d3.select("#nAngle").on("input", function () {
        rendererD3.actions.update(+this.value);
      });
    },
    // update: (nAngle) => {
    //   // adjust the text on the range slider
    //   d3.select("#nAngle-value").text(nAngle);
    //   d3.select("#nAngle").property("value", nAngle);
    //
    //   // rotate the text
    //   d3.select("svg").select('g').select('g')
    //     .attr("transform", "rotate(" + nAngle + ")")
    //     .attr("transform-origin", "50% 50%")
    // }
  },
  resize: {
    handlers: {
      resize: () => {
        // TODO blur or loader
        rendererD3.ui.removeSvg();
        rendererD3.actions.init();
        const height = document.documentElement.clientHeight / 2;
        const width = document.documentElement.clientWidth / 2;
        window.scrollTo((document.documentElement.scrollWidth / 2) - width, (document.documentElement.scrollHeight / 2) - height);
      },
      debounce: (delay, fn) => {
        let timerId;
        return function (...args) {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
          }, delay);
        }
      },
    },
  },
  ui: {
    getImg: () => '<img unselectable="on" src="../setka2.jpg" class="img-fluid w-100" id="dynamicImg">',
    removeSvg: () => d3.select('svg').remove(),
    getElId: (name) => document.getElementById(name),
    getWidthD3: (name) => Math.round(Number(d3.select(name).style('width').slice(0, -2))),
    getHeightD3: (name) => Math.round(Number(d3.select(name).style('height').slice(0, -2))),
    appendSvg: () => {
      rendererD3.elements.svg.d3El = d3.select("#map").append("svg")
        .attr("width", rendererD3.data.widthMap)
        .attr("height", rendererD3.data.heightMap)

      ;
    },
    appendG: () => {
      rendererD3.elements.g.d3El = d3.select('svg').append("g")
    },
    appendScaleLiner: () => {
      rendererD3.elements.scaleLinerX = d3.scaleLinear().domain([0, 1200]).range([0, rendererD3.data.widthMap]);
      rendererD3.elements.scaleLinerY = d3.scaleLinear().domain([0, 675]).range([rendererD3.data.heightMap, 0]);
    },
    createPolygon: (data) => {

      d3.select('g')
        .selectAll('polygon').select('g')
        .data(data)
        .enter().append("polygon")
        .attr("points", (d) => {
          return d.modelView.polygon.map(d => {
            return [rendererD3.elements.scaleLinerX(d.x), rendererD3.elements.scaleLinerY(d.y)].join(",");
          }).join(" ");
        })
        .attr("stroke", item => item.modelView.stroke)
        .attr("fill", item => item.modelView.fill)
        .attr("id", item => item.id)
        .attr("stroke-width", 1);

      d3.select('svg')
        .select('g')
        .selectAll('polygon')
        .data('dataset')
        .enter()
        .append("text")
        .attr("x", data[0].modelView.polygon[1]['x'] - 2 + '%')
        .attr("y", data[0].modelView.polygon[1]['y'] + 3.4 + '%')
        .text("10");
    }
  },
  ajax: {
    get: (url) => fetch(url, {method: 'GET'})
  }
};

// window.addEventListener("load", () => {
//   window['rendererD3'] = rendererD3.actions;
// });
