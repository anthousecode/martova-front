<template>
  <section id="sales-wrapper">
    <div v-if="getWindowWidth>1025" id="search-bar" class="search-bar d-flex justify-content-around align-items-center">
      <notifications group="foo" position="center"/>
      <button @click="filterByStatus('rgba(255, 72, 9, 0.4)')" class="status status-red">
        {{this.$options.filters.toUSD(language, 'Sales')}}
      </button>
      <button @click="filterByStatus('rgba(250, 214, 29, 0.4)')" class="status status-yellow">
        {{this.$options.filters.toUSD(language, 'Reserved')}}
      </button>
      <button @click="filterByStatus('rgba(4, 136, 25, 0.4)')" class="status status-green">
        {{this.$options.filters.toUSD(language, 'Free')}}
      </button>
      <button
        v-if="isFiltered"
        @click="clearFilters"
        style="font-size: 22px;"
      >
        &empty;
      </button>
      <client-only>
        <div class="inp-group">
          <button @click="searchRegionByNumber">
            <img src="/lupa.svg" alt="lupa">
          </button>
          <input
            @keyup.enter="searchRegionByNumber"
            v-click-outside="clearRegionNumber"
            v-model="regionNumber"
            type="number"
            :placeholder="`№ ${this.$options.filters.toUSD(language, 'Участка')}`"
          >
        </div>
      </client-only>
    </div>
    <div v-else id="search-bar__mob" class="d-flex justify-content-center align-items-center">
      <notifications group="foo" position="center"/>
      <client-only>
        <div class="inp-group d-flex flex-row-reverse">
          <button @click="searchRegionByNumber">
            <img src="/lupa_white.svg" alt="lupa">
          </button>
          <input
            @keyup.enter="searchRegionByNumber"
            v-click-outside="clearRegionNumber"
            v-model="regionNumber"
            type="number"
            :placeholder="`№ ${this.$options.filters.toUSD(language, 'Участка')}`"
          >
        </div>
      </client-only>
    </div>
    <!--search-->
    <div class="layout hide" id="layout">
      <div v-click-outside="hideAll" id="modal" class="hide px-4 pt-4 pb-1">
        <div class="d-flex justify-content-between header">
          <div class="header-part header-part__left">
            <p>Паспорт {{this.$options.filters.toUSD(language, 'Участка')}} № {{currentRegion.otherInfo.number}}</p>
          </div>
          <div>
            <a @click="hideAll" href="#" id="closer"><img src="../static/closerModal.svg" alt="close"></a>
          </div>
        </div>
        <hr class="p-0 mt-1">
        <div class="base pt-2 d-flex flex-column">
          <h5>{{this.$options.filters.toUSD(language, 'Общая информация')}}</h5>
          <div class="d-flex flex-grow-1">
            <div class="left w-75">
              <div class="d-flex">
                <div>
                  <div class="d-flex list"><p class="p-title">{{this.$options.filters.toUSD(language,
                    'CadastrNumber')}}</p>
                    <p class="p-description">
                      <a class="kad-link" href="http://map.land.gov.ua/kadastrova-karta" target="_blank">{{currentRegion.otherInfo.cad_number}}</a>
                    </p>
                  </div>
                  <div class="d-flex list"><p class="p-title">
                    {{this.$options.filters.toUSD(language, 'Тип собственности')}}:
                  </p>
                    <p class="p-description">{{this.$options.filters.toUSD(language,
                      'type')}}</p></div>
                  <div class="d-flex list"><p class="p-title">
                    {{this.$options.filters.toUSD(language, 'Целевое назначение')}}:
                  </p>
                    <p class="p-description">{{this.$options.filters.toUSD(language,
                      'meta')}}</p>
                  </div>
                  <div class="d-flex list"><p class="p-title">{{this.$options.filters.toUSD(language, 'Площадь')}}: </p>
                    <p class="p-description">{{currentRegion.otherInfo.square}} га</p></div>
                  <div class="d-flex list">
                    <p class="p-title"> Статус: </p>
                    <p :style="{borderBottom: `2px solid ${currentRegion.modelView.stroke}`}" class="p-description">
                      {{ language==='ru' ? currentRegion.status.ru_name : currentRegion.status.ua_name}}</p>
                  </div>
                  <div class="d-flex list">
                    <p class="p-title"> {{this.$options.filters.toUSD(language, 'Цена')}}: </p>
                    <p class="p-description">$
                      {{currentRegion.otherInfo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}</p></div>
                </div>
              </div>


              <div class="d-flex mt-3">
                <turntable
                  v-if="hideTurntable"
                  :rotateCounter="rotateCounter"
                  @setLastIndexToCounter="setLastIndexToCounter"
                  @setZeroIndexToCounter="setZeroIndexToCounter"
                />
                <div class=" pl-4">
                  <p class="mb-2" style="color:black;">
                    {{this.$options.filters.toUSD(language, 'Геодезическая съемкa')}}</p>
                  <div>
                    <a :href="currentRegion.survey" class="save-link d-flex align-items-center" download>
                      <img src="../static/dwg.svg" alt="doc">
                      <span>{{this.$options.filters.toUSD(language, 'Скачать')}}</span>
                    </a>

                    <a :href="currentRegion.plan" class="save-link d-flex align-items-center mt-3" download>
                      <img src="../static/pdf.svg" alt="doc">
                      <span>{{this.$options.filters.toUSD(language, 'Скачать')}}</span>
                    </a>
                  </div>
                </div>
                <div class="model-controls d-flex justify-content-between">
                  <div
                    @mousedown="startTurntableMouseDown('left')"
                    @mouseup="stopTurntable()"
                    @click="startTurntable('left')"
                  >
                    <img src="/prev.svg" alt="prev">
                  </div>
                  <div
                    @mouseup="stopTurntable()"
                    @mousedown="startTurntableMouseDown('right')"
                    @click="startTurntable('right')"
                  >
                    <img src="/next.svg" alt="next">
                  </div>
                </div>
              </div>
            </div>
            <div class="w-50 position-relative">
              <div style="width: 100%;">
                <p class="mb-2" style="color:black;">{{this.$options.filters.toUSD(language, 'Кадастровый план')}} </p>
                <a href="#" class="plan-img">
                  <img :src="currentRegion.image" alt="plan">
                </a>

                <a :href="foof(currentRegion)" target="_blank" class="save-link text-right" style="cursor: pointer">
                  {{this.$options.filters.toUSD(language, 'Распечатать')}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--New  -->

    <div class="wrapper min-container" style="background-color: black">
      <img v-if="getWindowWidth<=1202" class="big-img min-container" id="bigImg3" src="/uchastki_top.jpg"
           alt="big">
      <img v-else-if="getWindowWidth>1203 && getWindowWidth<=1281" class="big-img min-container" id="bigImg3"
           src="/12801.jpg" alt="big">
      <img v-else-if="getWindowWidth>1280 && getWindowWidth<1681 && getWindowHeight<978" class="big-img min-container"
           id="bigImg8" src="/1680.jpg" alt="big">
      <img v-else-if="getWindowHeight===1024" class="big-img min-container" id="bigImg3" src="/uchastki_top.jpg"
           alt="big">
      <img v-else-if="getWindowWidth>1280 && getWindowWidth<1681  && getWindowHeight>=978"
           class="big-img min-container" id="bigImg7" src="/16801.jpg" alt="big">
      <img v-else-if="getWindowWidth>1681 && getWindowWidth<1921" class="big-img min-container" id="bigImg2"
           src="/19201.jpg" alt="big">
      <img v-else-if="getWindowWidth>=1921 && getWindowWidth<2800" class="big-img min-container" id="bigImg"
           src="/2048.jpg" alt="big">
      <img v-else-if="getWindowWidth===2880" class="big-img min-container" id="bigImg12" src="/pro.jpg" alt="big">
      <img v-else-if="getWindowWidth===3200" class="big-img min-container" id="bigImg55" src="/3600.jpg" alt="big">
      <img v-else class="big-img min-container" id="bigImg4" src="/4k.jpg" alt="big">


      <div class="item">
        <div class="wrapper-content-svg">
          <img src="/smallD.jpg" id="mapImg" alt="current">
          <div id="map"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
    import turntable from "../components/turntable";
    import vClickOutside from 'v-click-outside';
    import {mapGetters} from 'vuex';
    import localizeFilter from "../plugins/locales/localize.filter";
    import $ from 'jquery';

    export default {
        name: "Sales",
        components: {
            turntable,
            vClickOutside,
        },
        head: {
            script: [
                {src: 'https://api.martovariverside.com'}
            ]
        },
        data: () => ({
            window: {},
            widthMap: 0,
            heightMap: 0,
            regionNumber: null,
            hideTurntable: false,
            isFiltered: false,
            currentRegionId: null,
            alert: false,
            images: [],
            rotateDirection: '',
            rotateCounter: 0,
            starter3D: null,
            searchedPolygonFill: '',
            // moca for current region
            currentRegion: {
                id: '8',
                status: 'Зарезервирован',
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
                    fill: 'rgba(250, 214, 29, 0.5)',
                    stroke: '#FAD61D'
                }
            },
            // moca for current region End
            img: {},
            objects: [
                {
                    id: '1',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '2',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '3',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '4',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '5',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '6',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '7',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '8',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '9',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '10',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '11',
                    status: 'Свободен',
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
                            {"x": 238, "y": 469},
                            {"x": 286, "y": 417},
                            {"x": 338.5, "y": 438},
                            {"x": 313, "y": 468},
                            {"x": 327, "y": 473},

                        ],
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '12',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '13',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '14',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '15',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '16',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '17',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '18',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '19',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '20',
                    status: 'Свободен',
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
                        fill: 'rgba(4, 136, 25, 0.5)',
                        stroke: '#048819'
                    }
                },
                {
                    id: '21',
                    status: 'Зарезервирован',
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
                            {"x": 385, "y": 509},
                            {"x": 421, "y": 473},
                            {"x": 477, "y": 492},
                            {"x": 460, "y": 507},
                            {"x": 478, "y": 513},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
// endpoint

                {
                    id: '22',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '23',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '24',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '25',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '26',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '27',
                    status: 'Зарезервирован',
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
                            {x: 745, y: 402}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '28',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '29',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '30',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '31',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 607, y: 568},
                            {x: 535, y: 548},
                            {x: 578, y: 501},
                            {x: 634, y: 520},
                            {x: 613, y: 542},
                            {x: 627, y: 548}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '32',
                    status: 'Зарезервирован',
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
                            {x: 607, y: 568},
                            {x: 627, y: 548},
                            {"x": 641, "y": 553},
                            {x: 656, y: 538.5},
                            {x: 713, y: 556.5},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '33',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '34',
                    status: 'Зарезервирован',
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
                            {x: 702, y: 489.5},
                            {x: 757, y: 507.5}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '35',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 757, y: 507.5},
                            {x: 702, y: 489.5},
                            {x: 725, y: 467},
                            {x: 781, y: 483.5},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '36',
                    status: 'Зарезервирован',
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
                            {x: 725, y: 466.5},
                            {x: 781, y: 483.5},
                            {x: 803, y: 459.5},

                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '37',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },

                {
                    id: '38',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 870.5, y: 462.5},
                            {x: 816, y: 445.5},
                            {x: 843, y: 413.5},
                            {x: 913, y: 418.5}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },


                {
                    id: '39',
                    status: 'Зарезервирован',
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
                            {x: 816, y: 445.5},
                            {x: 870.5, y: 462.5}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '40',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '41',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '42',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 721, y: 545.5},
                            {x: 775.5, y: 562.5},
                            {x: 799, y: 537.5},
                            {x: 745, y: 520.5}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '43',
                    status: 'Зарезервирован',
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
                            {x: 720, y: 598},
                            {x: 682, y: 587},
                            {x: 721, y: 545.5},
                            {x: 775.5, y: 562.5},
                            {x: 759, y: 581.2},
                            {x: 773.5, y: 585.5}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '44',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 826, y: 625},
                            {x: 758, y: 607.5},
                            {x: 773, y: 585.5},
                            {x: 788, y: 590.5},
                            {x: 803, y: 575.5},
                            {x: 857, y: 593.5}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '45',
                    status: 'Зарезервирован',
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
                            {x: 880, y: 568}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '46',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 880, y: 568},
                            {x: 826.5, y: 549},
                            {x: 849, y: 525},
                            {x: 905, y: 542}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '47',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 905, y: 542},
                            {x: 849, y: 525},
                            {x: 872, y: 499.5},
                            {x: 928, y: 519}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '48',
                    status: 'Зарезервирован',
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
                            {x: 927, y: 520},
                            {x: 952, y: 495}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '49',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '50',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '51',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '52',
                    status: 'Зарезервирован',
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
                            {x: 1090, y: 423}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '53',
                    status: 'Зарезервирован',
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
                            {x: 941, y: 504},
                            {x: 965, y: 481},
                            {x: 1020.5, y: 497},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '54',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 972, y: 545.5},
                            {x: 919, y: 528},
                            {x: 942, y: 504},
                            {x: 996, y: 521},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '55',
                    status: 'Зарезервирован',
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
                            {x: 919, y: 528},
                            {x: 972, y: 545.5},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '56',
                    status: 'Зарезервирован',
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
                            {x: 872, y: 578},
                            {x: 895, y: 553},
                            {x: 949, y: 571},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '57',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 902, y: 646.5},
                            {x: 850, y: 632.5},
                            {x: 827, y: 625.5},
                            {x: 872, y: 578},
                            {x: 926, y: 595},
                            {x: 906, y: 620},
                            {x: 920.5, y: 625}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '58',
                    status: 'Зарезервирован',
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
                            {x: 902, y: 646.5},
                            {x: 920, y: 625.5},
                            {x: 934, y: 629.5},
                            {x: 950, y: 613.5},
                            {x: 1003, y: 631.5}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '59',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '60',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '61',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '62',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '63',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '64',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '65',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                // ---------------------BOTTOM SIDE----------------------------------
                {
                    id: '66',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '67',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '68',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '69',
                    status: 'Зарезервирован',
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
                            {x: 524, y: 136}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '70',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                // experiment
                {
                    id: '71',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '72',
                    status: 'Зарезервирован',
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
                            {x: 456, y: 200},
                            {x: 533, y: 242}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '73',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '74',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '75',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '76',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '77',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '78',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '79',
                    status: 'Продан',
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
                        fill: 'rgba(209, 13, 13, 0.5)',
                        stroke: '#D10D0D'
                    }
                },


                {
                    id: '80',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '81',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '82',
                    status: 'Продан',
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
                        fill: 'rgba(209, 13, 13, 0.5)',
                        stroke: '#D10D0D'
                    }
                },


                {
                    id: '83',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 811, y: 243},
                            {x: 741, y: 220},
                            {x: 767, y: 190},
                            {x: 836, y: 215}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '84',
                    status: 'Зарезервирован',
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
                            {x: 732, y: 251},
                            {x: 754, y: 225},
                            {x: 811, y: 243},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '85',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 764, y: 297},
                            {x: 708, y: 277},
                            {x: 731, y: 251},
                            {x: 788, y: 271},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '86',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 741, y: 323},
                            {x: 684, y: 303},
                            {x: 708, y: 277},
                            {x: 764, y: 297},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '87',
                    status: 'Зарезервирован',
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
                            {x: 741, y: 323},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '88',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '89',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 773, y: 370},
                            {x: 708, y: 358},
                            {x: 749, y: 315},
                            {x: 804, y: 335},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '90',
                    status: 'Зарезервирован',
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
                            {x: 830, y: 307}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '91',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 830, y: 307},
                            {x: 774, y: 288},
                            {x: 797, y: 261},
                            {x: 854, y: 279}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '92',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 854, y: 279},
                            {x: 797, y: 261},
                            {x: 836, y: 215},
                            {x: 905, y: 242},
                            {x: 889, y: 262},
                            {x: 872, y: 257},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '93',
                    status: 'Зарезервирован',
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
                            {x: 974, y: 270},
                            {x: 905, y: 242},
                            {x: 889, y: 262},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '94',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '95',
                    status: 'Зарезервирован',
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
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '96',
                    status: 'Продан',
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
                            {x: 975, y: 353}
                        ],
                        fill: 'rgba(209, 13, 13, 0.5)',
                        stroke: '#D10D0D'
                    }
                },
                {
                    id: '97',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 975, y: 353},
                            {x: 918, y: 334},
                            {x: 942, y: 306},
                            {x: 997, y: 326}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '98',
                    status: 'Зарезервирован',
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
                            {x: 941, y: 306},
                            {x: 974, y: 270},
                            {x: 1043, y: 297},
                            {x: 1026, y: 316},
                            {x: 1012, y: 311}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '99',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 1041, y: 321},
                            {x: 1022, y: 342},
                            {x: 1079, y: 359},
                            {x: 1114, y: 325},
                            {x: 1043, y: 297},
                            {x: 1026, y: 316},
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '100',
                    status: 'Зарезервирован',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 1050, y: 391},
                            {x: 981, y: 389},
                            {x: 1022, y: 342},
                            {x: 1079, y: 359}
                        ],
                        fill: 'rgba(250, 214, 29, 0.5)',
                        stroke: '#FAD61D'
                    }
                },
                {
                    id: '101',
                    status: 'Продан',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 1120, y: 391},
                            {x: 1050, y: 391},
                            {x: 1087, y: 352},
                            {x: 1141, y: 369}
                        ],
                        fill: 'rgba(209, 13, 13, 0.5)',
                        stroke: '#D10D0D'
                    }
                },
                {
                    id: '102',
                    status: 'Продан',
                    // TODO if need this or add new field
                    otherInfo: {
                        number: '10',
                        kadNumber: '43342347343:67346:888',
                        square: '0,536',
                        price: '15000'
                    },
                    modelView: {
                        polygon: [
                            {x: 1141, y: 369},
                            {x: 1087, y: 352},
                            {x: 1114, y: 324},
                            {x: 1167, y: 344}
                        ],
                        fill: 'rgba(209, 13, 13, 0.5)',
                        stroke: '#D10D0D'
                    }
                },

            ],
            objectsMobile: [
                {
                    id: '10',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 421, y: 537},
                            {x: 340, y: 514},
                            {x: 341, y: 483},
                            {x: 342, y: 479},
                            {x: 432, y: 507},
                        ],
                        fill: '#048819',
                        stroke: '#048819'
                    }
                },
                {
                    id: '9',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 342, y: 479},
                            {x: 354, y: 452},
                            {x: 426, y: 478},
                            {x: 419, y: 502},

                        ],
                        fill: '#048819',
                        stroke: '#048819'
                    }
                },
                {
                    id: '8',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 426, y: 478},
                            {x: 354, y: 452},
                            {x: 369, y: 434},
                            {x: 378, y: 430},
                            {x: 435, y: 448},
                        ],
                        fill: '#048819',
                        stroke: '#048819'
                    }
                },
                {
                    id: '7',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 435, y: 448},
                            {x: 378, y: 430},
                            {x: 391, y: 425},
                            {x: 399, y: 405},
                            {x: 443, y: 421},

                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '6',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 443, y: 421},
                            {x: 399, y: 405},
                            {x: 411, y: 377},
                            {x: 453, y: 392},

                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '18',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 449, y: 545},
                            {x: 421, y: 537},
                            {x: 437, y: 486},
                            {x: 464, y: 497},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '17',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 464, y: 497},
                            {x: 437, y: 486},
                            {x: 452, y: 441},
                            {x: 479, y: 452},

                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '16',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 479, y: 452},
                            {x: 452, y: 441},
                            {x: 466, y: 397},
                            {x: 493, y: 407},

                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '19',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 506, y: 463},
                            {x: 479, y: 452},
                            {x: 493, y: 407},
                            {x: 520, y: 417},

                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '20',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 491, y: 508},
                            {x: 464, y: 497},
                            {x: 479, y: 452},
                            {x: 506, y: 463},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '21',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 484, y: 556},
                            {x: 449, y: 545},
                            {x: 464, y: 497},
                            {x: 491, y: 508},
                            {x: 482, y: 535},
                            {x: 490, y: 539},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },

                // ацуа
                {
                    id: '30',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 521, y: 565},
                            {x: 484, y: 556},
                            {x: 490, y: 539},
                            {x: 498, y: 541},
                            {x: 504, y: 523},
                            {x: 531, y: 533},

                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '29',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 531, y: 533},
                            {x: 504, y: 523},
                            {x: 511, y: 500},
                            {x: 539, y: 510},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '28',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 539, y: 510},
                            {x: 511, y: 500},
                            {x: 519, y: 476},
                            {x: 547, y: 486},

                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '27',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 547, y: 486},
                            {x: 519, y: 476},
                            {x: 526, y: 453},
                            {x: 554, y: 463},


                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '26',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 554, y: 464},
                            {x: 526, y: 453},
                            {x: 536, y: 423},
                            {x: 566, y: 429},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '34',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 584, y: 470},
                            {x: 555, y: 460},
                            {x: 566, y: 429},
                            {x: 595, y: 434},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '35',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 576, y: 493},
                            {x: 548, y: 483},
                            {x: 555, y: 460},
                            {x: 584, y: 470},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '36',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 569, y: 516},
                            {x: 540, y: 506},
                            {x: 548, y: 483},
                            {x: 576, y: 493},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '37',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 562, y: 539},
                            {x: 533, y: 530},
                            {x: 540, y: 506},
                            {x: 569, y: 516},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '38',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 559, y: 574},
                            {x: 521, y: 565},
                            {x: 533, y: 530},
                            {x: 562, y: 539},
                            {x: 557, y: 555},
                            {x: 565, y: 558},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                // new
                {
                    id: '48',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 596, y: 582},
                            {x: 559, y: 574},
                            {x: 565, y: 558},
                            {x: 573, y: 560},
                            {x: 581, y: 534},
                            {x: 608, y: 544},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '47',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 608, y: 544},
                            {x: 581, y: 534},
                            {x: 588, y: 512},
                            {x: 616, y: 522},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '46',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 616, y: 522},
                            {x: 588, y: 512},
                            {x: 595, y: 490},
                            {x: 623, y: 500},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '45',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 623, y: 500},
                            {x: 595, y: 490},
                            {x: 603, y: 467},
                            {x: 631, y: 477},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '44',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 631, y: 477},
                            {x: 603, y: 467},
                            {x: 611, y: 437},
                            {x: 643, y: 440},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '53',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 662, y: 481},
                            {x: 633, y: 471},
                            {x: 643, y: 440},
                            {x: 675, y: 441},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '54',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 655, y: 503},
                            {x: 626, y: 492},
                            {x: 633, y: 471},
                            {x: 662, y: 481},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '55',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 647, y: 526},
                            {x: 618, y: 515},
                            {x: 626, y: 492},
                            {x: 655, y: 503},
                        ],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '56',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 640, y: 548},
                            {x: 611.5, y: 537},
                            {x: 618, y: 515},
                            {x: 647, y: 526},],
                        fill: '',
                        stroke: '#048819'
                    }
                },
                {
                    id: '57',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 634, y: 593},
                            {x: 596, y: 583},
                            {x: 611, y: 537},
                            {x: 640, y: 548},
                            {x: 632, y: 572},
                            {x: 640, y: 575},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '66',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 672, y: 603},
                            {x: 634, y: 593},
                            {x: 640, y: 575},
                            {x: 649, y: 577},
                            {x: 653, y: 564},
                            {x: 680, y: 575},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '65',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 680, y: 575},
                            {x: 653, y: 564},
                            {x: 660, y: 541},
                            {x: 688, y: 552},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '64',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 688, y: 552},
                            {x: 660, y: 541},
                            {x: 667, y: 518},
                            {x: 695, y: 529},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '63',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 695, y: 529},
                            {x: 667, y: 518},
                            {x: 674, y: 495},
                            {x: 702, y: 506},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '62',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 702, y: 506},
                            {x: 674, y: 495},
                            {x: 682, y: 472},
                            {x: 710, y: 483},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '61',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 710, y: 483},
                            {x: 682, y: 472},
                            {x: 691, y: 444},
                            {x: 722, y: 444},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '70',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 742, y: 483},
                            {x: 714, y: 472},
                            {x: 722, y: 444},
                            {x: 755, y: 444},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '71',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 735, y: 506},
                            {x: 706, y: 495},
                            {x: 714, y: 472},
                            {x: 742, y: 483},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '72',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 727, y: 529},
                            {x: 698, y: 518},
                            {x: 706, y: 495},
                            {x: 735, y: 506},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '73',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 720, y: 552},
                            {x: 691, y: 541},
                            {x: 698, y: 518},
                            {x: 727, y: 529},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '74',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 712, y: 575},
                            {x: 684, y: 564},
                            {x: 691, y: 541},
                            {x: 720, y: 552},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '75',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 708, y: 613},
                            {x: 672, y: 603},
                            {x: 684, y: 564},
                            {x: 712, y: 575},
                            {x: 707, y: 592},
                            {x: 714, y: 594},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '84',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 747, y: 623},
                            {x: 708, y: 613},
                            {x: 714, y: 594},
                            {x: 722, y: 596},
                            {x: 727, y: 584},
                            {x: 755, y: 594},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                //
                {
                    id: '83',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 755, y: 594},
                            {x: 727, y: 584},
                            {x: 735, y: 561},
                            {x: 763, y: 570},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '82',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 763, y: 571},
                            {x: 735, y: 561},
                            {x: 742, y: 538},
                            {x: 770, y: 548},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '81',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 770, y: 548},
                            {x: 742, y: 538},
                            {x: 749, y: 515},
                            {x: 777, y: 525},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '80',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 777, y: 525},
                            {x: 749, y: 515},
                            {x: 757, y: 492},
                            {x: 785, y: 502},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '79',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 785, y: 502},
                            {x: 757, y: 492},
                            {x: 765, y: 469},
                            {x: 793, y: 479},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '78',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 793, y: 479},
                            {x: 765, y: 469},
                            {x: 773, y: 443},
                            {x: 804, y: 440},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },


                {
                    id: '87',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 825, y: 476},
                            {x: 796, y: 466},
                            {x: 804, y: 440},
                            {x: 837, y: 437},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '88',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 818, y: 499},
                            {x: 789, y: 489},
                            {x: 796, y: 466},
                            {x: 825, y: 476},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '89',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 811, y: 522},
                            {x: 782, y: 512},
                            {x: 789, y: 489},
                            {x: 818, y: 499},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '90',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 803, y: 545},
                            {x: 774, y: 535},
                            {x: 782, y: 512},
                            {x: 811, y: 522},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '91',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 796, y: 568},
                            {x: 767, y: 558},
                            {x: 774, y: 535},
                            {x: 803, y: 545},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                }, {
                    id: '92',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 788, y: 591},
                            {x: 760, y: 581},
                            {x: 767, y: 558},
                            {x: 796, y: 568},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '93',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 784, y: 632},
                            {x: 747, y: 622},
                            {x: 760, y: 581},
                            {x: 788, y: 591},
                            {x: 782, y: 611},
                            {x: 790, y: 614},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },


                {
                    id: '101',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 821, y: 641},
                            {x: 784, y: 632},
                            {x: 790, y: 614},
                            {x: 797, y: 615},
                            {x: 801, y: 602},
                            {x: 829, y: 612},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '100',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 801, y: 602},
                            {x: 829, y: 612},
                            {x: 837, y: 589},
                            {x: 809, y: 579},


                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '99',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 837, y: 589},
                            {x: 809, y: 579},
                            {x: 817, y: 554},
                            {x: 845, y: 564},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '98',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 845, y: 564},
                            {x: 817, y: 554},
                            {x: 825, y: 531},
                            {x: 853, y: 541},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '97',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 853, y: 541},
                            {x: 825, y: 531},
                            {x: 832, y: 508},
                            {x: 860, y: 518},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '96',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 860, y: 518},
                            {x: 832, y: 508},
                            {x: 840, y: 485},
                            {x: 867, y: 495},

                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '95',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 867, y: 495},
                            {x: 840, y: 485},
                            {x: 848, y: 461},
                            {x: 875, y: 471},


                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '94',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 875, y: 471},
                            {x: 848, y: 461},
                            {x: 855, y: 435},
                            {x: 887, y: 431},


                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                // BOTTOM SIDE
                {
                    id: '5',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 468, y: 359},
                            {x: 425, y: 333},
                            {x: 442, y: 304},
                            {x: 485, y: 332},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '4',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 485, y: 332},
                            {x: 442, y: 304},
                            {x: 460, y: 277},
                            {x: 503, y: 305},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '3',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 503, y: 305},
                            {x: 460, y: 277},
                            {x: 478, y: 251},
                            {x: 521, y: 278},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '2',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 521, y: 278},
                            {x: 478, y: 251},
                            {x: 496, y: 225},
                            {x: 538, y: 252},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '1',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 550, y: 260},
                            {x: 496, y: 225},
                            {x: 513, y: 199},
                            {x: 566, y: 232},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },

                {
                    id: '11',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 597, y: 287},
                            {x: 550, y: 260},
                            {x: 566, y: 232},
                            {x: 615, y: 255},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '12',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 571, y: 307},
                            {x: 534, y: 284},
                            {x: 550, y: 260},
                            {x: 585, y: 280},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '13',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 557, y: 333},
                            {x: 517, y: 310},
                            {x: 534, y: 284},
                            {x: 571, y: 307},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '14',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 544, y: 360},
                            {x: 500, y: 335},
                            {x: 517, y: 310},
                            {x: 557, y: 333},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '15',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 531, y: 386},
                            {x: 480, y: 364},
                            {x: 500, y: 335},
                            {x: 544, y: 360},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },


                {
                    id: '22',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 649, y: 299},
                            {x: 601, y: 282},
                            {x: 615, y: 255},
                            {x: 656, y: 273},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '23',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 606, y: 324},
                            {x: 585, y: 317},
                            {x: 601, y: 282},
                            {x: 620, y: 290},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '24',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 593, y: 361},
                            {x: 569, y: 350},
                            {x: 585, y: 317},
                            {x: 606, y: 324},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },

                {
                    id: '25',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 577, y: 399},
                            {x: 550, y: 391},
                            {x: 569, y: 350},
                            {x: 592, y: 361},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '33',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 605, y: 406},
                            {x: 577, y: 399},
                            {x: 592, y: 361},
                            {x: 617, y: 368},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '32',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 617, y: 368},
                            {x: 593, y: 361},
                            {x: 606, y: 324},
                            {x: 628, y: 332},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '31',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 628, y: 332},
                            {x: 606, y: 324},
                            {x: 620, y: 290},
                            {x: 640, y: 295},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '39',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 685, y: 312},
                            {x: 649, y: 299},
                            {x: 656, y: 273},
                            {x: 692, y: 288},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '40',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 677, y: 334},
                            {x: 648, y: 324},
                            {x: 656, y: 301},
                            {x: 684, y: 311},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '41',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 670, y: 357},
                            {x: 641, y: 347},
                            {x: 648, y: 324},
                            {x: 677, y: 334},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '42',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 662, y: 380},
                            {x: 634, y: 370},
                            {x: 641, y: 347},
                            {x: 670, y: 357},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '43',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 653, y: 410},
                            {x: 622, y: 407},
                            {x: 634, y: 370},
                            {x: 662, y: 380},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '52',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 684, y: 413},
                            {x: 653, y: 410},
                            {x: 664, y: 373},
                            {x: 693, y: 383},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '51',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 693, y: 383},
                            {x: 664, y: 373},
                            {x: 673, y: 349},
                            {x: 700, y: 360},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '50',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 701, y: 360},
                            {x: 673, y: 349},
                            {x: 681, y: 326},
                            {x: 708, y: 337},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '49',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 708, y: 337},
                            {x: 681, y: 326},
                            {x: 691, y: 289},
                            {x: 726, y: 303},
                            {x: 721, y: 320},
                            {x: 715, y: 317}
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '58',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 748, y: 363},
                            {x: 721, y: 353},
                            {x: 730, y: 324},
                            {x: 721, y: 320},
                            {x: 726, y: 303},
                            {x: 763, y: 321}
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '59',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 741, y: 384},
                            {x: 713, y: 376},
                            {x: 721, y: 353},

                            {x: 748, y: 363},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '60',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 732, y: 413},
                            {x: 700, y: 415},
                            {x: 713, y: 376},
                            {x: 741, y: 384},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '69',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 765, y: 412},
                            {x: 732, y: 413},
                            {x: 745, y: 374},
                            {x: 773, y: 384},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '68',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 773, y: 384},
                            {x: 745, y: 374},
                            {x: 753, y: 351},
                            {x: 781, y: 361},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '67',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 781, y: 361},
                            {x: 753, y: 351},
                            {x: 763, y: 321},
                            {x: 798, y: 335},
                            {x: 792, y: 352},
                            {x: 785, y: 350},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '76',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 823, y: 383},
                            {x: 795, y: 372},
                            {x: 800, y: 354},
                            {x: 792, y: 352},
                            {x: 798, y: 335},
                            {x: 833, y: 350},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '77',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 815, y: 409},
                            {x: 782, y: 412},
                            {x: 795, y: 372},
                            {x: 823, y: 381},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '86',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 847, y: 407},
                            {x: 815, y: 409},
                            {x: 825, y: 375},
                            {x: 854, y: 385},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
                    }
                },
                {
                    id: '85',
                    // TODO if need this or add new field
                    modelView: {
                        polygon: [
                            {x: 854, y: 385},
                            {x: 825, y: 375},
                            {x: 833, y: 350},
                            {x: 861, y: 363},
                        ],
                        fill: '#2125295e',
                        stroke: '#048819'
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
        // /fetch-areas
        asyncData({$axios}) {
            return $axios.get(`fetch-areas`)
                .then((res) => {
                    // convertHex
                    function convertHex(color) {
                        color = color.replace('#', '')
                        let r = parseInt(color.substring(0, 2), 16)
                        let g = parseInt(color.substring(2, 4), 16)
                        let b = parseInt(color.substring(4, 6), 16)
                        let result = 'rgba(' + r + ',' + g + ',' + b + ',' + 0.4 + ')'
                        return result
                    }

                    // convertHex end
                    const fetchAreas = res.data.data.map(a => {
                            if (a.modelView.fill == 'red') {
                                a.modelView.fill = '#FF4809'
                            } else if (a.modelView.fill == 'yellow') {
                                a.modelView.fill = '#FAD61D'
                            } else if (a.modelView.fill == 'green') {
                                a.modelView.fill = '#048819'
                            }
                            a.modelView.polygon = JSON.parse(a.modelView.polygon)
                            a.modelView.fill = convertHex(a.modelView.fill)
                            return a;
                        }
                    );
                    return {fetchAreas};
                }).catch((e) => {
                    console.log(e)
                })
        },


        directives: {
            clickOutside: vClickOutside.directive
        },
        computed: {
            getWindowWidth() {
                return window.innerWidth;
            },
            getWindowHeight() {
                return window.innerHeight;
            },
            ...mapGetters([
                'language'
            ])
        },
        methods: {
            foof(foo) {
                let sas = foo.print_plan ? foo.print_plan.split('&export=download')[0] : '';
                return sas
            },
            setLastIndexToCounter(index) {
                this.rotateCounter = index - 1;
            },
            setZeroIndexToCounter() {
                this.rotateCounter = 0;
            },
            startTurntable(direction) {

                direction === 'right'
                    ? (this.rotateCounter -= 1)
                    : (this.rotateCounter += 1);
            },
            startTurntableMouseDown(direction) {
                this.starter3D = setInterval(() => {
                    direction === 'right'
                        ? (this.rotateCounter -= 1)
                        : (this.rotateCounter += 1);
                }, 300)
            },
            stopTurntable() {
                clearInterval(this.starter3D);
            },
            searchRegionByNumber() {
                this.clearFilters();
                let allPolygons = Array.from(document.getElementsByTagName('polygon'));
                allPolygons.forEach(polygon => {
                    if (polygon.getAttribute('fill') === 'white') {
                        polygon.removeAttribute('fill');
                        polygon.setAttribute('fill', this.searchedPolygonFill)

                    } else {
                        if (polygon.id == this.regionNumber) {
                            this.searchedPolygonFill = polygon.getAttribute('fill');
                            polygon.removeAttribute('fill');
                            polygon.setAttribute('fill', 'white');
                        }
                    }

                })
                if (!allPolygons.find(a => a.id == this.regionNumber)) {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: `Ошибка`,
                        text: `Участка с номером ${this.regionNumber} не существует!`
                    });
                }
            },
            returnRegionFillToBasicState(id) {
                let allPolygons = Array.from(document.getElementsByTagName('polygon'));
                allPolygons.forEach(polygon => {
                    if (polygon.id == id) {
                        if (polygon.getAttribute('fill') === 'white') {
                            polygon.removeAttribute('fill');
                            polygon.setAttribute('fill', this.searchedPolygonFill)
                        }
                    }
                })
            },
            filterByStatus(status) {
                // for clear whitespaces
                status = status.replace(/\s/g, '');
                // for clear whitespaces end
                this.isFiltered = true;
                let allPolygons = Array.from(document.getElementsByTagName('polygon'));
                allPolygons.forEach(polygon => {
                    // if white region
                    if (polygon.getAttribute('fill') === 'white') {
                        polygon.removeAttribute('fill');
                        polygon.setAttribute('fill', this.searchedPolygonFill)
                    }
                    // if white region end
                    polygon.style.cssText = 'opacity:.8';
                    if (polygon.getAttribute('fill') == status) {
                        return
                    } else {
                        polygon.style.cssText = 'opacity:.2';
                    }
                })
            },
            clearFilters() {
                let allPolygons = Array.from(document.getElementsByTagName('polygon'));
                allPolygons.forEach(polygon => {
                    polygon.style.cssText = 'opacity:.8';
                });
                this.isFiltered = false;
            },
            init() {
                this.initElements();
                this.initData();
                this.initView();
                this.initActions();
                this.elements.closer.el.addEventListener('click', () => {
                    this.hideAll()
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
                const mapImg = document.getElementById('mapImg');
                if (this.getWindowWidth <= 1281) {
                    this.widthMap = this.getWidthD3(mapImg) * 0.92;
                    this.heightMap = this.getHeightD3(mapImg) * 0.92;
                } else if (this.getWindowWidth > 1280 && this.getWindowWidth < 1681 && this.getWindowHeight < 978) {
                    this.widthMap = this.getWidthD3(mapImg) * 0.86;
                    this.heightMap = this.getHeightD3(mapImg) * 0.86;
                } else if (this.getWindowWidth > 1280 && this.getWindowWidth < 1681 && this.getWindowHeight >= 978) {
                    this.widthMap = this.getWidthD3(mapImg) * 1.07;
                    this.heightMap = this.getHeightD3(mapImg) * 1.07;
                } else if (this.getWindowWidth >= 1681 && this.getWindowWidth < 1921) {
                    // this.widthMap = this.getWidthD3(mapImg) * 1.15489583;
                    // this.heightMap = this.getHeightD3(mapImg) * 1.15489583;
                    this.widthMap = this.getWidthD3(mapImg) * 0.976;
                    this.heightMap = this.getHeightD3(mapImg) * 0.976;
                } else if (this.getWindowWidth >= 1921 && this.getWindowWidth < 2879) {
                    this.widthMap = this.getWidthD3(mapImg) * 1.4;
                    this.heightMap = this.getHeightD3(mapImg) * 1.4;
                } else if (this.getWindowWidth === 2560) {
                    this.widthMap = this.getWidthD3(mapImg) * 1.25;
                    this.heightMap = this.getHeightD3(mapImg) * 1.25;
                } else if (this.getWindowWidth === 2880) {
                    this.widthMap = this.getWidthD3(mapImg) * 1.6;
                    this.heightMap = this.getHeightD3(mapImg) * 1.6;
                } else if (this.getWindowWidth === 3200) {
                    this.widthMap = this.getWidthD3(mapImg) * 2.15;
                    this.heightMap = this.getHeightD3(mapImg) * 2.15;
                } else {
                    this.widthMap = this.getWidthD3(mapImg) * 2.7;
                    this.heightMap = this.getHeightD3(mapImg) * 2.7;
                }
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
                        if (this.getElId('nav')) {
                            this.getElId('nav').classList.add('hide');
                        }
                        if (this.getElId('search-bar')) {
                            this.getElId('search-bar').classList.add('hide');
                        }
                        this.getElId('sales-wrapper').classList.add('zoom')
                    } else {
                        this.getElId('sales-wrapper').classList.remove('zoom')
                        if (this.getElId('nav')) {
                            this.getElId('nav').classList.remove('hide');
                        }
                        if (this.getElId('search-bar')) {
                            this.getElId('search-bar').classList.remove('hide');
                        }
                    }
                });

                if(this.getWindowWidth>1025){
                    this.createPolygon(this.fetchAreas);
                } else {
                    this.fetchAreas.forEach(a=>{
                        this.objectsMobile.forEach(b=>{
                            if(a.otherInfo.number == b.id){
                                a.modelView.polygon = b.modelView.polygon;
                            }
                        })
                    })
                        this.createPolygon(this.fetchAreas);
                }

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
                        this.currentRegion = d;
                        this.currentRegionId = d.otherInfo.number;
                        this.returnRegionFillToBasicState(d.otherInfo.number);
                        this.$axios.get(`/upload-files-for-areas/${this.currentRegionId}/d6b2d6df-b269-4575-88bd-395bff78edd6`).then((res) => {
                            this.images = res.data.data;
                            this.$bus.$emit('reload', this.images)
                        })
                    })
                    .on("mouseover", (d) => {
                    })
                    .on("mouseleave", (d) => {
                    })
            },
            clearRegionNumber() {
                setTimeout(()=>this.regionNumber = '', 200)
            },
            showModal() {
                this.elements.modal.el.classList.remove('hide')
                this.hideTurntable = true;
            },
            showLayout() {
                this.elements.layout.el.classList.remove('hide')
            },
            hideLayout() {
                this.elements.layout.el.classList.add('hide')
            },
            hideModal() {
                this.elements.modal.el.classList.add('hide');
                this.hideTurntable = false
            },
            hideAll() {
                this.hideLayout();
                this.hideModal();
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
                    .selectAll('polygon')
                    .select('g')
                    .data(data)
                    .enter().append("polygon")
                    .attr("points", (d) => {
                        return d.modelView.polygon.map(d => {
                            return [this.elements.scaleLinerX(d.x), this.elements.scaleLinerY(d.y)].join(",");
                        }).join(" ");
                    })
                    .attr("stroke", item => item.modelView.stroke)
                    .attr("fill", item => item.modelView.fill)
                    .attr("id", item => item.otherInfo.number)
                    .attr("stroke-width", 1);

                d3.select('svg')
                    .select('g')
                    .selectAll('polygon')
                    //.data('dataset')
                    .enter()
                    .append("text")
                    .attr("x", data[0].modelView.polygon[1]['x'] - 2 + '%')
                    .attr("y", data[0].modelView.polygon[1]['y'] + 3.4 + '%')
                    .text("10");
            }
        },
        mounted() {
            if (process.client) {
                this.window = window;
                setTimeout(() => {
                    this.init();
                }, 100)

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                        this.startTurntable('left')
                    }
                    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                        this.startTurntable('right')
                    }
                })
                // alert(document.documentElement.clientWidth)
                // alert(document.documentElement.clientHeight)
            }

        }
    }
