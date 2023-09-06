"use strict";(self.webpackChunk_melfore_konva_timeline=self.webpackChunk_melfore_konva_timeline||[]).push([[183],{"./src/@components/Task/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,i:()=>TaskDocs});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_konva__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),_contexts_Timeline__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/@contexts/Timeline.tsx"),_utils_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/@utils/resources.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Task=({data,fill="transparent",onLeave,onOver,stroke="black",x,y,width})=>{const{columnWidth,interval,onTaskClick,onTaskDrag,resolution:{sizeInUnits,unit},resources}=(0,_contexts_Timeline__WEBPACK_IMPORTED_MODULE_2__.i)(),{id:taskId}=data,[dragging,setDragging]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),getBoundedCoordinates=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((xCoordinate,resourceIndex)=>({x:xCoordinate<0?0:xCoordinate,y:resourceIndex*_utils_resources__WEBPACK_IMPORTED_MODULE_3__.Cu+_utils_resources__WEBPACK_IMPORTED_MODULE_3__.qG})),[]),getDragPoint=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{const{target}=e;return{x:target.x(),y:target.y()}}),[]),getResourceIndexFromYCoordinate=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((yCoordinate=>{const rawIndex=Math.floor(yCoordinate/_utils_resources__WEBPACK_IMPORTED_MODULE_3__.Cu);if(rawIndex<1)return 1;const lastResourceIndex=resources.length-1;return rawIndex>lastResourceIndex?lastResourceIndex:rawIndex}),[resources]),onTaskMouseEvent=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((e,callback)=>{const stage=e.target.getStage();if(!stage)return;const point=stage.getPointerPosition();point&&callback(taskId,point)}),[taskId]),onClick=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>onTaskClick&&onTaskClick(data)),[data,onTaskClick]),onTaskLeave=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>onTaskMouseEvent(e,onLeave)),[onLeave,onTaskMouseEvent]),onTaskOver=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>onTaskMouseEvent(e,onOver)),[onOver,onTaskMouseEvent]),onDragStart=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>setDragging(!0)),[]),onDragMove=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{const{x,y}=getDragPoint(e),resourceIndex=getResourceIndexFromYCoordinate(y),point=getBoundedCoordinates(x,resourceIndex);e.target.setPosition(point),onOver(taskId,point)}),[getBoundedCoordinates,getDragPoint,getResourceIndexFromYCoordinate,onOver,taskId]),onDragEnd=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e=>{const{x,y}=getDragPoint(e),timeOffset=x*sizeInUnits/columnWidth,newMillis=interval.start.plus({[unit]:timeOffset}).toMillis(),resourceId=`${getResourceIndexFromYCoordinate(y)}`;console.log(`New Start: ${x} /  ${x} / ${timeOffset} / ${newMillis}`),setDragging(!1),onTaskDrag&&onTaskDrag({...data,resourceId,time:{end:newMillis+width,start:newMillis}})}),[columnWidth,data,interval.start,onTaskDrag,getDragPoint,getResourceIndexFromYCoordinate,sizeInUnits,unit,width]),opacity=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>dragging?.5:1),[dragging]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.UL,{id:taskId,cornerRadius:4,draggable:!!onTaskDrag,fill,height:40,onClick,onDragStart,onDragMove,onDragEnd,onMouseLeave:onTaskLeave,onMouseMove:onTaskOver,onMouseOver:onTaskOver,opacity,stroke,x,y,width})};Task.displayName="Task";const TaskDocs=Task,__WEBPACK_DEFAULT_EXPORT__=(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(Task);try{TaskDocs.displayName="TaskDocs",TaskDocs.__docgenInfo={description:"",displayName:"TaskDocs",props:{fill:{defaultValue:{value:"transparent"},description:"The fill color of a canvas item",name:"fill",required:!1,type:{name:"string"}},stroke:{defaultValue:{value:"black"},description:"The stroke color of a canvas item",name:"stroke",required:!1,type:{name:"string"}},x:{defaultValue:null,description:"The x coordinate of a point on canvas",name:"x",required:!0,type:{name:"number"}},y:{defaultValue:null,description:"The y coordinate of a point on canvas",name:"y",required:!0,type:{name:"number"}},data:{defaultValue:null,description:"Task data (id, label, resourceId, time)",name:"data",required:!0,type:{name:"TaskData"}},onLeave:{defaultValue:null,description:"On mouse leave event handler",name:"onLeave",required:!0,type:{name:"TaskMouseEventHandler"}},onOver:{defaultValue:null,description:"On mouse over event handler",name:"onOver",required:!0,type:{name:"TaskMouseEventHandler"}},width:{defaultValue:null,description:"The width of the task",name:"width",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@components/Task/index.tsx#TaskDocs"]={docgenInfo:TaskDocs.__docgenInfo,name:"TaskDocs",path:"src/@components/Task/index.tsx#TaskDocs"})}catch(__react_docgen_typescript_loader_error){}try{Task.displayName="Task",Task.__docgenInfo={description:"This component renders a simple task as a rectangle inside a canvas.\nEach task is rendered by `TasksLayer` component, with a loop on each task provided to `KonvaTimeline`.\n`TasksLayer` is also responsible of handling callback for task components.\n\nSupported events (click, leave, over) respond with callbacks of type:\n<br />\n `(taskId: string, point: KonvaPoint) => void`\n\nThe playground has a simulated canvas with height: 200px and width: 100%",displayName:"Task",props:{fill:{defaultValue:{value:"transparent"},description:"The fill color of a canvas item",name:"fill",required:!1,type:{name:"string"}},stroke:{defaultValue:{value:"black"},description:"The stroke color of a canvas item",name:"stroke",required:!1,type:{name:"string"}},x:{defaultValue:null,description:"The x coordinate of a point on canvas",name:"x",required:!0,type:{name:"number"}},y:{defaultValue:null,description:"The y coordinate of a point on canvas",name:"y",required:!0,type:{name:"number"}},data:{defaultValue:null,description:"Task data (id, label, resourceId, time)",name:"data",required:!0,type:{name:"TaskData"}},onLeave:{defaultValue:null,description:"On mouse leave event handler",name:"onLeave",required:!0,type:{name:"TaskMouseEventHandler"}},onOver:{defaultValue:null,description:"On mouse over event handler",name:"onOver",required:!0,type:{name:"TaskMouseEventHandler"}},width:{defaultValue:null,description:"The width of the task",name:"width",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@components/Task/index.tsx#Task"]={docgenInfo:Task.__docgenInfo,name:"Task",path:"src/@components/Task/index.tsx#Task"})}catch(__react_docgen_typescript_loader_error){}},"./src/@components/TaskTooltip/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_konva__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),_contexts_Timeline__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/@contexts/Timeline.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const TaskTooltip=({task:{label:taskLabel},x,y})=>{const{drawRange:{start:drawRangeStart}}=(0,_contexts_Timeline__WEBPACK_IMPORTED_MODULE_2__.i)(),adjustedX=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>x+drawRangeStart),[drawRangeStart,x]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_1__.__,{x:adjustedX,y,opacity:.75,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.Vp,{fill:"black",lineJoin:"round",pointerDirection:"down",pointerHeight:10,pointerWidth:10,shadowBlur:10,shadowColor:"black",shadowOffsetX:10,shadowOffsetY:10,shadowOpacity:.2}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.xv,{text:taskLabel,fill:"white",fontSize:18,padding:5})]})};TaskTooltip.displayName="TaskTooltip";const __WEBPACK_DEFAULT_EXPORT__=TaskTooltip;try{TaskTooltip.displayName="TaskTooltip",TaskTooltip.__docgenInfo={description:"This component renders a task tooltip inside a canvas.",displayName:"TaskTooltip",props:{task:{defaultValue:null,description:"",name:"task",required:!0,type:{name:"TaskData"}},x:{defaultValue:null,description:"The x coordinate of a point on canvas",name:"x",required:!0,type:{name:"number"}},y:{defaultValue:null,description:"The y coordinate of a point on canvas",name:"y",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@components/TaskTooltip/index.tsx#TaskTooltip"]={docgenInfo:TaskTooltip.__docgenInfo,name:"TaskTooltip",path:"src/@components/TaskTooltip/index.tsx#TaskTooltip"})}catch(__react_docgen_typescript_loader_error){}},"./src/@components/TasksLayer/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_konva__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),luxon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/luxon/src/luxon.js"),_contexts_Timeline__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/@contexts/Timeline.tsx"),_utils_resources__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/@utils/resources.ts"),_Task__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/@components/Task/index.tsx"),_TaskTooltip__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/@components/TaskTooltip/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/react/jsx-runtime.js");const TasksLayer=()=>{const{columnWidth,drawRange,interval:{start:intervalStart,end:intervalEnd},resolution,resources,tasks}=(0,_contexts_Timeline__WEBPACK_IMPORTED_MODULE_3__.i)(),[taskTooltip,setTaskTooltip]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),getResourceById=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((resourceId=>resources.findIndex((({id})=>resourceId===id))),[resources]),getTaskById=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((taskId=>tasks.find((({id})=>taskId===id))),[tasks]),onTaskLeave=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>setTaskTooltip(null)),[]),onTaskOver=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((taskId,point)=>{const task=getTaskById(taskId);if(!task)return setTaskTooltip(null);const{x,y}=point;setTaskTooltip({task,x,y})}),[getTaskById]),getXCoordinate=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((offset=>offset*columnWidth/resolution.sizeInUnits),[columnWidth,resolution.sizeInUnits]),getTaskXCoordinate=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((startTime=>{const startOffsetInUnit=luxon__WEBPACK_IMPORTED_MODULE_2__.ou.fromMillis(startTime).diff(intervalStart).as(resolution.unit);return getXCoordinate(startOffsetInUnit)}),[getXCoordinate,intervalStart,resolution.unit]),getTaskWidth=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((({start,end})=>{const timeStart=luxon__WEBPACK_IMPORTED_MODULE_2__.ou.fromMillis(start),widthOffsetInUnit=luxon__WEBPACK_IMPORTED_MODULE_2__.ou.fromMillis(end).diff(timeStart).as(resolution.unit);return getXCoordinate(widthOffsetInUnit)}),[getXCoordinate,resolution.unit]);return intervalStart&&intervalEnd?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_1__.mh,{children:[tasks.map(((taskData,index)=>{const{resourceId,time}=taskData,resourceIndex=getResourceById(resourceId);if(resourceIndex<0)return null;const{color:resourceColor}=resources[resourceIndex],xCoordinate=getTaskXCoordinate(time.start),yCoordinate=_utils_resources__WEBPACK_IMPORTED_MODULE_4__.Cu*resourceIndex+5,width=getTaskWidth(time);return xCoordinate>drawRange.end||xCoordinate+width<drawRange.start?null:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Task__WEBPACK_IMPORTED_MODULE_5__.Z,{data:taskData,fill:resourceColor,onLeave:onTaskLeave,onOver:onTaskOver,x:xCoordinate,y:yCoordinate,width},`task-${index}`)})),taskTooltip&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_TaskTooltip__WEBPACK_IMPORTED_MODULE_6__.Z,{...taskTooltip})]}):null};TasksLayer.displayName="TasksLayer";const __WEBPACK_DEFAULT_EXPORT__=TasksLayer;try{TasksLayer.displayName="TasksLayer",TasksLayer.__docgenInfo={description:"This component renders a set of tasks as a Konva Layer.\nTasks are displayed accordingly to their assigned resource (different vertical / row position) and their timing (different horizontal / column position)\n`TasksLayer` is also responsible of handling callback for task components offering base implementation for click, leave and over.\n\nThe playground has a canvas that simulates 1 day of data with 1 hour resolution.\nDepending on your screen size you might be able to test also the horizontal scrolling behaviour.",displayName:"TasksLayer",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@components/TasksLayer/index.tsx#TasksLayer"]={docgenInfo:TasksLayer.__docgenInfo,name:"TasksLayer",path:"src/@components/TasksLayer/index.tsx#TasksLayer"})}catch(__react_docgen_typescript_loader_error){}},"./src/@contexts/Timeline.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>TimelineProvider,i:()=>useTimelineContext});var react=__webpack_require__("./node_modules/react/index.js"),logger=__webpack_require__("./src/@utils/logger.ts"),_utils_resources=__webpack_require__("./src/@utils/resources.ts"),luxon=__webpack_require__("./node_modules/luxon/src/luxon.js");const toInterval=({start,end})=>luxon.Xp.fromDateTimes(luxon.ou.fromMillis(start),luxon.ou.fromMillis(end));var time_resolution=__webpack_require__("./src/@utils/time-resolution.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TimelineContext=(0,react.createContext)(void 0),DEFAULT_DRAW_RANGE={start:0,end:0},TimelineProvider=({children,columnWidth:externalColumnWidth=time_resolution.cV,debug=!1,hideResources=!1,onTaskClick,onTaskDrag,tasks:externalTasks,range,resolution:externalResolution,resources:externalResources,theme:externalTheme="light"})=>{const[drawRange,setDrawRange]=(0,react.useState)(DEFAULT_DRAW_RANGE),[resolutionKey,setResolutionKey]=(0,react.useState)(externalResolution);(0,react.useEffect)((()=>{(0,logger.yN)("TimelineProvider","Debug "+(debug?"ON":"OFF")),window.__MELFORE_KONVA_TIMELINE_DEBUG__=debug}),[debug]),(0,react.useEffect)((()=>{externalResolution!==resolutionKey&&((0,logger.o7)("TimelineProvider",`Resolution changed to '${externalResolution}'`),setResolutionKey(externalResolution))}),[externalResolution]);const interval=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating interval..."),toInterval(range))),[range]),resolution=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating resolution..."),(0,time_resolution.Ig)(resolutionKey))),[resolutionKey]),columnWidth=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating columnWidth..."),!externalColumnWidth||externalColumnWidth<time_resolution.cV?resolution.columnSize:externalColumnWidth)),[externalColumnWidth,resolution]),resources=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Preparing resources..."),[_utils_resources.if,...externalResources])),[externalResources]),resourcesContentHeight=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating resources content height..."),_utils_resources.Cu*resources.length)),[resources]),tasks=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Preparing tasks..."),((tasks,interval)=>tasks.filter((task=>{const taskInterval=toInterval(task.time);return!!interval.intersection(taskInterval)})))(externalTasks,interval))),[externalTasks,interval]),timeBlocks=(0,react.useMemo)((()=>((0,logger.o7)("TimelineProvider","Calculating time blocks..."),interval.splitBy({[resolution.unit]:resolution.sizeInUnits}))),[interval,resolution]),theme=(0,react.useMemo)((()=>({color:"dark"===externalTheme?"white":"black"})),[externalTheme]);return(0,jsx_runtime.jsx)(TimelineContext.Provider,{value:{columnWidth,drawRange,hideResources,interval,onTaskClick,onTaskDrag,resolution,resolutionKey,resources,resourcesContentHeight,setDrawRange,setResolutionKey,tasks,theme,timeBlocks},children})};TimelineProvider.displayName="TimelineProvider";const useTimelineContext=()=>{const context=(0,react.useContext)(TimelineContext);if(void 0===context)throw new Error("useTimelineContext must be used within a TimelineProvider");return context};try{TimelineProvider.displayName="TimelineProvider",TimelineProvider.__docgenInfo={description:"",displayName:"TimelineProvider",props:{columnWidth:{defaultValue:null,description:"Custom column width (defaults to 60px)",name:"columnWidth",required:!1,type:{name:"number"}},hideResources:{defaultValue:{value:"false"},description:"Flag to hide resource column (defaults to false)",name:"hideResources",required:!1,type:{name:"boolean"}},resolution:{defaultValue:null,description:"Resolution to display data in konva-timeline",name:"resolution",required:!0,type:{name:"enum",value:[{value:'"1min"'},{value:'"5min"'},{value:'"10min"'},{value:'"15min"'},{value:'"30min"'},{value:'"1hrs"'},{value:'"2hrs"'},{value:'"6hrs"'},{value:'"12hrs"'},{value:'"1day"'},{value:'"1week"'},{value:'"2weeks"'}]}},tasks:{defaultValue:null,description:"List of tasks to be displayed",name:"tasks",required:!0,type:{name:"TaskData[]"}},range:{defaultValue:null,description:"Time range to be displayed",name:"range",required:!0,type:{name:"TimeRange"}},resources:{defaultValue:null,description:"List of resources to be displayed",name:"resources",required:!0,type:{name:"Resource[]"}},debug:{defaultValue:{value:"false"},description:"Enables debug logging in browser console",name:"debug",required:!1,type:{name:"boolean"}},onTaskClick:{defaultValue:null,description:"Event handler for task click",name:"onTaskClick",required:!1,type:{name:"((task: TaskData) => void)"}},onTaskDrag:{defaultValue:null,description:"Event handler for task click",name:"onTaskDrag",required:!1,type:{name:"((task: TaskData) => void)"}},theme:{defaultValue:null,description:"Theme color in use",name:"theme",required:!1,type:{name:"enum",value:[{value:'"dark"'},{value:'"light"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/@contexts/Timeline.tsx#TimelineProvider"]={docgenInfo:TimelineProvider.__docgenInfo,name:"TimelineProvider",path:"src/@contexts/Timeline.tsx#TimelineProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/@utils/logger.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o7:()=>logDebug,yN:()=>logWarn});const logger=(level,component,message)=>{const text=`[@melfore/konva-timeline] ${component} - ${message}`;switch(level){case"debug":return void console.info(text);case"error":return void console.error(text);case"warn":return void console.warn(text)}},logDebug=(component,message)=>{window.__MELFORE_KONVA_TIMELINE_DEBUG__&&logger("debug",component,message)},logWarn=(component,message)=>logger("warn",component,message)},"./src/@utils/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Cu:()=>RESOURCE_HEADER_HEIGHT,Fc:()=>RESOURCE_HEADER_TEXT_OFFSET,Oc:()=>RESOURCE_HEADER_WIDTH,if:()=>RESOURCE_HEADER,qG:()=>RESOURCE_HEADER_OFFSET});const RESOURCE_HEADER_HEIGHT=50,RESOURCE_HEADER_OFFSET=5,RESOURCE_HEADER_TEXT_OFFSET=20,RESOURCE_HEADER_WIDTH=200,RESOURCE_HEADER={color:"transparent",id:"-1",label:"Header"}},"./src/@utils/time-resolution.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ig:()=>getResolutionData,cV:()=>DEFAULT_COLUMN_WIDTH,kv:()=>displayInterval});const DEFAULT_COLUMN_WIDTH=60,RESOLUTIONS_DATA={"1min":{columnSize:DEFAULT_COLUMN_WIDTH/2,label:"1 Minute",sizeInUnits:1,unit:"minute",unitAbove:"hour"},"5min":{columnSize:DEFAULT_COLUMN_WIDTH/2,label:"5 Minutes",sizeInUnits:5,unit:"minute",unitAbove:"hour"},"10min":{columnSize:DEFAULT_COLUMN_WIDTH/2,label:"10 Minutes",sizeInUnits:10,unit:"minute",unitAbove:"hour"},"15min":{columnSize:DEFAULT_COLUMN_WIDTH,label:"15 Minutes",sizeInUnits:15,unit:"minute",unitAbove:"hour"},"30min":{columnSize:DEFAULT_COLUMN_WIDTH,label:"30 Minutes",sizeInUnits:30,unit:"minute",unitAbove:"hour"},"1hrs":{columnSize:DEFAULT_COLUMN_WIDTH,label:"1 Hour",sizeInUnits:1,unit:"hour",unitAbove:"day"},"2hrs":{columnSize:DEFAULT_COLUMN_WIDTH,label:"2 Hours",sizeInUnits:2,unit:"hour",unitAbove:"day"},"6hrs":{columnSize:2*DEFAULT_COLUMN_WIDTH,label:"1/4 of Day",sizeInUnits:6,unit:"hour",unitAbove:"day"},"12hrs":{columnSize:3*DEFAULT_COLUMN_WIDTH,label:"1/2 of Day",sizeInUnits:12,unit:"hour",unitAbove:"day"},"1day":{columnSize:3*DEFAULT_COLUMN_WIDTH,label:"1 Day",sizeInUnits:1,unit:"day",unitAbove:"week"},"1week":{columnSize:10*DEFAULT_COLUMN_WIDTH,label:"1 Week",sizeInUnits:1,unit:"week",unitAbove:"month"},"2weeks":{columnSize:10*DEFAULT_COLUMN_WIDTH,label:"2 Weeks",sizeInUnits:2,unit:"week",unitAbove:"month"}},displayInterval=(interval,unit)=>{const{start}=interval;if(!start)return"-";switch(unit){case"minute":return start.toFormat("mm");case"hour":return start.toFormat("HH:mm");case"day":return start.toFormat("ccc dd");case"week":return`CW ${start.toFormat("WW")}`;case"month":return start.toFormat("MMM yyyy");default:return"N/A"}},getResolutionData=key=>RESOLUTIONS_DATA[key]},"./src/KonvaTimeline/stories-data.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{bm:()=>generateStoryData});const TIME_RANGE_START_DATE=new Date("2019-12-31T23:00:00.000Z"),generateStoryData=({averageTaskDurationInMinutes,resourcesCount,tasksCount,timeRangeInDays})=>{const resources=(count=>{const resources=[];for(let i=1;i<=count;i++)resources.push({id:`${i}`,label:`Resource #${i}`,color:`#${Math.floor(16777215*Math.random()).toString(16)}`});return resources})(resourcesCount),tasks=((count,avgDurationInMinutes,resourcesCount)=>{const tasks=[];for(let i=1;i<=count;i++){const resourceId=`${Math.floor(Math.random()*resourcesCount)+1}`,lastTaskForResource=tasks.reverse().find((task=>task.resourceId===resourceId));let start=TIME_RANGE_START_DATE.valueOf();lastTaskForResource&&(start=lastTaskForResource.time.end+Math.floor(avgDurationInMinutes/2)+60*Math.floor(Math.random()*(2*avgDurationInMinutes))*1e3);const end=start+60*Math.floor(Math.random()*(2*avgDurationInMinutes))*1e3;tasks.push({id:`${i}`,resourceId,label:`Task #${i}`,time:{start,end}})}return tasks})(tasksCount,averageTaskDurationInMinutes,resourcesCount);var durationInDays;return{resources,tasks,range:(durationInDays=timeRangeInDays,{start:TIME_RANGE_START_DATE.valueOf(),end:TIME_RANGE_START_DATE.setDate(TIME_RANGE_START_DATE.getDate()+durationInDays).valueOf()})}}}}]);