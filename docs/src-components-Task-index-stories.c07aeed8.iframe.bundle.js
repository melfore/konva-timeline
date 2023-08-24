"use strict";(self.webpackChunk_melfore_konva_timeline=self.webpackChunk_melfore_konva_timeline||[]).push([[42],{"./src/@components/Task/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _utils_stories__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/@utils/stories.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Task",component:__webpack_require__("./src/@components/Task/index.tsx").Z,decorators:[_utils_stories__WEBPACK_IMPORTED_MODULE_0__.tK],tags:["autodocs"],argTypes:{fill:_utils_stories__WEBPACK_IMPORTED_MODULE_0__.ql,stroke:_utils_stories__WEBPACK_IMPORTED_MODULE_0__.ql}},Primary={args:{id:"task-1",label:"Task 1",width:100,x:50,y:50}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:'{\n  args: {\n    id: "task-1",\n    label: "Task 1",\n    width: 100,\n    x: 50,\n    y: 50\n  }\n}',...Primary.parameters?.docs?.source}}};const __namedExportsOrder=["Primary"]},"./src/@components/Task/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_konva__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Task=({fill="white",id,onClick,onLeave,onOver,stroke="black",x,y,width})=>{const onTaskMouseEvent=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((e,callback)=>{const stage=e.target.getStage();if(!stage)return;const point=stage.getPointerPosition();point&&callback(id,point)}),[id]),onTaskClick=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>onTaskMouseEvent(e,onClick)),[onClick,onTaskMouseEvent]),onTaskLeave=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>onTaskMouseEvent(e,onLeave)),[onLeave,onTaskMouseEvent]),onTaskOver=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>onTaskMouseEvent(e,onOver)),[onOver,onTaskMouseEvent]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.UL,{id,cornerRadius:4,fill,height:40,onClick:onTaskClick,onMouseLeave:onTaskLeave,onMouseMove:onTaskOver,onMouseOver:onTaskOver,stroke,x,y,width})};Task.displayName="Task";const __WEBPACK_DEFAULT_EXPORT__=Task;try{Task.displayName="Task",Task.__docgenInfo={description:"This component renders a simple task as a rectangle inside a canvas.\nEach task is rendered by `TasksLayer` component, with a loop on each task provided to `KonvaTimeline`.\n`TasksLayer` is also responsible of handling callback for task components.\n\nSupported events (click, leave, over) respond with callbacks of type:\n<br />\n `(taskId: string, point: KonvaPoint) => void`\n\nThe playground has a simulated canvas with height: 200px and width: 100%",displayName:"Task",props:{id:{defaultValue:null,description:"Unique identifier of the task",name:"id",required:!0,type:{name:"string"}},label:{defaultValue:null,description:"Label of the task",name:"label",required:!0,type:{name:"string"}},fill:{defaultValue:{value:"white"},description:"The fill color of a canvas item",name:"fill",required:!1,type:{name:"string"}},stroke:{defaultValue:{value:"black"},description:"The stroke color of a canvas item",name:"stroke",required:!1,type:{name:"string"}},x:{defaultValue:null,description:"The x coordinate of a point on canvas",name:"x",required:!0,type:{name:"number"}},y:{defaultValue:null,description:"The y coordinate of a point on canvas",name:"y",required:!0,type:{name:"number"}},onClick:{defaultValue:null,description:"On mouse click event handler",name:"onClick",required:!0,type:{name:"TaskMouseEventHandler"}},onLeave:{defaultValue:null,description:"On mouse leave event handler",name:"onLeave",required:!0,type:{name:"TaskMouseEventHandler"}},onOver:{defaultValue:null,description:"On mouse over event handler",name:"onOver",required:!0,type:{name:"TaskMouseEventHandler"}},width:{defaultValue:null,description:"The width of the task",name:"width",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@components/Task/index.tsx#Task"]={docgenInfo:Task.__docgenInfo,name:"Task",path:"src/@components/Task/index.tsx#Task"})}catch(__react_docgen_typescript_loader_error){}},"./src/@contexts/Timeline.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>TimelineProvider,i:()=>useTimelineContext});var react=__webpack_require__("./node_modules/react/index.js"),logger=__webpack_require__("./src/@utils/logger.ts"),_utils_resources=__webpack_require__("./src/@utils/resources.ts"),luxon=__webpack_require__("./node_modules/luxon/src/luxon.js");const toInterval=({start,end})=>luxon.Xp.fromDateTimes(luxon.ou.fromMillis(start),luxon.ou.fromMillis(end));var time_resolution=__webpack_require__("./src/@utils/time-resolution.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TimelineContext=(0,react.createContext)(void 0),DEFAULT_DRAW_RANGE={start:0,end:0},TimelineProvider=({children,debug=!1,hideResources=!1,tasks:externalTasks,range,resolution:externalResolution="1hrs",resources:externalResources})=>{const[drawRange,setDrawRange]=(0,react.useState)(DEFAULT_DRAW_RANGE),[resolutionKey,setResolutionKey]=(0,react.useState)(externalResolution);(0,react.useEffect)((()=>{(0,logger.yN)("TimelineProvider","Debug "+(debug?"ON":"OFF")),window.__MELFORE_KONVA_TIMELINE_DEBUG__=debug}),[debug]),(0,react.useEffect)((()=>{externalResolution!==resolutionKey&&((0,logger.o7)("TimelineProvider",`Resolution changed to '${externalResolution}'`),setResolutionKey(externalResolution))}),[externalResolution]);const interval=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating interval..."),toInterval(range))),[range]),resolution=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating resolution..."),(0,time_resolution.Ig)(resolutionKey))),[resolutionKey]),resources=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Preparing resources..."),[_utils_resources.if,...externalResources])),[externalResources]),resourcesContentHeight=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating resources content height..."),_utils_resources.Cu*resources.length)),[resources]),tasks=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Preparing tasks..."),((tasks,interval)=>tasks.filter((task=>{const taskInterval=toInterval(task.time);return!!interval.intersection(taskInterval)})))(externalTasks,interval))),[externalTasks,interval]),timeBlocks=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating time blocks..."),interval.splitBy({[resolution.unit]:resolution.sizeInUnits}))),[interval,resolution]);return(0,jsx_runtime.jsx)(TimelineContext.Provider,{value:{drawRange,hideResources,interval,resolution,resolutionKey,resources,resourcesContentHeight,setDrawRange,setResolutionKey,tasks,timeBlocks},children})};TimelineProvider.displayName="TimelineProvider";const useTimelineContext=()=>{const context=(0,react.useContext)(TimelineContext);if(void 0===context)throw new Error("useTimelineContext must be used within a TimelineProvider");return context};try{TimelineProvider.displayName="TimelineProvider",TimelineProvider.__docgenInfo={description:"",displayName:"TimelineProvider",props:{columnWidth:{defaultValue:null,description:"",name:"columnWidth",required:!1,type:{name:"number"}},hideResources:{defaultValue:{value:"false"},description:"",name:"hideResources",required:!1,type:{name:"boolean"}},resolution:{defaultValue:null,description:"",name:"resolution",required:!1,type:{name:"enum",value:[{value:'"1min"'},{value:'"5min"'},{value:'"10min"'},{value:'"15min"'},{value:'"30min"'},{value:'"1hrs"'},{value:'"2hrs"'},{value:'"6hrs"'},{value:'"12hrs"'},{value:'"1day"'},{value:'"1week"'},{value:'"2weeks"'}]}},tasks:{defaultValue:null,description:"",name:"tasks",required:!0,type:{name:"TaskData[]"}},range:{defaultValue:null,description:"",name:"range",required:!0,type:{name:"TimeRange"}},resources:{defaultValue:null,description:"",name:"resources",required:!0,type:{name:"Resource[]"}},debug:{defaultValue:{value:"false"},description:"",name:"debug",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@contexts/Timeline.tsx#TimelineProvider"]={docgenInfo:TimelineProvider.__docgenInfo,name:"TimelineProvider",path:"src/@contexts/Timeline.tsx#TimelineProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/@utils/logger.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o7:()=>logDebug,yN:()=>logWarn});const logger=(level,component,message)=>{const text=`[@melfore/konva-timeline] ${component} - ${message}`;switch(level){case"debug":return void console.info(text);case"error":return void console.error(text);case"warn":return void console.warn(text)}},logDebug=(component,message)=>{window.__MELFORE_KONVA_TIMELINE_DEBUG__&&logger("debug",component,message)},logWarn=(component,message)=>logger("warn",component,message)},"./src/@utils/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Cu:()=>RESOURCE_HEADER_HEIGHT,Fc:()=>RESOURCE_HEADER_TEXT_OFFSET,Oc:()=>RESOURCE_HEADER_WIDTH,if:()=>RESOURCE_HEADER});const RESOURCE_HEADER_HEIGHT=50,RESOURCE_HEADER_TEXT_OFFSET=20,RESOURCE_HEADER_WIDTH=200,RESOURCE_HEADER={color:"transparent",id:"-1",label:"Header"}},"./src/@utils/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{SE:()=>STORY_DATA,fG:()=>LayerDecorator,ql:()=>COLOR_ARG_TYPE,tK:()=>TaskDecorator,yz:()=>TasksLayerDecorator});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_konva__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),_contexts_Timeline__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/@contexts/Timeline.tsx"),_KonvaTimeline_stories_data__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/KonvaTimeline/stories-data.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const COLOR_ARG_TYPE={control:{type:"color"}},STORY_DATA=(0,_KonvaTimeline_stories_data__WEBPACK_IMPORTED_MODULE_3__.bm)({averageTaskDurationInMinutes:180,resourcesCount:3,tasksCount:10,timeRangeInDays:1}),LayerDecorator=storyFn=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.mh,{children:storyFn()});LayerDecorator.displayName="LayerDecorator";const TaskDecorator=storyFn=>{const wrapperRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[width,setWidth]=react__WEBPACK_IMPORTED_MODULE_0__.useState(0);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(!wrapperRef.current)return;const{width}=wrapperRef.current.getBoundingClientRect();setWidth(width)}),[]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{ref:wrapperRef,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.Hf,{height:200,width,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.mh,{children:storyFn()})})})};TaskDecorator.displayName="TaskDecorator";const TasksLayerInternalDecorator=({storyFn})=>{const{setDrawRange}=(0,_contexts_Timeline__WEBPACK_IMPORTED_MODULE_2__.i)(),stageWidth=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>1440),[]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{setDrawRange({start:0,end:stageWidth+200})}),[setDrawRange,stageWidth]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.Hf,{height:200,width:1440,children:storyFn()})})};TasksLayerInternalDecorator.displayName="TasksLayerInternalDecorator";const TasksLayerDecorator=storyFn=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_contexts_Timeline__WEBPACK_IMPORTED_MODULE_2__.w,{...STORY_DATA,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(TasksLayerInternalDecorator,{storyFn})});TasksLayerDecorator.displayName="TasksLayerDecorator";try{LayerDecorator.displayName="LayerDecorator",LayerDecorator.__docgenInfo={description:"",displayName:"LayerDecorator",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@utils/stories.tsx#LayerDecorator"]={docgenInfo:LayerDecorator.__docgenInfo,name:"LayerDecorator",path:"src/@utils/stories.tsx#LayerDecorator"})}catch(__react_docgen_typescript_loader_error){}try{TaskDecorator.displayName="TaskDecorator",TaskDecorator.__docgenInfo={description:"",displayName:"TaskDecorator",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@utils/stories.tsx#TaskDecorator"]={docgenInfo:TaskDecorator.__docgenInfo,name:"TaskDecorator",path:"src/@utils/stories.tsx#TaskDecorator"})}catch(__react_docgen_typescript_loader_error){}try{TasksLayerDecorator.displayName="TasksLayerDecorator",TasksLayerDecorator.__docgenInfo={description:"",displayName:"TasksLayerDecorator",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@utils/stories.tsx#TasksLayerDecorator"]={docgenInfo:TasksLayerDecorator.__docgenInfo,name:"TasksLayerDecorator",path:"src/@utils/stories.tsx#TasksLayerDecorator"})}catch(__react_docgen_typescript_loader_error){}},"./src/@utils/time-resolution.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ig:()=>getResolutionData,kv:()=>displayInterval});const RESOLUTIONS_DATA={"1min":{columnSize:30,label:"1 Minute",sizeInUnits:1,unit:"minute",unitAbove:"hour"},"5min":{columnSize:30,label:"5 Minutes",sizeInUnits:5,unit:"minute",unitAbove:"hour"},"10min":{columnSize:30,label:"10 Minutes",sizeInUnits:10,unit:"minute",unitAbove:"hour"},"15min":{columnSize:60,label:"15 Minutes",sizeInUnits:15,unit:"minute",unitAbove:"hour"},"30min":{columnSize:60,label:"30 Minutes",sizeInUnits:30,unit:"minute",unitAbove:"hour"},"1hrs":{columnSize:60,label:"1 Hour",sizeInUnits:1,unit:"hour",unitAbove:"day"},"2hrs":{columnSize:60,label:"2 Hours",sizeInUnits:2,unit:"hour",unitAbove:"day"},"6hrs":{columnSize:120,label:"1/4 of Day",sizeInUnits:6,unit:"hour",unitAbove:"day"},"12hrs":{columnSize:180,label:"1/2 of Day",sizeInUnits:12,unit:"hour",unitAbove:"day"},"1day":{columnSize:180,label:"1 Day",sizeInUnits:1,unit:"day",unitAbove:"week"},"1week":{columnSize:600,label:"1 Week",sizeInUnits:1,unit:"week",unitAbove:"month"},"2weeks":{columnSize:600,label:"2 Weeks",sizeInUnits:2,unit:"week",unitAbove:"month"}},displayInterval=(interval,unit)=>{const{start}=interval;if(!start)return"-";switch(unit){case"minute":return start.toFormat("mm");case"hour":return start.toFormat("HH:mm");case"day":return start.toFormat("ccc dd");case"week":return`CW ${start.toFormat("WW")}`;case"month":return start.toFormat("MMM yyyy");default:return"N/A"}},getResolutionData=key=>RESOLUTIONS_DATA[key]},"./src/KonvaTimeline/stories-data.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{bm:()=>generateStoryData});const TIME_RANGE_START_DATE=new Date("2019-12-31T23:00:00.000Z"),generateStoryData=({averageTaskDurationInMinutes,resourcesCount,tasksCount,timeRangeInDays})=>{const resources=(count=>{const resources=[];for(let i=1;i<=count;i++)resources.push({id:`${i}`,label:`Resource #${i}`,color:`#${Math.floor(16777215*Math.random()).toString(16)}`});return resources})(resourcesCount),tasks=((count,avgDurationInMinutes,resourcesCount)=>{const tasks=[];for(let i=1;i<=count;i++){const resourceId=`${Math.floor(Math.random()*resourcesCount)+1}`,lastTaskForResource=tasks.reverse().find((task=>task.resourceId===resourceId));let start=TIME_RANGE_START_DATE.valueOf();lastTaskForResource&&(start=lastTaskForResource.time.end+Math.floor(avgDurationInMinutes/2)+60*Math.floor(Math.random()*(2*avgDurationInMinutes))*1e3);const end=start+60*Math.floor(Math.random()*(2*avgDurationInMinutes))*1e3;tasks.push({id:`${i}`,resourceId,label:`Task #${i}`,time:{start,end}})}return tasks})(tasksCount,averageTaskDurationInMinutes,resourcesCount);var durationInDays;return{resources,tasks,range:(durationInDays=timeRangeInDays,{start:TIME_RANGE_START_DATE.valueOf(),end:TIME_RANGE_START_DATE.setDate(TIME_RANGE_START_DATE.getDate()+durationInDays).valueOf()})}}}}]);