</script>

<style scoped lang="scss">
  .kad-link {
    text-decoration: underline;
    color: #000000;

    &:hover {
      color: #0a08ce;
      text-decoration: underline;
      transition: 1s ease-in-out;
    }
  }

  .alert {
    position: absolute;
    bottom: 85px;
    right: 60px;
    z-index: 20;
  }

  .search-bar {
    position: absolute;
    bottom: 2.188vw;
    right: 3.125vw;
    background: rgba(30, 30, 30, 0.6);
    width: 28.698vw;
    height: 2.188vw;
    z-index: 20;

    button {
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      box-shadow: none;
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 0.729vw;
      line-height: 0.990vw;
      /* identical to box height */

      text-transform: uppercase;

      color: #FFFFFF;
    }

    .inp-group {
      width: 6.250vw;
      height: 1.563vw;
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
          width: 0.833vw;
          height: 0.833vw;
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
        font-size: 0.625vw;
        line-height: 0.833vw;
        padding-left: 0.260vw;
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
      padding: 0.313vw 0;

      &-red {
        &:before {
          content: '';
          display: flex;
          align-items: center;
          width: 1.042vw;
          height: 1.042vw;
          margin-right: 0.260vw;
          background-color: rgba(255, 72, 9, 0.4);
          border: 1px solid #CF2F02;
        }
      }

      &-yellow {
        @extend .status-red;

        &:before {
          background-color: rgba(250, 214, 29, 0.4);
          border: 1px solid #FAFF00;
        }
      }

      &-green {
        @extend .status-red;

        &:before {
          background-color: rgba(4, 136, 25, 0.4);
          border: 1px solid #40C32A;
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
    #modal {
      transform: scale(0.7);
    }
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
    min-height: 495px;
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
    top: 53px;
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

  @media screen and (min-width: 1281px) and (max-width: 1681px) {
    #map {
      top: 53px;
      left: 2px;
    }
    #modal {
      transform: scale(0.8);
      /*transform: scale(1);*/
    }
  }

  @media screen and (min-width: 1281px) and (max-width: 1681px) and (min-height: 978px) {
    #map {
      top: 70px;
      left: 2px;
    }
    #modal {
      transform: scale(0.8);
      /*transform: scale(1.1);*/
    }
  }

  @media screen and (min-width: 1681px) and (max-width: 1921px) {
    #map {
      top: 83px;
      left: 2px;
    }
    #modal {
      transform: scale(0.8);
      /*transform: scale(1.2);*/
    }
  }

  @media screen and (min-width: 2047px) and (max-width: 2747px) {
    #map {
      top: 102px;
      left: -5px;
    }
    #modal {
      transform: scale(0.8);
      /*transform: scale(1.2);*/
    }
  }

  @media screen and (width: 2560px) {
    #map {
      top: 101px;
      left: 8px;
    }
  }

  @media screen and (width: 2880px) {
    #map {
      top: 105px;
      left: -9px;
    }
  }

  @media screen and (min-width: 3199px) {
    #map {
      top: 159px;
      left: 0;
    }
    #modal {
      transform: scale(2);
    }
  }

  @media screen and (width: 3200px) {
    #map {
      top: 122px;
      left: 7px;
    }
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
    /*max-width: 1050px;*/
    max-width: 1200px;
    overflow: hidden;
    font-size: 16px;
    -webkit-box-shadow: -1px 0px 17px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 0px 17px 0px rgba(0, 0, 0, 0.75);
    background: rgba(255, 255, 255, 0.9);
    /*#modal {*/
    /*  !*transform: scale(0.8);*!*/
    /*  transform: scale(1.2);*/
    /*}*/
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

  @media screen and (min-width: 1600px) {
    .zoom {
      -webkit-transform: scale(1.2);
      -ms-transform: scale(1.2);
      transform: scale(1.2);
      transition: .5s ease;
      overflow: auto;
    }
  }

  @media screen and (min-width: 1800px) {
    .zoom {
      -webkit-transform: scale(1.25);
      -ms-transform: scale(1.25);
      transform: scale(1.25);
      transition: .5s ease;
      overflow: auto;
    }
  }

  .plan-img {
    display: block;
    /*width: 330px;*/
    /*height: 233px;*/
    height: 479px;
    cursor: default;

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

  .list {
    color: black;
    width: 100%;

    .p-title {
      width: 200px;
    }

    .p-description {
      text-align: left;
    }
  }

  .model-controls {
    width: 50px;
    height: 20px;
    position: absolute;
    left: 32%;
    bottom: 10px;

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


  @media screen and (min-width: 1800px) {
    .big-img {
      -o-object-fit: none;
      object-fit: none;
      display: block;
      position: relative;
      z-index: 1;
    }
  }

  @media screen and (width: 2560px) {
    .big-img {
      -o-object-fit: fill;
      object-fit: fill;
    }
  }
  /*mob*/
  #search-bar__mob{
    width: 335px;
    position: fixed;
    bottom: 50px;
    z-index: 3000;
    left: 50%;
    margin-left: -167px;
    font-size: 12px;
    .inp-group{
      width: 100%;
      max-width: 335px;
      input{
        padding: 7px 10px;
        flex-grow: 1;
        font-family: "Open Sans", sans-serif;
        color:#575757;
        border: none;
      }
      button{
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #575757;
        img{
          width: 16px;
          height: 16px;
          display: block;
        }
      }
    }

  }
</style>
