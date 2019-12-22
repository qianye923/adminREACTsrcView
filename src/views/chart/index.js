//  echart 折线图训练

import React from "react";
import ReactDom from "react-dom";

// 引入 ECharts 主模块
// import echarts from "echarts/lib/echarts";
// 引入折线图
// import "echarts/lib/chart/line";

class Echartshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [520, 932, 901, 1934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    });
  }
  echarts() {
    const optionUsers = {
      tooltip: {
        trigger: "axis"
      },
      grid: {
        left: "5%",
        right: "5%",
        top: "10px",
        bottom: "5%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false //是否显示坐标轴刻度
          },
          /*设置X轴字体样式*/
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 20, //倾斜30度
            textStyle: {
              color: "#666",
              fontSize: 12,
              fontFamily: "微软雅黑"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          data: this.props.evaluateData.allConverRateData.dateArr
        }
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false //是否显示坐标轴刻度
          },
          //splitNumber:10,//增加Y轴刻度变多
          /*设置y轴字体样式*/
          axisLabel: {
            show: true,
            formatter: "{value}%",
            textStyle: {
              color: "#666",
              fontSize: 12,
              fontFamily: "微软雅黑"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          }
        }
      ],
      series: [
        {
          name: "推荐人次转化率",
          type: "line",
          stack: "总量",
          symbol: "star", //节点性状
          itemStyle: {
            normal: {
              color: "#278BDD" //图标颜色
            }
          },
          lineStyle: {
            normal: {
              width: 2, //连线粗细
              color: "#278BDD" //连线颜色
            }
          },
          smooth: true, //折线图是趋缓的
          data: this.props.evaluateData.allConverRateData.userRateArr
        }
      ]
    };
  }

  render() {
    return (
      <div>
        zhegeshi echartyenia
        <div id="main" style={{ width: 600, height: 400 }}></div>
      </div>
    );
  }
}

ReactDom.render(<Echartshow />, document.getElementById("root"));
