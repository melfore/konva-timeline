"use strict";(self.webpackChunk_melfore_konva_timeline=self.webpackChunk_melfore_konva_timeline||[]).push([[376,579],{"./node_modules/@mdx-js/react/lib/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{NF:function(){return withMDXComponents},Zo:function(){return MDXProvider},ah:function(){return useMDXComponents},pC:function(){return MDXContext}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents:allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components:components,children:children,disableParentContext:disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./src/@stories/index.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_konva_timeline_konva_timeline_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_KonvaTimeline_index_stories_tsx__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/KonvaTimeline/index.stories.tsx");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre",h3:"h3",h4:"h4"},(0,_home_runner_work_konva_timeline_konva_timeline_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.h_,{title:"Intro/Getting started"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"melforekonva-timeline",children:"@melfore/konva-timeline"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"@melfore/konva-timeline"})," is a TypeScript ReactJS library that uses ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"konva"})," and ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"react-konva"})," to render a timeline component using canvas."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"install",children:"Install"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"To install the library run:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"npm i @melfore/konva-timeline\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"This library has the following required peerDependencies:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'"konva": ">= 9.2.0 < 10",\n"luxon": ">= 3.3.0 < 4",\n"react": ">= 18.2.0 < 19",\n"react-dom": ">= 18.2.0 < 19",\n"react-konva": ">= 18.2.9 < 19"\n"react-konva-utils": ">= 1.0.5 < 2"\n'})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"️-installing-with-npm--7",children:"⚠️ Installing with npm < 7"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"If installing with versions of npm < 7, you have to manually install them."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"npm i konva luxon react react-dom react-konva\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Beware to check the versions installed, they must match peerDependencies ranges."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Import the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"KonvaTimeline"})," component from ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"@melfore/konva-timeline"})," library:"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'import { KonvaTimeline } from "@melfore/konva-timeline";\n'})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Use the component passing the minimum set of required properties:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_KonvaTimeline_index_stories_tsx__WEBPACK_IMPORTED_MODULE_2__.Primary}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"props",children:"Props"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Below the reference for all accepted properties:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Ed,{of:_KonvaTimeline_index_stories_tsx__WEBPACK_IMPORTED_MODULE_2__.Primary,sort:"requiredFirst"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"resource",children:"Resource"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"interface Resource {\n  /**\n   * Unique identifier of the resource\n   */\n  id: string;\n  /**\n   * Label of the resource\n   */\n  label: string;\n  /**\n   * Color assigned to the resource\n   */\n  color: string;\n}\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"taskdata",children:"TaskData"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"interface TaskData {\n  /**\n   * Unique identifier of the task\n   */\n  id: string;\n  /**\n   * Label of the task\n   */\n  label: string;\n  /**\n   * Id of assigned resource\n   */\n  resourceId: string;\n  /**\n   * Task time range\n   */\n  time: TimeRange;\n}\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"timerange",children:"TimeRange"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"interface TimeRange {\n  /**\n   * Start of time range interval\n   */\n  start: number | string;\n  /**\n   * End of time range interval\n   */\n  end: number | string;\n}\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"konvatimelineerror",children:"KonvaTimelineError"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"interface KonvaTimelineError {\n  /**\n   * The entity that thrown the error\n   */\n  entity: DataEntity;\n  /**\n   * The error level (error or warn)\n   */\n  level: ErrorLevel;\n  /**\n   * The error message\n   */\n  message: string;\n  /**\n   * The refId for entity item\n   */\n  refId?: string;\n}\n"})})]})}__webpack_exports__.default=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_konva_timeline_konva_timeline_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"./src/KonvaTimeline/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CompletedPercentage:function(){return CompletedPercentage},CustomColumnWidth:function(){return CustomColumnWidth},CustomHeaderLabel:function(){return CustomHeaderLabel},CustomResolution:function(){return CustomResolution},CustomRowHeight:function(){return CustomRowHeight},CustomTooltip:function(){return CustomTooltip},DisabledTooltip:function(){return DisabledTooltip},HiddenResources:function(){return HiddenResources},InitialDateTime:function(){return InitialDateTime},LocalizedDateFormat:function(){return LocalizedDateFormat},LocalizedTooltipLabels:function(){return LocalizedTooltipLabels},MixedDateTimeFormats:function(){return MixedDateTimeFormats},NonPreciseRange:function(){return NonPreciseRange},Primary:function(){return Primary},SelectArea:function(){return SelectArea},__namedExportsOrder:function(){return __namedExportsOrder}});__webpack_require__("./node_modules/react/index.js");var luxon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/luxon/src/luxon.js"),_stories_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/KonvaTimeline/stories-data.ts"),___WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/KonvaTimeline/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const meta={title:"Main/KonvaTimeline",component:___WEBPACK_IMPORTED_MODULE_3__.Z,tags:["autodocs"],argTypes:{onTaskClick:{type:"function"},onTaskChange:{type:"function"}}};__webpack_exports__.default=meta;const{range:range,resources:resources,tasks:tasks}=(0,_stories_data__WEBPACK_IMPORTED_MODULE_2__.bm)({averageTaskDurationInMinutes:200,resourcesCount:3,tasksCount:5,timeRangeInDays:1}),customToolTip=taskData=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{style:{backgroundColor:"white",border:"ridge",borderColor:"black",borderWidth:"1px",margin:0,borderRadius:"50%",height:100},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4",{style:{justifyContent:"center",alignItems:"top",display:"flex",color:"blue",margin:1},children:taskData.label}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("b",{style:{justifyContent:"center",alignItems:"top",display:"flex",marginBottom:4},children:"Range:"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{style:{justifyContent:"center",alignItems:"top",display:"flex"},children:taskData.start}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{style:{justifyContent:"center",alignItems:"top",display:"flex",margin:0},children:taskData.end})]});customToolTip.displayName="customToolTip";const Primary={args:{dragResolution:"5min",range:range,resources:resources,tasks:tasks,resolution:"1hrs",onAreaSelect:void 0}},CustomColumnWidth={args:{...Primary.args,columnWidth:120}},CustomHeaderLabel={args:{...Primary.args,headerLabel:"Test"}},CustomResolution={args:{...Primary.args,resolution:"10min"}},CustomRowHeight={args:{...Primary.args,rowHeight:30}},HiddenResources={args:{...Primary.args,hideResources:!0}},InitialDateTime={args:{...Primary.args,initialDateTime:(range.start+range.end)/2}},MixedDateTimeFormats={args:{...Primary.args,onErrors:errors=>errors.forEach((error=>console.error({error:error}))),range:{start:luxon__WEBPACK_IMPORTED_MODULE_1__.ou.fromMillis(range.start).toUTC().toISO(),end:luxon__WEBPACK_IMPORTED_MODULE_1__.ou.fromMillis(range.end).toUTC().toISO()}}},NonPreciseRange={args:{...Primary.args,range:{start:16976322e5,end:16982442e5},tasks:[{id:"1",label:"Task 1",resourceId:"1",time:{start:16976322e5,end:16976394e5}}],resolution:"1day",timezone:"Europe/Rome"}},CompletedPercentage={args:{...Primary.args,resources:resources,resolution:"2weeks",range:{start:16983576e5,end:17020952e5},tasks:[{id:"1",label:"Task1",resourceId:"1",completedPercentage:90,time:{start:16987932e5,end:16994348e5}},{id:"2",label:"Task2",resourceId:"2",completedPercentage:19,time:{start:17004348e5,end:17009348e5}},{id:"3",label:"Task3",resourceId:"3",completedPercentage:58,time:{start:16997348e5,end:17002348e5}},{id:"4",label:"Task4",resourceId:"2",completedPercentage:28,time:{start:16980479e5,end:16985579e5}},{id:"5",label:"Task5",resourceId:"1",completedPercentage:74,time:{start:17015052e5,end:17021052e5}}]}},LocalizedTooltipLabels={args:{...Primary.args,localized:{start:"Inizio",end:"Fine",duration:"Durata",completed:"Completamento"}}},LocalizedDateFormat={args:{...Primary.args,dateLocale:"it"}},SelectArea={args:{...Primary.args,onAreaSelect:data=>data}},DisabledTooltip={args:{...Primary.args,toolTip:!1}},CustomTooltip={args:{...Primary.args,customToolTip:customToolTip}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:'{\n  args: {\n    dragResolution: "5min",\n    range,\n    resources,\n    tasks,\n    resolution: "1hrs",\n    onAreaSelect: undefined\n  }\n}',...Primary.parameters?.docs?.source}}},CustomColumnWidth.parameters={...CustomColumnWidth.parameters,docs:{...CustomColumnWidth.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    columnWidth: 120\n  }\n}",...CustomColumnWidth.parameters?.docs?.source}}},CustomHeaderLabel.parameters={...CustomHeaderLabel.parameters,docs:{...CustomHeaderLabel.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    headerLabel: "Test"\n  }\n}',...CustomHeaderLabel.parameters?.docs?.source}}},CustomResolution.parameters={...CustomResolution.parameters,docs:{...CustomResolution.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    resolution: "10min"\n  }\n}',...CustomResolution.parameters?.docs?.source}}},CustomRowHeight.parameters={...CustomRowHeight.parameters,docs:{...CustomRowHeight.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    rowHeight: 30\n  }\n}",...CustomRowHeight.parameters?.docs?.source}}},HiddenResources.parameters={...HiddenResources.parameters,docs:{...HiddenResources.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    hideResources: true\n  }\n}",...HiddenResources.parameters?.docs?.source}}},InitialDateTime.parameters={...InitialDateTime.parameters,docs:{...InitialDateTime.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    initialDateTime: (range.start + range.end) / 2\n  }\n}",...InitialDateTime.parameters?.docs?.source}}},MixedDateTimeFormats.parameters={...MixedDateTimeFormats.parameters,docs:{...MixedDateTimeFormats.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    onErrors: errors => errors.forEach(error => console.error({\n      error\n    })),\n    range: {\n      start: DateTime.fromMillis(range.start).toUTC().toISO()!,\n      end: DateTime.fromMillis(range.end).toUTC().toISO()!\n    }\n  }\n}",...MixedDateTimeFormats.parameters?.docs?.source}}},NonPreciseRange.parameters={...NonPreciseRange.parameters,docs:{...NonPreciseRange.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    range: {\n      start: 1697632200000,\n      end: 1698244200000\n    },\n    tasks: [{\n      id: "1",\n      label: "Task 1",\n      resourceId: "1",\n      time: {\n        start: 1697632200000,\n        end: 1697639400000\n      }\n    }],\n    resolution: "1day",\n    timezone: "Europe/Rome"\n  }\n}',...NonPreciseRange.parameters?.docs?.source}}},CompletedPercentage.parameters={...CompletedPercentage.parameters,docs:{...CompletedPercentage.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    resources,\n    resolution: "2weeks",\n    range: {\n      start: 1698357600000,\n      end: 1702095200000\n    },\n    tasks: [{\n      id: "1",\n      label: "Task1",\n      resourceId: "1",\n      completedPercentage: 90,\n      time: {\n        start: 1698793200000,\n        end: 1699434800000\n      }\n    }, {\n      id: "2",\n      label: "Task2",\n      resourceId: "2",\n      completedPercentage: 19,\n      time: {\n        start: 1700434800000,\n        end: 1700934800000\n      }\n    }, {\n      id: "3",\n      label: "Task3",\n      resourceId: "3",\n      completedPercentage: 58,\n      time: {\n        start: 1699734800000,\n        end: 1700234800000\n      }\n    }, {\n      id: "4",\n      label: "Task4",\n      resourceId: "2",\n      completedPercentage: 28,\n      time: {\n        start: 1698047900000,\n        end: 1698557900000\n      }\n    }, {\n      id: "5",\n      label: "Task5",\n      resourceId: "1",\n      completedPercentage: 74,\n      time: {\n        start: 1701505200000,\n        end: 1702105200000\n      }\n    }]\n  }\n}',...CompletedPercentage.parameters?.docs?.source}}},LocalizedTooltipLabels.parameters={...LocalizedTooltipLabels.parameters,docs:{...LocalizedTooltipLabels.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    localized: {\n      start: "Inizio",\n      end: "Fine",\n      duration: "Durata",\n      completed: "Completamento"\n    }\n  }\n}',...LocalizedTooltipLabels.parameters?.docs?.source}}},LocalizedDateFormat.parameters={...LocalizedDateFormat.parameters,docs:{...LocalizedDateFormat.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Primary.args,\n    dateLocale: "it"\n  }\n}',...LocalizedDateFormat.parameters?.docs?.source}}},SelectArea.parameters={...SelectArea.parameters,docs:{...SelectArea.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    onAreaSelect: (data: AreaSelect) => data\n  }\n}",...SelectArea.parameters?.docs?.source}}},DisabledTooltip.parameters={...DisabledTooltip.parameters,docs:{...DisabledTooltip.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    toolTip: false\n  }\n}",...DisabledTooltip.parameters?.docs?.source}}},CustomTooltip.parameters={...CustomTooltip.parameters,docs:{...CustomTooltip.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Primary.args,\n    customToolTip: customToolTip\n  }\n}",...CustomTooltip.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","CustomColumnWidth","CustomHeaderLabel","CustomResolution","CustomRowHeight","HiddenResources","InitialDateTime","MixedDateTimeFormats","NonPreciseRange","CompletedPercentage","LocalizedTooltipLabels","LocalizedDateFormat","SelectArea","DisabledTooltip","CustomTooltip"]}}]);