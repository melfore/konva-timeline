"use strict";(self.webpackChunk_melfore_konva_timeline=self.webpackChunk_melfore_konva_timeline||[]).push([[579],{"./src/KonvaTimeline/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CompletedPercentage:()=>CompletedPercentage,CustomColumnWidth:()=>CustomColumnWidth,CustomHeaderLabel:()=>CustomHeaderLabel,CustomResolution:()=>CustomResolution,CustomRowHeight:()=>CustomRowHeight,HiddenResources:()=>HiddenResources,InitialDateTime:()=>InitialDateTime,MixedDateTimeFormats:()=>MixedDateTimeFormats,NonPreciseRange:()=>NonPreciseRange,Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var luxon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/luxon/src/luxon.js"),_stories_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/KonvaTimeline/stories-data.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Main/KonvaTimeline",component:__webpack_require__("./src/KonvaTimeline/index.tsx").Z,tags:["autodocs"],argTypes:{onTaskClick:{type:"function"},onTaskChange:{type:"function"}}},{range,resources,tasks}=(0,_stories_data__WEBPACK_IMPORTED_MODULE_1__.bm)({averageTaskDurationInMinutes:200,resourcesCount:3,tasksCount:5,timeRangeInDays:1}),Primary={args:{dragResolution:"5min",range,resources,tasks,resolution:"1hrs"}},CustomColumnWidth={args:{...Primary.args,columnWidth:120}},CustomHeaderLabel={args:{...Primary.args,headerLabel:"Test"}},CustomResolution={args:{...Primary.args,resolution:"10min"}},CustomRowHeight={args:{...Primary.args,rowHeight:30}},HiddenResources={args:{...Primary.args,hideResources:!0}},InitialDateTime={args:{...Primary.args,initialDateTime:(range.start+range.end)/2}},MixedDateTimeFormats={args:{...Primary.args,onErrors:errors=>errors.forEach((error=>console.error({error}))),range:{start:luxon__WEBPACK_IMPORTED_MODULE_0__.ou.fromMillis(range.start).toUTC().toISO(),end:luxon__WEBPACK_IMPORTED_MODULE_0__.ou.fromMillis(range.end).toUTC().toISO()}}},NonPreciseRange={args:{...Primary.args,range:{start:16976322e5,end:16982442e5},tasks:[{id:"1",label:"Task 1",resourceId:"1",time:{start:16976322e5,end:16976394e5}}],resolution:"1day",timezone:"Europe/Rome"}},CompletedPercentage={args:{resources,resolution:"1week",range:{start:16983576e5,end:17020952e5},tasks:[{id:"1",label:"Task1",resourceId:"1",completedPercentage:90,time:{start:16987932e5,end:16994348e5}},{id:"2",label:"Task2",resourceId:"2",completedPercentage:19,time:{start:17004348e5,end:17009348e5}},{id:"3",label:"Task3",resourceId:"3",completedPercentage:58,time:{start:16997348e5,end:17002348e5}}]}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:'{\n  args: {\n    dragResolution: "5min",\n    range,\n    resources,\n    tasks,\n    resolution: "1hrs"\n  }\n}',...Primary.parameters?.docs?.source}}},CustomColumnWidth.parameters={...CustomColumnWidth.parameters,docs:{...CustomColumnWidth.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    columnWidth: 120\n  }\n}",...CustomColumnWidth.parameters?.docs?.source}}},CustomHeaderLabel.parameters={...CustomHeaderLabel.parameters,docs:{...CustomHeaderLabel.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    headerLabel: "Test"\n  }\n}',...CustomHeaderLabel.parameters?.docs?.source}}},CustomResolution.parameters={...CustomResolution.parameters,docs:{...CustomResolution.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    resolution: "10min"\n  }\n}',...CustomResolution.parameters?.docs?.source}}},CustomRowHeight.parameters={...CustomRowHeight.parameters,docs:{...CustomRowHeight.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    rowHeight: 30\n  }\n}",...CustomRowHeight.parameters?.docs?.source}}},HiddenResources.parameters={...HiddenResources.parameters,docs:{...HiddenResources.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    hideResources: true\n  }\n}",...HiddenResources.parameters?.docs?.source}}},InitialDateTime.parameters={...InitialDateTime.parameters,docs:{...InitialDateTime.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    initialDateTime: (range.start + range.end) / 2\n  }\n}",...InitialDateTime.parameters?.docs?.source}}},MixedDateTimeFormats.parameters={...MixedDateTimeFormats.parameters,docs:{...MixedDateTimeFormats.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    onErrors: errors => errors.forEach(error => console.error({\n      error\n    })),\n    range: {\n      start: DateTime.fromMillis(range.start).toUTC().toISO()!,\n      end: DateTime.fromMillis(range.end).toUTC().toISO()!\n    }\n  }\n}",...MixedDateTimeFormats.parameters?.docs?.source}}},NonPreciseRange.parameters={...NonPreciseRange.parameters,docs:{...NonPreciseRange.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    range: {\n      start: 1697632200000,\n      end: 1698244200000\n    },\n    tasks: [{\n      id: "1",\n      label: "Task 1",\n      resourceId: "1",\n      time: {\n        start: 1697632200000,\n        end: 1697639400000\n      }\n    }],\n    resolution: "1day",\n    timezone: "Europe/Rome"\n  }\n}',...NonPreciseRange.parameters?.docs?.source}}},CompletedPercentage.parameters={...CompletedPercentage.parameters,docs:{...CompletedPercentage.parameters?.docs,source:{originalSource:'{\n  args: {\n    resources,\n    resolution: "1week",\n    range: {\n      start: 1698357600000,\n      end: 1702095200000\n    },\n    tasks: [{\n      id: "1",\n      label: "Task1",\n      resourceId: "1",\n      completedPercentage: 90,\n      time: {\n        start: 1698793200000,\n        end: 1699434800000\n      }\n    }, {\n      id: "2",\n      label: "Task2",\n      resourceId: "2",\n      completedPercentage: 19,\n      time: {\n        start: 1700434800000,\n        end: 1700934800000\n      }\n    }, {\n      id: "3",\n      label: "Task3",\n      resourceId: "3",\n      completedPercentage: 58,\n      time: {\n        start: 1699734800000,\n        end: 1700234800000\n      }\n    }]\n  }\n}',...CompletedPercentage.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","CustomColumnWidth","CustomHeaderLabel","CustomResolution","CustomRowHeight","HiddenResources","InitialDateTime","MixedDateTimeFormats","NonPreciseRange","CompletedPercentage"]}}]);