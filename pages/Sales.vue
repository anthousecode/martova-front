<template>
  <section id="sales-wrapper">
    <!--search-->
    <div class="search-bar d-flex justify-content-around align-items-center">
      <button class="status status-red">Продан</button>
      <button class="status status-yellow">Зарезервирован</button>
      <button class="status status-green">Свободен</button>
      <div class="inp-group">
        <button>
          <img src="/lupa.svg" alt="lupa">
        </button>
        <input type="number" placeholder="№ участка">
      </div>
    </div>
    <!--search-->
    <div class="layout hide" id="layout">
      <div id="modal" class="hide px-4 pt-4 pb-1">
        <div class="d-flex justify-content-between header">
          <div class="header-part header-part__left">
            <p>Паспорт участка № 5304</p>
          </div>
          <div>
            <a href="#" id="closer"><img src="../static/closerModal.svg" alt="close"></a>
          </div>
        </div>
        <hr class="p-0 mt-1">
        <div class="base pt-2 d-flex flex-column">
          <h5>Общая информация</h5>
          <div class="d-flex flex-grow-1">
            <div class="left w-60">
              <div class="d-flex">
                <div>
                  <div class="d-flex"><p class="p-title">Кадастровый номер: </p>
                    <p class="p-description">632446566656:01:009:0329 </p></div>
                  <div class="d-flex"><p class="p-title">Тип собственности: </p>
                    <p class="p-description">Частная собственность</p></div>
                  <div class="d-flex"><p class="p-title">Целевое назначение: </p>
                    <p class="p-description">07.03 - для инд. дачного строительства</p></div>
                  <div class="d-flex"><p class="p-title"> Площадь: </p>
                    <p class="p-description">0,1077 га</p></div>
                  <div class="d-flex"><p class="p-title"> Статус: </p>
                    <p class="p-description">Зарезервирован</p></div>
                  <div class="d-flex"><p class="p-title"> Цена: </p>
                    <p class="p-description">$145 900</p></div>
                </div>
              </div>
              <div class="d-flex mt-3">
                <div class="w-50">
                  <p class="mb-2">Кадастровый план </p>
                  <a href="#" class="plan-img">
                    <img src="../static/bar360.png" alt="plan">
                  </a>
                  <a href="#" class="save-link text-right" style="cursor: pointer">Распечатать</a>
                </div>
                <div class="w-50 pl-4">
                  <p class="mb-2">Геодезическая съемка</p>
                  <div>
                    <a href="#" class="save-link d-flex align-items-center">
                      <img src="../static/dwg.svg" alt="doc">
                      <span>Скачать</span>
                    </a>
                    <a href="#" class="save-link d-flex align-items-center mt-3">
                      <img src="../static/pdf.svg" alt="doc">
                      <span>Скачать</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-40 position-relative">
              <turntable/>
              <div class="model-controls d-flex justify-content-between">
                <div>
                  <img src="/prev.svg" alt="prev">
                </div>
                <div>
                  <img src="/next.svg" alt="next">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!--New  -->

    <div class="wrapper min-container">
      <img class="big-img min-container" id="bigImg" src="/big_new_2.jpg" alt="big">
      <div class="item">
        <div class="wrapper-content-svg">
          <img src="/small_new_2.jpg" id="mapImg" alt="current">
          <div id="map"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    import turntable from "../components/turntable";
    import $ from 'jquery';

    export default {
        name: "Sales",
        components: {
            turntable
        },
        head: {
            script: [
                {src: 'js/app.js'}
            ]
        },
        data: () => ({
            widthMap: 0,
            heightMap: 0,
            img: {},
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
                {
                    id: 'test11',
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
                            {"x": 311, "y": 491},
                            {"x": 237, "y": 469},
                            {"x": 285, "y": 417},
                            {"x": 338.5, "y": 438},
                            {"x": 313, "y": 468},
                            {"x": 327, "y": 473},

                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test12',
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
                            {"x": 385, "y": 510},
                            {"x": 311, "y": 491.5},
                            {"x": 327, "y": 473},
                            {"x": 341, "y": 480},
                            {"x": 360, "y": 459},
                            {"x": 416, "y": 477},

                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test13',
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
                            {"x": 416, "y": 477},
                            {"x": 360, "y": 459},
                            {"x": 382.5, "y": 435},
                            {"x": 438, "y": 453},

                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test14',
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
                            {"x": 438, "y": 453},
                            {"x": 382.5, "y": 435},
                            {"x": 405, "y": 408},
                            {"x": 460, "y": 429},


                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test15',
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
                            {"x": 460, "y": 429},
                            {"x": 405, "y": 408},
                            {"x": 428, "y": 381},
                            {"x": 484, "y": 402},
                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test16',
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
                            {"x": 484, "y": 402},
                            {"x": 427, "y": 382},
                            {"x": 461, "y": 342},
                            {"x": 520, "y": 359},
                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test17',
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
                            {"x": 544, "y": 415},
                            {"x": 488, "y": 397},
                            {"x": 518, "y": 359},
                            {"x": 580.5, "y": 374},
                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test18',
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
                            {"x": 521, "y": 443},
                            {"x": 466, "y": 422},
                            {"x": 488, "y": 397},
                            {"x": 544, "y": 415},
                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test19',
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
                            {"x": 500, "y": 467},
                            {"x": 444, "y": 448},
                            {"x": 466, "y": 422},
                            {"x": 521, "y": 443},

                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test20',
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
                            {"x": 420, "y": 473},
                            {"x": 477, "y": 492.5},
                            {"x": 500, "y": 467},
                            {"x": 444, "y": 448},
                        ],
                        fill: 'green',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test21',
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
                            {"x": 460, "y": 529},
                            {"x": 380, "y": 509},
                            {"x": 419, "y": 472},
                            {"x": 478, "y": 491},
                            {"x": 460, "y": 507},
                            {"x": 478, "y": 513},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
// endpoint

                {
                    id: 'test22',
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
                            {"x": 535, "y": 548.5},
                            {"x": 461, "y": 529},
                            {"x": 476, "y": 513},
                            {"x": 491, "y": 517},
                            {"x": 516, "y": 490},
                            {x: 572, y: 508},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test23',
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
                            {x: 572, y: 508},
                            {x: 516, y: 490},
                            {x: 539, y: 466},
                            {x: 595, y: 484},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test24',
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
                            {x: 595, y: 484},
                            {x: 539, y: 466},
                            {x: 560, y: 441},
                            {x: 617, y: 460},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test25',
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
                            {x: 617, y: 460},
                            {x: 560, y: 441},
                            {x: 584, y: 415},
                            {x: 640.5, y: 435},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test26',
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
                            {x: 640.5, y: 435},
                            {x: 584, y: 415},
                            {x: 615.5, y: 381},
                            {x: 678.5, y: 392}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test27',
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
                            {x: 703.5, y: 446},
                            {x: 648, y: 427},
                            {x: 678, y: 392},
                            {x: 743, y: 402}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test28',
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
                            {x: 680, y: 471},
                            {x: 624, y: 453},
                            {x: 648, y: 427},
                            {x: 703.5, y: 446}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test29',
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
                            {x: 658, y: 495},
                            {x: 602, y: 477},
                            {x: 624, y: 453},
                            {x: 680, y: 471}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test30',
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
                            {x: 578, y: 501},
                            {x: 634, y: 520},
                            {x: 658, y: 495},
                            {x: 602, y: 477}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test31',
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
                            {x: 610, y: 568},
                            {x: 535, y: 548},
                            {x: 578, y: 501},
                            {x: 634, y: 520},
                            {x: 613, y: 542},
                            {x: 629, y: 548}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test32',
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
                            {"x": 682, "y": 587.5},
                            {"x": 611, "y": 568},
                            {"x": 629, "y": 548},
                            {"x": 641, "y": 553},
                            {x: 656, y: 538.5},
                            {x: 713, y: 556.5},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test33',
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
                            {x: 713, y: 556.5},
                            {x: 656, y: 538.5},
                            {x: 679.5, y: 513.5},
                            {x: 735, y: 532.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test34',
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
                            {x: 734, y: 532.5},
                            {x: 679.5, y: 513.5},
                            {x: 702, y: 488.5},
                            {x: 757, y: 506.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test35',
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
                            {x: 757, y: 506.5},
                            {x: 702, y: 488.5},
                            {x: 725, y: 467},
                            {x: 781, y: 483.5},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test35',
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
                            {x: 748, y: 440},
                            {x: 723, y: 468.5},
                            {x: 781, y: 483.5},
                            {x: 805, y: 457.5},

                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test35',
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
                            {x: 803, y: 459.5},
                            {x: 749, y: 440},
                            {x: 778, y: 407},
                            {x: 843, y: 413.5},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },

                {
                    id: 'test36',
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
                            {x: 872.5, y: 460.5},
                            {x: 816, y: 444.5},
                            {x: 843, y: 413.5},
                            {x: 915, y: 418.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },


                {
                    id: 'test37',
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
                            {x: 846, y: 487},
                            {x: 790, y: 471.5},
                            {x: 816, y: 444.5},
                            {x: 872.5, y: 460.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test38',
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
                            {x: 823, y: 512},
                            {x: 768, y: 495.5},
                            {x: 790, y: 471.5},
                            {x: 846, y: 487}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test39',
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
                            {x: 799, y: 537.5},
                            {x: 745, y: 520.5},
                            {x: 768, y: 495.5},
                            {x: 823, y: 512}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test40',
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
                            {x: 720, y: 545.5},
                            {x: 775.5, y: 562.5},
                            {x: 799, y: 537.5},
                            {x: 745, y: 520.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test41',
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
                            {x: 757, y: 607},
                            {x: 680, y: 586},
                            {x: 720, y: 545.5},
                            {x: 775.5, y: 562.5},
                            {x: 759, y: 581.2},
                            {x: 773.5, y: 585.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 829, y: 627},
                            {x: 758, y: 607.5},
                            {x: 773, y: 585.5},
                            {x: 788, y: 590.5},
                            {x: 803, y: 575.5},
                            {x: 857, y: 593.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 857, y: 593.5},
                            {x: 803, y: 575.5},
                            {x: 826.5, y: 549},
                            {x: 882, y: 569}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 882, y: 569},
                            {x: 826.5, y: 549},
                            {x: 849, y: 525},
                            {x: 904, y: 544}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 904, y: 546},
                            {x: 849, y: 525},
                            {x: 872, y: 499.5},
                            {x: 928, y: 521}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 897, y: 472.5},
                            {x: 872, y: 499},
                            {x: 928, y: 520},
                            {x: 952, y: 495}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 952, y: 495},
                            {x: 897, y: 472.5},
                            {x: 921, y: 450},
                            {x: 975, y: 469}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 975, y: 469},
                            {x: 921, y: 450},
                            {x: 948, y: 420},
                            {x: 1018, y: 425.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1020.5, y: 497},
                            {x: 965, y: 481},
                            {x: 990, y: 453},
                            {x: 1045, y: 471}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1045, y: 471},
                            {x: 990, y: 453},
                            {x: 1020, y: 425},
                            {x: 1092, y: 421}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 996, y: 521},
                            {x: 941, y: 506},
                            {x: 965, y: 481},
                            {x: 1020.5, y: 497},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 972, y: 546.5},
                            {x: 919, y: 530},
                            {x: 941, y: 506},
                            {x: 996, y: 521},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 949, y: 571},
                            {x: 895, y: 554},
                            {x: 919, y: 530},
                            {x: 972, y: 546.5},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 925.5, y: 595},
                            {x: 873, y: 579},
                            {x: 895, y: 554},
                            {x: 949, y: 571},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 904, y: 646.5},
                            {x: 850, y: 632.5},
                            {x: 827, y: 625.5},
                            {x: 873, y: 579},
                            {x: 926, y: 595},
                            {x: 906, y: 620},
                            {x: 920.5, y: 625}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 972, y: 666},
                            {x: 904, y: 647.5},
                            {x: 920, y: 625.5},
                            {x: 934, y: 629.5},
                            {x: 950, y: 613.5},
                            {x: 1003, y: 631.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1003, y: 631.5},
                            {x: 950, y: 613},
                            {x: 972.5, y: 586},
                            {x: 1026, y: 605}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1026, y: 605},
                            {x: 972.5, y: 586},
                            {x: 999, y: 559},
                            {x: 1050, y: 579}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1050, y: 579},
                            {x: 999, y: 559},
                            {x: 1022, y: 534.5},
                            {x: 1076, y: 551.5},
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1076, y: 551.5},
                            {x: 1022, y: 534.5},
                            {x: 1047, y: 508},
                            {x: 1100, y: 525}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1100, y: 525},
                            {x: 1047, y: 508},
                            {x: 1072, y: 481.5},
                            {x: 1124, y: 498.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1124, y: 498.5},
                            {x: 1072, y: 481.5},
                            {x: 1095, y: 455.5},
                            {x: 1149, y: 471.5}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                {
                    id: 'test42',
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
                            {x: 1149, y: 471.5},
                            {x: 1095, y: 455.5},
                            {x: 1123, y: 424.5},
                            {x: 1194, y: 425}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                // ---------------------BOTTOM SIDE----------------------------------
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
                            {"x": 336, "y": 247},
                            {"x": 251, "y": 198},
                            {"x": 295, "y": 168},
                            {"x": 383, "y": 218},
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
                            {"x": 383, "y": 218},
                            {"x": 295, "y": 168},
                            {"x": 342, "y": 140},
                            {"x": 430, "y": 190},
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
                            {"x": 430, "y": 190},
                            {"x": 342, "y": 140},
                            {"x": 388, "y": 113},
                            {"x": 476, "y": 163},
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
                            {x: 476, y: 163},
                            {x: 388, y: 113},
                            {x: 435, y: 85},
                            {x: 524, y: 134}
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
                            {x: 545, y: 148},
                            {x: 436, y: 84},
                            {x: 483, y: 56},
                            {x: 565, y: 105},
                            {x: 585, y: 118}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },
                // experiment
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
                            {x: 462, y: 299},
                            {x: 363, y: 257},
                            {x: 412, y: 227},
                            {x: 498, y: 271},
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
                            {x: 498, y: 271},
                            {x: 412, y: 227},
                            {x: 458, y: 200},
                            {x: 535, y: 241}
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
                            {x: 532, y: 242},
                            {x: 456, y: 201},
                            {x: 500, y: 174},
                            {x: 572, y: 210},
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
                            {x: 572, y: 210},
                            {x: 499, y: 175},
                            {x: 545, y: 148},
                            {x: 609, y: 181},
                            {x: 587, y: 200},
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
                            {x: 637, y: 194},
                            {x: 590, y: 173},
                            {x: 545, y: 148},
                            {x: 585, y: 118},
                            {x: 682, y: 157}
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
                            {x: 741, y: 221},
                            {x: 645, y: 188},
                            {x: 683, y: 157},
                            {x: 767, y: 190}
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
                            {x: 642, y: 242},
                            {x: 598, y: 226},
                            {x: 645, y: 188},
                            {x: 685, y: 202}
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
                            {x: 599, y: 281},
                            {x: 550, y: 265},
                            {x: 598, y: 226},
                            {x: 642, y: 242},
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
                            {x: 553, y: 326},
                            {x: 497, y: 310},
                            {x: 550, y: 265},
                            {x: 599, y: 281},
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
                            {x: 688, y: 257},
                            {x: 642, y: 242},
                            {x: 685, y: 202},
                            {x: 724, y: 215}
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
                            {x: 650, y: 297},
                            {x: 599, y: 281},
                            {x: 642, y: 242},
                            {x: 688, y: 257}
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
                            {x: 611, y: 340},
                            {x: 553, y: 326},
                            {x: 599, y: 281},
                            {x: 650, y: 297}
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
                            {x: 809, y: 245},
                            {x: 741, y: 221},
                            {x: 767, y: 190},
                            {x: 836, y: 214}
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
                            {x: 788, y: 271},
                            {x: 731, y: 251},
                            {x: 753, y: 225},
                            {x: 811, y: 243},
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
                            {x: 765, y: 297},
                            {x: 708, y: 277},
                            {x: 731, y: 251},
                            {x: 788, y: 271},
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
                            {x: 742, y: 323},
                            {x: 684, y: 303},
                            {x: 708, y: 277},
                            {x: 765, y: 297},
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
                            {x: 719, y: 347},
                            {x: 661, y: 328},
                            {x: 684, y: 303},
                            {x: 742, y: 323},
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
                            {x: 708, y: 358},
                            {x: 645, y: 346},
                            {x: 661, y: 328},
                            {x: 719, y: 347},
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
                            {x: 772, y: 371},
                            {x: 708, y: 358},
                            {x: 749, y: 315},
                            {x: 804, y: 335},
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
                            {x: 804, y: 335},
                            {x: 749, y: 315},
                            {x: 774, y: 288},
                            {x: 831, y: 307}
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
                            {x: 831, y: 307},
                            {x: 774, y: 288},
                            {x: 797, y: 261},
                            {x: 855, y: 279}
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
                            {x: 855, y: 279},
                            {x: 797, y: 261},
                            {x: 836, y: 214},
                            {x: 905, y: 242},
                            {x: 889, y: 262},
                            {x: 872, y: 257},
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

                            {x: 904, y: 267},
                            {x: 874, y: 300},
                            {x: 930, y: 320},
                            {x: 975, y: 269},
                            {x: 905, y: 242},
                            {x: 889, y: 262},
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
                            {x: 907, y: 347},
                            {x: 850, y: 328},
                            {x: 874, y: 300},
                            {x: 930, y: 320},
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
                            {x: 875, y: 381},
                            {x: 809, y: 375},
                            {x: 850, y: 328},
                            {x: 907, y: 347},
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
                            {x: 941, y: 388},
                            {x: 875, y: 381},
                            {x: 918, y: 334},
                            {x: 976, y: 353}
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
                            {x: 976, y: 353},
                            {x: 918, y: 334},
                            {x: 942, y: 306},
                            {x: 998, y: 326}
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
                            {x: 998, y: 326},
                            {x: 941, y: 308},
                            {x: 975, y: 269},
                            {x: 1043, y: 298},
                            {x: 1028, y: 316},
                            {x: 1012, y: 310}
                        ],
                        fill: 'yellow',
                        stroke: 'red'
                    }
                },

            ],
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
        }),
        methods: {
            init() {
                this.initElements();
                this.initData();
                this.initView();
                this.initActions();
                this.elements.closer.el.addEventListener('click', () => {
                    this.hideModal();
                    this.hideLayout();
                });
                this.elements.layout.el.addEventListener('click', () => {
                    this.hideModal();
                    this.hideLayout();
                });
                this.updateInputRange();
            },
            initElements() {
                this.elements.map.el = this.getElId(this.elements.id);
                this.elements.map.d3El = d3.select(`#${this.elements.id}`);
                this.elements.layout.el = this.getElId(this.elements.layout.id);
                this.elements.modal.el = this.getElId(this.elements.modal.id);
                this.elements.closer.el = this.getElId(this.elements.closer.id);
                this.elements.start.el = this.getElId(this.elements.start.id);
                this.elements.stop.el = this.getElId(this.elements.stop.id);
            },
            initData() {
                const mapImg = document.getElementById('mapImg')
                this.widthMap = this.getWidthD3(mapImg);
                this.heightMap = this.getHeightD3(mapImg);
            },
            initView() {
                this.appendSvg();
                this.appendG();
                this.appendScaleLiner();
                window.removeEventListener('resize', this.resize);
                window.addEventListener('resize', this.resize);
                this.getElId('map').addEventListener('wheel', w => {
                    if (w.deltaY < 0) {
                        w.preventDefault();
                        this.getElId('nav').classList.add('hide');
                        this.getElId('sales-wrapper').classList.add('zoom')
                    } else {
                        this.getElId('sales-wrapper').classList.remove('zoom')
                        this.getElId('nav').classList.remove('hide');
                    }
                })
                this.createPolygon(this.objects);
                const height = document.documentElement.clientHeight / 2;
                const width = document.documentElement.clientWidth / 2;
                window.scrollTo((document.documentElement.scrollWidth / 2) - width, (document.documentElement.scrollHeight / 2) - height);
            },
            initActions() {
                d3.select("svg")
                    .selectAll("polygon")
                    .on("click", (d) => {
                        d3.event.stopPropagation();
                        this.showModal();
                        this.showLayout();
                    })
                    .on("mouseover", (d) => {
                    })
                    .on("mouseleave", (d) => {
                    })
            },
            showModal() {
                this.elements.modal.el.classList.remove('hide')
            },
            showLayout() {
                this.elements.layout.el.classList.remove('hide')
            },
            hideLayout() {
                this.elements.layout.el.classList.add('hide')
            },
            hideModal() {
                this.elements.modal.el.classList.add('hide')
            },
            updateInputRange() {
                d3.select("#nAngle").on("input", function () {
                    this.update(+this.value);
                });
            },
            resize() {
                // TODO blur or loader
                this.removeSvg();
                this.init();
                const height = document.documentElement.clientHeight / 2;
                const width = document.documentElement.clientWidth / 2;
                window.scrollTo((document.documentElement.scrollWidth / 2) - width, (document.documentElement.scrollHeight / 2) - height);
            },
            getImg() {
                '<img unselectable="on" src="/setka2.jpg" class="img-fluid w-100" id="dynamicImg">'
            },
            removeSvg() {
                d3.select('svg').remove()
            },
            getElId(name) {
                return document.getElementById(name)
            },
            getWidthD3(name) {
                return Math.round(Number(d3.select(name).style('width').slice(0, -2)))
            },
            getHeightD3(name) {
                return Math.round(Number(d3.select(name).style('height').slice(0, -2)))
            },
            appendSvg() {
                this.elements.svg.d3El = d3.select("#map").append("svg")
                    .attr("width", this.widthMap)
                    .attr("height", this.heightMap)
                ;
            },
            appendG() {
                this.elements.g.d3El = d3.select('svg').append("g")
            },
            appendScaleLiner() {
                this.elements.scaleLinerX = d3.scaleLinear().domain([0, 1200]).range([0, this.widthMap]);
                this.elements.scaleLinerY = d3.scaleLinear().domain([0, 675]).range([this.heightMap, 0]);
            },
            createPolygon(data) {
                d3.select('g')
                    .selectAll('polygon').select('g')
                    .data(data)
                    .enter().append("polygon")
                    .attr("points", (d) => {
                        return d.modelView.polygon.map(d => {
                            return [this.elements.scaleLinerX(d.x), this.elements.scaleLinerY(d.y)].join(",");
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
        mounted() {
            this.init();
        }
    }
</script>

<style scoped lang="scss">
  .search-bar {
    position: fixed;
    bottom: 42px;
    right: 60px;
    background: #000;
    width: 551px;
    height: 42px;
    z-index: 20;

    button {
      background-color: transparent;
      outline: none;
      border: none;
      box-shadow: none;
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      /* identical to box height */

      text-transform: uppercase;

      color: #FFFFFF;
    }

    .inp-group {
      width: 120px;
      height: 30px;
      display: flex;

      button {
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        outline: none;
        border: none;
        box-shadow: none;
        background: rgba(255, 255, 255, 0.7);
        width: 30%;

        &:focus {
          transition: .5s ease-in-out;
          background: white;
        }

        img {
          display: block;
          width: 16px;
          height: 16px;
        }
      }

      input {
        display: block;
        width: 70%;
        outline: none;
        border: none;
        box-shadow: none;
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        padding-left: 5px;
        background: rgba(255, 255, 255, 0.7);
        color: #575757;

        &:focus {
          transition: .5s ease-in-out;
          background: white;
        }
      }
    }

    .status {
      display: flex;
      text-transform: uppercase;
      padding: 6px 0;

      &-red {
        &:before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 5px;
          background-color: #D10D0D;
        }
      }

      &-yellow {
        @extend .status-red;

        &:before {
          background-color: #FAD61D;
        }
      }

      &-green {
        @extend .status-red;

        &:before {
          background-color: #048819;
        }
      }
    }
  }

  hr {
    background: #282828;
  }

  .wrapper {
    display: -ms-grid;
    display: grid;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .min-container {
    min-width: 1277px;
    min-height: 660px;
  }

  @media screen and (max-width: 1320px) {
    .wrapper {
      min-width: 1277px;
      min-height: 660px;
    }

    .big-img {
      min-width: 1277px;
      min-height: 660px;
    }
  }

  .big-img {
    -o-object-fit: none;
    object-fit: none;
    display: block;
    position: relative;
    z-index: 1;
  }

  .item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: -ms-grid;
    display: grid;
  }

  .wrapper-content-svg {
    display: -ms-grid;
    display: grid;
    height: 100vh;
  }

  .item img {
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
    -ms-grid-column-align: center;
    justify-self: center;
    display: block;
    width: 1277px;
    height: 660px;
    position: relative;
    z-index: 10;
    opacity: 0;
  }


  /* new */


  body, html, * {
    padding: 0;
    margin: 0;
    /*width: 100%;*/
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .btn-group {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1;
  }

  iframe {
    width: 100%;
    height: 100vh;
    padding: 50px;
  }

  .linkD {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .linkD:after {
    content: '';
    display: none;
    background-color: yellow;
    opacity: .6;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .linkD:hover:after {
    display: block;
    -webkit-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    color: darkred;
    -webkit-transition: 1s ease;
    -o-transition: 1s ease;
    transition: 1s ease;
  }

  #closer {
    display: block;
    width: 17px;
    height: 17px;

    &:hover {
      transform: rotate(360deg);
      transition: 1s ease;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .layout {
    position: fixed;
    top: 0;
    left: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 900;
  }

  #modal {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    width: 300px;
    min-height: 444px;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f1e767', endColorstr='#feb645', GradientType=1);
  }

  .viewport-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 100vh;

  }

  #container {
    position: relative;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  #map {
    position: absolute;
    top: 63px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-size: cover !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .viewport-map {
    padding-top: 56%;
    height: 0;
  }

  #map svg {
    -o-object-fit: contain;
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    z-index: 999;
  }

  .hide {
    display: none !important;
  }

  /*modal*/
  #modal {
    z-index: 999;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    max-width: 1050px;
    overflow: hidden;
    font-size: 14px;
    -webkit-box-shadow: -1px 0px 17px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 0px 17px 0px rgba(0, 0, 0, 0.75);
    background: rgba(255, 255, 255, 0.8);
  }

  @media screen and (max-width: 768px) {
    #modal {
      left: 0 !important;
    }
  }

  .base {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    min-height: 353px;
    height: auto;

    h5 {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 27px;
      color: #000000;
    }
  }

  .sec {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

  }

  .sec a {
    text-decoration: none;
  }

  .sec a:hover {
    color: darkred;
  }

  .text-container {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .left, .right {
    width: 50%;
  }

  .right {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }

  .img-container {
    height: 100px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .header-part {
    width: 50%;

    p {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 25px;
      line-height: 34px;
      color: #282828;
    }
  }

  .header-part__right {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    text-align: right;
    font-size: 18px;
  }

  .addBlur {
    -webkit-filter: blur(4px);
    filter: blur(4px);
  }

  .removeBlur {
    -webkit-filter: none;
    filter: none;
  }

  #closer1 {
    position: fixed;
    top: 50px;
    right: 60px;
    z-index: 1600;
    color: black;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  #closer1:hover {
    color: red;
    -webkit-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
  }

  .zoom {
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    overflow: auto;
  }

  @media screen and (min-width: 1600px) {
    .zoom {
      -webkit-transform: scale(1.2);
      -ms-transform: scale(1.2);
      transform: scale(1.2);
      overflow: auto;
    }
  }

  @media screen and (min-width: 1800px) {
    .zoom {
      -webkit-transform: scale(1.3);
      -ms-transform: scale(1.3);
      transform: scale(1.3);
      overflow: auto;
    }
  }

  .plan-img {
    width: 325px;
    height: 233px;
    cursor: default;
    background: grey;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .save-link {
    display: block;
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    text-decoration-line: underline;
    color: #676767;

    img {
      width: 45px;
      height: 45px;
      display: block;
    }
  }

  .p-title {
    width: 184px;
  }

  .model-controls {
    width: 50px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: -4px;

    div {
      width: 15px;
      height: 15px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
</style>
