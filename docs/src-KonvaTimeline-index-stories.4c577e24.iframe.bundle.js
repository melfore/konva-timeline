"use strict";(self.webpackChunk_melfore_konva_timeline=self.webpackChunk_melfore_konva_timeline||[]).push([[579],{"./src/KonvaTimeline/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomColumnWidth:()=>CustomColumnWidth,CustomResolution:()=>CustomResolution,CustomRowHeight:()=>CustomRowHeight,HiddenResources:()=>HiddenResources,InitialDateTime:()=>InitialDateTime,MixedDateTimeFormats:()=>MixedDateTimeFormats,Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var luxon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/luxon/src/luxon.js"),_stories_data__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/KonvaTimeline/stories-data.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Main/KonvaTimeline",component:__webpack_require__("./src/KonvaTimeline/index.tsx").Z,tags:["autodocs"],argTypes:{onTaskClick:{type:"function"},onTaskChange:{type:"function"}}},{range,resources,tasks}=(0,_stories_data__WEBPACK_IMPORTED_MODULE_1__.bm)({averageTaskDurationInMinutes:200,resourcesCount:3,tasksCount:5,timeRangeInDays:1}),Primary={args:{dragResolution:"5min",range,resources,tasks,resolution:"1hrs"}},CustomColumnWidth={args:{...Primary.args,columnWidth:120}},CustomResolution={args:{...Primary.args,resolution:"10min"}},CustomRowHeight={args:{...Primary.args,rowHeight:30}},HiddenResources={args:{...Primary.args,hideResources:!0}},InitialDateTime={args:{...Primary.args,initialDateTime:(range.start+range.end)/2}},MixedDateTimeFormats={args:{...Primary.args,onErrors:errors=>errors.forEach((error=>console.log({error}))),range:{start:luxon__WEBPACK_IMPORTED_MODULE_0__.ou.fromMillis(range.start).toUTC().toISO(),end:luxon__WEBPACK_IMPORTED_MODULE_0__.ou.fromMillis(range.end).toUTC().toISO()}}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:'{\n  args: {\n    dragResolution: "5min",\n    range,\n    resources,\n    tasks,\n    resolution: "1hrs"\n  }\n}',...Primary.parameters?.docs?.source}}},CustomColumnWidth.parameters={...CustomColumnWidth.parameters,docs:{...CustomColumnWidth.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    columnWidth: 120\n  }\n}",...CustomColumnWidth.parameters?.docs?.source}}},CustomResolution.parameters={...CustomResolution.parameters,docs:{...CustomResolution.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    resolution: "10min"\n  }\n}',...CustomResolution.parameters?.docs?.source}}},CustomRowHeight.parameters={...CustomRowHeight.parameters,docs:{...CustomRowHeight.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    rowHeight: 30\n  }\n}",...CustomRowHeight.parameters?.docs?.source}}},HiddenResources.parameters={...HiddenResources.parameters,docs:{...HiddenResources.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    hideResources: true\n  }\n}",...HiddenResources.parameters?.docs?.source}}},InitialDateTime.parameters={...InitialDateTime.parameters,docs:{...InitialDateTime.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    initialDateTime: (range.start + range.end) / 2\n  }\n}",...InitialDateTime.parameters?.docs?.source}}},MixedDateTimeFormats.parameters={...MixedDateTimeFormats.parameters,docs:{...MixedDateTimeFormats.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    onErrors: errors => errors.forEach(error => console.log({\n      error\n    })),\n    range: {\n      start: DateTime.fromMillis(range.start).toUTC().toISO()!,\n      end: DateTime.fromMillis(range.end).toUTC().toISO()!\n    }\n  }\n}",...MixedDateTimeFormats.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","CustomColumnWidth","CustomResolution","CustomRowHeight","HiddenResources","InitialDateTime","MixedDateTimeFormats"]}}]);