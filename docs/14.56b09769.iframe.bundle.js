"use strict";(self.webpackChunk_melfore_konva_timeline=self.webpackChunk_melfore_konva_timeline||[]).push([[14],{"./src/tasks/components/Layer/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_konva__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),luxon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/luxon/src/luxon.js"),_timeline_TimelineContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/timeline/TimelineContext.tsx"),_Task__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/tasks/components/Task/index.tsx"),_Tooltip__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/tasks/components/Tooltip/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");function cov_1nacfvm119(){var path="/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Layer/index.tsx",global=new Function("return this")(),gcv="__coverage__",coverageData={path:"/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Layer/index.tsx",statementMap:{0:{start:{line:21,column:40},end:{line:132,column:1}},1:{start:{line:30,column:6},end:{line:30,column:26}},2:{start:{line:32,column:40},end:{line:32,column:79}},3:{start:{line:34,column:26},end:{line:37,column:3}},4:{start:{line:35,column:28},end:{line:35,column:78}},5:{start:{line:35,column:60},end:{line:35,column:77}},6:{start:{line:39,column:22},end:{line:39,column:101}},7:{start:{line:39,column:54},end:{line:39,column:91}},8:{start:{line:39,column:77},end:{line:39,column:90}},9:{start:{line:41,column:22},end:{line:41,column:65}},10:{start:{line:41,column:40},end:{line:41,column:60}},11:{start:{line:43,column:21},end:{line:54,column:3}},12:{start:{line:45,column:19},end:{line:45,column:38}},13:{start:{line:46,column:6},end:{line:48,column:7}},14:{start:{line:47,column:8},end:{line:47,column:36}},15:{start:{line:50,column:23},end:{line:50,column:28}},16:{start:{line:51,column:6},end:{line:51,column:37}},17:{start:{line:56,column:25},end:{line:59,column:3}},18:{start:{line:57,column:24},end:{line:57,column:71}},19:{start:{line:61,column:29},end:{line:68,column:3}},20:{start:{line:63,column:24},end:{line:63,column:54}},21:{start:{line:64,column:32},end:{line:64,column:82}},22:{start:{line:65,column:6},end:{line:65,column:47}},23:{start:{line:70,column:23},end:{line:78,column:3}},24:{start:{line:72,column:24},end:{line:72,column:50}},25:{start:{line:73,column:22},end:{line:73,column:46}},26:{start:{line:74,column:32},end:{line:74,column:75}},27:{start:{line:75,column:6},end:{line:75,column:47}},28:{start:{line:80,column:31},end:{line:86,column:8}},29:{start:{line:81,column:12},end:{line:81,column:50}},30:{start:{line:82,column:12},end:{line:82,column:50}},31:{start:{line:83,column:12},end:{line:83,column:50}},32:{start:{line:84,column:14},end:{line:84,column:50}},33:{start:{line:85,column:4},end:{line:85,column:42}},34:{start:{line:88,column:2},end:{line:90,column:3}},35:{start:{line:89,column:4},end:{line:89,column:16}},36:{start:{line:92,column:2},end:{line:94,column:3}},37:{start:{line:93,column:4},end:{line:93,column:16}},38:{start:{line:96,column:2},end:{line:131,column:4}},39:{start:{line:99,column:37},end:{line:99,column:45}},40:{start:{line:100,column:30},end:{line:100,column:57}},41:{start:{line:101,column:8},end:{line:103,column:9}},42:{start:{line:102,column:10},end:{line:102,column:22}},43:{start:{line:105,column:41},end:{line:105,column:65}},44:{start:{line:106,column:28},end:{line:106,column:58}},45:{start:{line:107,column:28},end:{line:107,column:71}},46:{start:{line:108,column:22},end:{line:108,column:40}},47:{start:{line:109,column:8},end:{line:111,column:9}},48:{start:{line:110,column:10},end:{line:110,column:22}},49:{start:{line:113,column:23},end:{line:113,column:58}},50:{start:{line:115,column:8},end:{line:127,column:10}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:21,column:40},end:{line:21,column:41}},loc:{start:{line:21,column:46},end:{line:132,column:1}},line:21},1:{name:"(anonymous_1)",decl:{start:{line:35,column:4},end:{line:35,column:5}},loc:{start:{line:35,column:28},end:{line:35,column:78}},line:35},2:{name:"(anonymous_2)",decl:{start:{line:35,column:48},end:{line:35,column:49}},loc:{start:{line:35,column:60},end:{line:35,column:77}},line:35},3:{name:"(anonymous_3)",decl:{start:{line:39,column:34},end:{line:39,column:35}},loc:{start:{line:39,column:54},end:{line:39,column:91}},line:39},4:{name:"(anonymous_4)",decl:{start:{line:39,column:65},end:{line:39,column:66}},loc:{start:{line:39,column:77},end:{line:39,column:90}},line:39},5:{name:"(anonymous_5)",decl:{start:{line:41,column:34},end:{line:41,column:35}},loc:{start:{line:41,column:40},end:{line:41,column:60}},line:41},6:{name:"(anonymous_6)",decl:{start:{line:44,column:4},end:{line:44,column:5}},loc:{start:{line:44,column:43},end:{line:52,column:5}},line:44},7:{name:"(anonymous_7)",decl:{start:{line:57,column:4},end:{line:57,column:5}},loc:{start:{line:57,column:24},end:{line:57,column:71}},line:57},8:{name:"(anonymous_8)",decl:{start:{line:62,column:4},end:{line:62,column:5}},loc:{start:{line:62,column:27},end:{line:66,column:5}},line:62},9:{name:"(anonymous_9)",decl:{start:{line:71,column:4},end:{line:71,column:5}},loc:{start:{line:71,column:35},end:{line:76,column:5}},line:71},10:{name:"(anonymous_10)",decl:{start:{line:80,column:43},end:{line:80,column:44}},loc:{start:{line:80,column:65},end:{line:86,column:3}},line:80},11:{name:"(anonymous_11)",decl:{start:{line:98,column:17},end:{line:98,column:18}},loc:{start:{line:98,column:38},end:{line:128,column:7}},line:98}},branchMap:{0:{loc:{start:{line:46,column:6},end:{line:48,column:7}},type:"if",locations:[{start:{line:46,column:6},end:{line:48,column:7}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:46},1:{loc:{start:{line:85,column:11},end:{line:85,column:41}},type:"cond-expr",locations:[{start:{line:85,column:24},end:{line:85,column:31}},{start:{line:85,column:34},end:{line:85,column:41}}],line:85},2:{loc:{start:{line:88,column:2},end:{line:90,column:3}},type:"if",locations:[{start:{line:88,column:2},end:{line:90,column:3}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:88},3:{loc:{start:{line:88,column:6},end:{line:88,column:36}},type:"binary-expr",locations:[{start:{line:88,column:6},end:{line:88,column:20}},{start:{line:88,column:24},end:{line:88,column:36}}],line:88},4:{loc:{start:{line:92,column:2},end:{line:94,column:3}},type:"if",locations:[{start:{line:92,column:2},end:{line:94,column:3}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:92},5:{loc:{start:{line:101,column:8},end:{line:103,column:9}},type:"if",locations:[{start:{line:101,column:8},end:{line:103,column:9}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:101},6:{loc:{start:{line:109,column:8},end:{line:111,column:9}},type:"if",locations:[{start:{line:109,column:8},end:{line:111,column:9}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:109},7:{loc:{start:{line:109,column:12},end:{line:109,column:80}},type:"binary-expr",locations:[{start:{line:109,column:12},end:{line:109,column:39}},{start:{line:109,column:43},end:{line:109,column:80}}],line:109},8:{loc:{start:{line:129,column:7},end:{line:129,column:54}},type:"binary-expr",locations:[{start:{line:129,column:7},end:{line:129,column:18}},{start:{line:129,column:22},end:{line:129,column:54}}],line:129}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0,24:0,25:0,26:0,27:0,28:0,29:0,30:0,31:0,32:0,33:0,34:0,35:0,36:0,37:0,38:0,39:0,40:0,41:0,42:0,43:0,44:0,45:0,46:0,47:0,48:0,49:0,50:0},f:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0},b:{0:[0,0],1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0],6:[0,0],7:[0,0],8:[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"444f08893561ff152976c49a600c6714800394cb"},coverage=global[gcv]||(global[gcv]={});coverage[path]&&"444f08893561ff152976c49a600c6714800394cb"===coverage[path].hash||(coverage[path]=coverageData);var actualCoverage=coverage[path];return cov_1nacfvm119=function(){return actualCoverage},actualCoverage}cov_1nacfvm119(),cov_1nacfvm119().s[0]++;const TasksLayer=()=>{cov_1nacfvm119().f[0]++;const{columnWidth,drawRange,interval:{start:intervalStart,end:intervalEnd},resolution,resources,rowHeight,tasks}=(cov_1nacfvm119().s[1]++,(0,_timeline_TimelineContext__WEBPACK_IMPORTED_MODULE_3__.i)()),[taskTooltip,setTaskTooltip]=(cov_1nacfvm119().s[2]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null)),getResourceById=(cov_1nacfvm119().s[3]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((resourceId=>(cov_1nacfvm119().f[1]++,cov_1nacfvm119().s[4]++,resources.findIndex((({id})=>(cov_1nacfvm119().f[2]++,cov_1nacfvm119().s[5]++,resourceId===id))))),[resources])),getTaskById=(cov_1nacfvm119().s[6]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((taskId=>(cov_1nacfvm119().f[3]++,cov_1nacfvm119().s[7]++,tasks.find((({id})=>(cov_1nacfvm119().f[4]++,cov_1nacfvm119().s[8]++,taskId===id))))),[tasks])),onTaskLeave=(cov_1nacfvm119().s[9]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>(cov_1nacfvm119().f[5]++,cov_1nacfvm119().s[10]++,setTaskTooltip(null))),[])),onTaskOver=(cov_1nacfvm119().s[11]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((taskId,point)=>{cov_1nacfvm119().f[6]++;const task=(cov_1nacfvm119().s[12]++,getTaskById(taskId));if(cov_1nacfvm119().s[13]++,!task)return cov_1nacfvm119().b[0][0]++,cov_1nacfvm119().s[14]++,setTaskTooltip(null);cov_1nacfvm119().b[0][1]++;const{x,y}=(cov_1nacfvm119().s[15]++,point);cov_1nacfvm119().s[16]++,setTaskTooltip({task,x,y})}),[getTaskById])),getXCoordinate=(cov_1nacfvm119().s[17]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((offset=>(cov_1nacfvm119().f[7]++,cov_1nacfvm119().s[18]++,offset*columnWidth/resolution.sizeInUnits)),[columnWidth,resolution.sizeInUnits])),getTaskXCoordinate=(cov_1nacfvm119().s[19]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((startTime=>{cov_1nacfvm119().f[8]++;const timeStart=(cov_1nacfvm119().s[20]++,luxon__WEBPACK_IMPORTED_MODULE_2__.ou.fromMillis(startTime)),startOffsetInUnit=(cov_1nacfvm119().s[21]++,timeStart.diff(intervalStart).as(resolution.unit));return cov_1nacfvm119().s[22]++,getXCoordinate(startOffsetInUnit)}),[getXCoordinate,intervalStart,resolution.unit])),getTaskWidth=(cov_1nacfvm119().s[23]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((({start,end})=>{cov_1nacfvm119().f[9]++;const timeStart=(cov_1nacfvm119().s[24]++,luxon__WEBPACK_IMPORTED_MODULE_2__.ou.fromMillis(start)),timeEnd=(cov_1nacfvm119().s[25]++,luxon__WEBPACK_IMPORTED_MODULE_2__.ou.fromMillis(end)),widthOffsetInUnit=(cov_1nacfvm119().s[26]++,timeEnd.diff(timeStart).as(resolution.unit));return cov_1nacfvm119().s[27]++,getXCoordinate(widthOffsetInUnit)}),[getXCoordinate,resolution.unit])),getContrastTextColor=(cov_1nacfvm119().s[28]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((hexcolor=>{cov_1nacfvm119().f[10]++;var r=(cov_1nacfvm119().s[29]++,parseInt(hexcolor.substring(1,3),16)),g=(cov_1nacfvm119().s[30]++,parseInt(hexcolor.substring(3,5),16)),b=(cov_1nacfvm119().s[31]++,parseInt(hexcolor.substring(5,7),16)),yiq=(cov_1nacfvm119().s[32]++,(299*r+587*g+114*b)/1e3);return cov_1nacfvm119().s[33]++,yiq>=128?(cov_1nacfvm119().b[1][0]++,"black"):(cov_1nacfvm119().b[1][1]++,"white")}),[]));return cov_1nacfvm119().s[34]++,cov_1nacfvm119().b[3][0]++,intervalStart&&(cov_1nacfvm119().b[3][1]++,intervalEnd)?(cov_1nacfvm119().b[2][1]++,cov_1nacfvm119().s[36]++,drawRange.end-drawRange.start<=0?(cov_1nacfvm119().b[4][0]++,cov_1nacfvm119().s[37]++,null):(cov_1nacfvm119().b[4][1]++,cov_1nacfvm119().s[38]++,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_1__.mh,{children:[tasks.map(((taskData,index)=>{cov_1nacfvm119().f[11]++;const{resourceId,time}=(cov_1nacfvm119().s[39]++,taskData),resourceIndex=(cov_1nacfvm119().s[40]++,getResourceById(resourceId));if(cov_1nacfvm119().s[41]++,resourceIndex<0)return cov_1nacfvm119().b[5][0]++,cov_1nacfvm119().s[42]++,null;cov_1nacfvm119().b[5][1]++;const{color:resourceColor}=(cov_1nacfvm119().s[43]++,resources[resourceIndex]),xCoordinate=(cov_1nacfvm119().s[44]++,getTaskXCoordinate(time.start)),yCoordinate=(cov_1nacfvm119().s[45]++,rowHeight*resourceIndex+.1*rowHeight),width=(cov_1nacfvm119().s[46]++,getTaskWidth(time));if(cov_1nacfvm119().s[47]++,cov_1nacfvm119().b[7][0]++,xCoordinate>drawRange.end||(cov_1nacfvm119().b[7][1]++,xCoordinate+width<drawRange.start))return cov_1nacfvm119().b[6][0]++,cov_1nacfvm119().s[48]++,null;cov_1nacfvm119().b[6][1]++;const stroke=(cov_1nacfvm119().s[49]++,getContrastTextColor(resourceColor));return cov_1nacfvm119().s[50]++,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Task__WEBPACK_IMPORTED_MODULE_4__.Z,{data:taskData,fill:resourceColor,onLeave:onTaskLeave,onOver:onTaskOver,stroke,x:xCoordinate,y:yCoordinate,width},`task-${taskData.id}`)})),(cov_1nacfvm119().b[8][0]++,taskTooltip&&(cov_1nacfvm119().b[8][1]++,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Tooltip__WEBPACK_IMPORTED_MODULE_5__.Z,{...taskTooltip})))]}))):(cov_1nacfvm119().b[2][0]++,cov_1nacfvm119().s[35]++,null)};TasksLayer.displayName="TasksLayer";const __WEBPACK_DEFAULT_EXPORT__=TasksLayer;try{Layer.displayName="Layer",Layer.__docgenInfo={description:"This component renders a set of tasks as a Konva Layer.\nTasks are displayed accordingly to their assigned resource (different vertical / row position) and their timing (different horizontal / column position)\n`TasksLayer` is also responsible of handling callback for task components offering base implementation for click, leave and over.\n\nThe playground has a canvas that simulates 1 day of data with 1 hour resolution.\nDepending on your screen size you might be able to test also the horizontal scrolling behaviour.",displayName:"Layer",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/tasks/components/Layer/index.tsx#Layer"]={docgenInfo:Layer.__docgenInfo,name:"Layer",path:"src/tasks/components/Layer/index.tsx#Layer"})}catch(__react_docgen_typescript_loader_error){}},"./src/tasks/components/Tooltip/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_konva__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),_timeline_TimelineContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/timeline/TimelineContext.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");function cov_2fcno329eq(){var path="/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Tooltip/index.tsx",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"e217e5ecf6fc15426fba59f70cf8cba9372b06aa"===coverage[path].hash||(coverage[path]={path:"/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Tooltip/index.tsx",statementMap:{0:{start:{line:12,column:32},end:{line:12,column:39}},1:{start:{line:13,column:27},end:{line:13,column:34}},2:{start:{line:14,column:34},end:{line:14,column:36}},3:{start:{line:15,column:33},end:{line:15,column:35}},4:{start:{line:20,column:42},end:{line:44,column:1}},5:{start:{line:23,column:6},end:{line:23,column:26}},6:{start:{line:25,column:15},end:{line:25,column:69}},7:{start:{line:25,column:29},end:{line:25,column:47}},8:{start:{line:27,column:2},end:{line:43,column:4}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:20,column:42},end:{line:20,column:43}},loc:{start:{line:20,column:84},end:{line:44,column:1}},line:20},1:{name:"(anonymous_1)",decl:{start:{line:25,column:23},end:{line:25,column:24}},loc:{start:{line:25,column:29},end:{line:25,column:47}},line:25}},branchMap:{},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},f:{0:0,1:0},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"e217e5ecf6fc15426fba59f70cf8cba9372b06aa"});var actualCoverage=coverage[path];return cov_2fcno329eq=function(){return actualCoverage},actualCoverage}cov_2fcno329eq();const TASK_TOOLTIP_BACKGROUND=(cov_2fcno329eq().s[0]++,"black"),TASK_TOOLTIP_COLOR=(cov_2fcno329eq().s[1]++,"white"),TASK_TOOLTIP_POINTER_SIZE=(cov_2fcno329eq().s[2]++,10),TASK_TOOLTIP_SHADOW_SIZE=(cov_2fcno329eq().s[3]++,10);cov_2fcno329eq().s[4]++;const TaskTooltip=({task:{label:taskLabel},x,y})=>{cov_2fcno329eq().f[0]++;const{drawRange:{start:drawRangeStart}}=(cov_2fcno329eq().s[5]++,(0,_timeline_TimelineContext__WEBPACK_IMPORTED_MODULE_2__.i)()),xPos=(cov_2fcno329eq().s[6]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>(cov_2fcno329eq().f[1]++,cov_2fcno329eq().s[7]++,x+drawRangeStart)),[drawRangeStart,x]));return cov_2fcno329eq().s[8]++,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_1__.__,{x:xPos,y,opacity:.75,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.Vp,{fill:TASK_TOOLTIP_BACKGROUND,lineJoin:"round",pointerDirection:"down",pointerHeight:TASK_TOOLTIP_POINTER_SIZE,pointerWidth:TASK_TOOLTIP_POINTER_SIZE,shadowBlur:TASK_TOOLTIP_SHADOW_SIZE,shadowColor:TASK_TOOLTIP_BACKGROUND,shadowOffsetX:TASK_TOOLTIP_SHADOW_SIZE,shadowOffsetY:TASK_TOOLTIP_SHADOW_SIZE,shadowOpacity:.2}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_1__.xv,{text:taskLabel,fill:TASK_TOOLTIP_COLOR,fontSize:18,padding:5})]})};TaskTooltip.displayName="TaskTooltip";const __WEBPACK_DEFAULT_EXPORT__=TaskTooltip;try{Tooltip.displayName="Tooltip",Tooltip.__docgenInfo={description:"This component renders a task tooltip inside a canvas.",displayName:"Tooltip",props:{task:{defaultValue:null,description:"",name:"task",required:!0,type:{name:"TaskData"}},x:{defaultValue:null,description:"The x coordinate of a point on canvas",name:"x",required:!0,type:{name:"number"}},y:{defaultValue:null,description:"The y coordinate of a point on canvas",name:"y",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/tasks/components/Tooltip/index.tsx#Tooltip"]={docgenInfo:Tooltip.__docgenInfo,name:"Tooltip",path:"src/tasks/components/Tooltip/index.tsx#Tooltip"})}catch(__react_docgen_typescript_loader_error){}}}]);