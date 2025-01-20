(self.webpackChunk_melfore_konva_timeline=self.webpackChunk_melfore_konva_timeline||[]).push([[29],{"./src/tasks/components/Tooltip/index.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{A:function(){return components_Tooltip}});var react=__webpack_require__("./node_modules/react/index.js"),ReactKonva=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),es=__webpack_require__("./node_modules/react-konva-utils/es/index.js"),luxon=__webpack_require__("./node_modules/luxon/src/luxon.js"),TimelineContext=__webpack_require__("./src/timeline/TimelineContext.tsx");function cov_1pyy2oe77e(){var path="/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Tooltip/DefaultToolTip/index.tsx",global=new Function("return this")(),gcv="__coverage__",coverageData={path:"/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Tooltip/DefaultToolTip/index.tsx",statementMap:{0:{start:{line:2,column:23},end:{line:94,column:1}},1:{start:{line:11,column:2},end:{line:93,column:19}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:2,column:23},end:{line:2,column:24}},loc:{start:{line:10,column:6},end:{line:94,column:1}},line:10}},branchMap:{0:{loc:{start:{line:77,column:95},end:{line:93,column:17}},type:"binary-expr",locations:[{start:{line:77,column:95},end:{line:77,column:114}},{start:{line:77,column:131},end:{line:93,column:17}}],line:77}},s:{0:0,1:0},f:{0:0},b:{0:[0,0]},inputSourceMap:{version:3,file:void 0,names:["React","DefaultToolTip","localized","startDuration","endDuration","duration","completedPercentage","percentage","label","createElement","style","backgroundColor","border","borderColor","borderWidth","padding","boxShadow","maxWidth","overflow","textOverflow","fontFamily","fontSize","fontWeight","display","alignItems","start","end","time","unit","completed"],sourceRoot:void 0,sources:["/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Tooltip/DefaultToolTip/index.tsx"],sourcesContent:['import React, { FC } from "react";\n\nimport { Localized } from "../../../../timeline/TimelineContext";\n\ntype DefaultToolTip = {\n  localized: Localized;\n  startDuration: string;\n  endDuration: string;\n  duration: { time: number; unit: string };\n  completedPercentage?: number;\n  percentage: string;\n  label: string;\n};\n\nconst DefaultToolTip: FC<DefaultToolTip> = ({\n  localized,\n  startDuration,\n  endDuration,\n  duration,\n  completedPercentage,\n  percentage,\n  label,\n}) => {\n  return (\n    <div\n      style={{\n        backgroundColor: "white",\n        border: "ridge",\n        borderColor: "black",\n        borderWidth: "1px",\n        padding: 8,\n        boxShadow: "2px 2px 8px black",\n        maxWidth: 200,\n        overflow: "hidden",\n        textOverflow: "ellipsis",\n      }}\n    >\n      <b\n        style={{\n          fontFamily: "Times New Roman",\n          fontSize: 16,\n          fontWeight: 700,\n        }}\n      >\n        {label}\n      </b>\n      <br />\n\n      <div style={{ display: "inline-flex", alignItems: "center" }}>\n        <b style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: 700 }}>{localized.start}: </b>\n        &nbsp;&nbsp;&nbsp;\n        <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{startDuration}</span>\n      </div>\n      <br></br>\n      <div style={{ display: "inline-flex", alignItems: "center" }}>\n        <b style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: 700 }}>{localized.end}: </b>\n        &nbsp;&nbsp;&nbsp;\n        <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{endDuration}</span>\n      </div>\n      <br></br>\n\n      <div style={{ display: "inline-flex", alignItems: "center" }}>\n        <b style={{ fontFamily: "Times New Roman", fontSize: 14, fontWeight: 700 }}>{localized.duration}: </b>\n        &nbsp;&nbsp;&nbsp;\n        <span style={{ fontFamily: "Courier New", fontSize: 13 }}>\n          {duration.time} {duration.unit}(s)\n        </span>\n      </div>\n      <br></br>\n      {completedPercentage && (\n        <div style={{ display: "inline-flex", alignItems: "center" }}>\n          <b style={{ fontFamily: "Times New Roman", fontSize: 14, fontWeight: 700 }}>{localized.completed}: </b>\n          &nbsp;&nbsp;&nbsp;\n          <span style={{ fontFamily: "Courier New", fontSize: 13 }}>{percentage}</span>\n        </div>\n      )}\n    </div>\n  );\n};\n\nexport default DefaultToolTip;\n'],mappings:"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",ignoreList:[]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"563bad8875c507072eebd2db47624290675fcb3c"},coverage=global[gcv]||(global[gcv]={});coverage[path]&&"563bad8875c507072eebd2db47624290675fcb3c"===coverage[path].hash||(coverage[path]=coverageData);var actualCoverage=coverage[path];return cov_1pyy2oe77e=function(){return actualCoverage},actualCoverage}cov_1pyy2oe77e(),cov_1pyy2oe77e().s[0]++;const DefaultToolTip=({localized:localized,startDuration:startDuration,endDuration:endDuration,duration:duration,completedPercentage:completedPercentage,percentage:percentage,label:label})=>(cov_1pyy2oe77e().f[0]++,cov_1pyy2oe77e().s[1]++,react.createElement("div",{style:{backgroundColor:"white",border:"ridge",borderColor:"black",borderWidth:"1px",padding:8,boxShadow:"2px 2px 8px black",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis"}},react.createElement("b",{style:{fontFamily:"Times New Roman",fontSize:16,fontWeight:700}},label),react.createElement("br",null),react.createElement("div",{style:{display:"inline-flex",alignItems:"center"}},react.createElement("b",{style:{fontSize:14,fontFamily:"Times New Roman",fontWeight:700}},localized.start,": "),"   ",react.createElement("span",{style:{fontFamily:"Courier New",fontSize:13}},startDuration)),react.createElement("br",null),react.createElement("div",{style:{display:"inline-flex",alignItems:"center"}},react.createElement("b",{style:{fontSize:14,fontFamily:"Times New Roman",fontWeight:700}},localized.end,": "),"   ",react.createElement("span",{style:{fontFamily:"Courier New",fontSize:13}},endDuration)),react.createElement("br",null),react.createElement("div",{style:{display:"inline-flex",alignItems:"center"}},react.createElement("b",{style:{fontFamily:"Times New Roman",fontSize:14,fontWeight:700}},localized.duration,": "),"   ",react.createElement("span",{style:{fontFamily:"Courier New",fontSize:13}},duration.time," ",duration.unit,"(s)")),react.createElement("br",null),(cov_1pyy2oe77e().b[0][0]++,completedPercentage&&(cov_1pyy2oe77e().b[0][1]++,react.createElement("div",{style:{display:"inline-flex",alignItems:"center"}},react.createElement("b",{style:{fontFamily:"Times New Roman",fontSize:14,fontWeight:700}},localized.completed,": "),"   ",react.createElement("span",{style:{fontFamily:"Courier New",fontSize:13}},percentage))))));var Tooltip_DefaultToolTip=DefaultToolTip;try{DefaultToolTip.displayName="DefaultToolTip",DefaultToolTip.__docgenInfo={description:"",displayName:"DefaultToolTip",props:{localized:{defaultValue:null,description:"",name:"localized",required:!0,type:{name:"Localized"}},startDuration:{defaultValue:null,description:"",name:"startDuration",required:!0,type:{name:"string"}},endDuration:{defaultValue:null,description:"",name:"endDuration",required:!0,type:{name:"string"}},duration:{defaultValue:null,description:"",name:"duration",required:!0,type:{name:"{ time: number; unit: string; }"}},completedPercentage:{defaultValue:null,description:"",name:"completedPercentage",required:!1,type:{name:"number"}},percentage:{defaultValue:null,description:"",name:"percentage",required:!0,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/tasks/components/Tooltip/DefaultToolTip/index.tsx#DefaultToolTip"]={docgenInfo:DefaultToolTip.__docgenInfo,name:"DefaultToolTip",path:"src/tasks/components/Tooltip/DefaultToolTip/index.tsx#DefaultToolTip"})}catch(__react_docgen_typescript_loader_error){}function cov_2fcno329eq(){var path="/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Tooltip/index.tsx",global=new Function("return this")(),gcv="__coverage__",coverageData={path:"/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Tooltip/index.tsx",statementMap:{0:{start:{line:7,column:27},end:{line:7,column:31}},1:{start:{line:8,column:30},end:{line:8,column:32}},2:{start:{line:9,column:22},end:{line:9,column:24}},3:{start:{line:10,column:26},end:{line:10,column:34}},4:{start:{line:11,column:23},end:{line:11,column:32}},5:{start:{line:15,column:20},end:{line:141,column:1}},6:{start:{line:27,column:6},end:{line:27,column:26}},7:{start:{line:36,column:6},end:{line:36,column:10}},8:{start:{line:37,column:24},end:{line:39,column:13}},9:{start:{line:38,column:4},end:{line:38,column:78}},10:{start:{line:40,column:22},end:{line:42,column:11}},11:{start:{line:41,column:4},end:{line:41,column:76}},12:{start:{line:43,column:21},end:{line:45,column:27}},13:{start:{line:44,column:4},end:{line:44,column:37}},14:{start:{line:46,column:19},end:{line:73,column:18}},15:{start:{line:47,column:17},end:{line:47,column:44}},16:{start:{line:48,column:4},end:{line:56,column:5}},17:{start:{line:49,column:18},end:{line:51,column:21}},18:{start:{line:52,column:6},end:{line:55,column:8}},19:{start:{line:57,column:4},end:{line:65,column:5}},20:{start:{line:58,column:19},end:{line:60,column:19}},21:{start:{line:61,column:6},end:{line:64,column:8}},22:{start:{line:66,column:16},end:{line:68,column:16}},23:{start:{line:69,column:4},end:{line:72,column:6}},24:{start:{line:74,column:24},end:{line:109,column:41}},25:{start:{line:75,column:4},end:{line:86,column:5}},26:{start:{line:76,column:6},end:{line:81,column:7}},27:{start:{line:77,column:8},end:{line:80,column:10}},28:{start:{line:82,column:6},end:{line:85,column:8}},29:{start:{line:87,column:4},end:{line:98,column:5}},30:{start:{line:88,column:6},end:{line:93,column:7}},31:{start:{line:89,column:8},end:{line:92,column:10}},32:{start:{line:94,column:6},end:{line:97,column:8}},33:{start:{line:99,column:4},end:{line:104,column:5}},34:{start:{line:100,column:6},end:{line:103,column:8}},35:{start:{line:105,column:4},end:{line:108,column:6}},36:{start:{line:110,column:28},end:{line:116,column:40}},37:{start:{line:111,column:4},end:{line:115,column:6}},38:{start:{line:117,column:18},end:{line:135,column:129}},39:{start:{line:118,column:4},end:{line:134,column:41}},40:{start:{line:136,column:2},end:{line:140,column:60}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:15,column:20},end:{line:15,column:21}},loc:{start:{line:19,column:6},end:{line:141,column:1}},line:19},1:{name:"(anonymous_1)",decl:{start:{line:37,column:32},end:{line:37,column:33}},loc:{start:{line:37,column:38},end:{line:39,column:3}},line:37},2:{name:"(anonymous_2)",decl:{start:{line:40,column:30},end:{line:40,column:31}},loc:{start:{line:40,column:36},end:{line:42,column:3}},line:40},3:{name:"(anonymous_3)",decl:{start:{line:43,column:29},end:{line:43,column:30}},loc:{start:{line:43,column:35},end:{line:45,column:3}},line:43},4:{name:"(anonymous_4)",decl:{start:{line:46,column:27},end:{line:46,column:28}},loc:{start:{line:46,column:33},end:{line:73,column:3}},line:46},5:{name:"(anonymous_5)",decl:{start:{line:74,column:32},end:{line:74,column:33}},loc:{start:{line:74,column:38},end:{line:109,column:3}},line:74},6:{name:"(anonymous_6)",decl:{start:{line:110,column:36},end:{line:110,column:37}},loc:{start:{line:110,column:42},end:{line:116,column:3}},line:110},7:{name:"(anonymous_7)",decl:{start:{line:117,column:26},end:{line:117,column:27}},loc:{start:{line:117,column:32},end:{line:135,column:3}},line:117}},branchMap:{0:{loc:{start:{line:48,column:4},end:{line:56,column:5}},type:"if",locations:[{start:{line:48,column:4},end:{line:56,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:48},1:{loc:{start:{line:57,column:4},end:{line:65,column:5}},type:"if",locations:[{start:{line:57,column:4},end:{line:65,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:57},2:{loc:{start:{line:75,column:4},end:{line:86,column:5}},type:"if",locations:[{start:{line:75,column:4},end:{line:86,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:75},3:{loc:{start:{line:76,column:6},end:{line:81,column:7}},type:"if",locations:[{start:{line:76,column:6},end:{line:81,column:7}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:76},4:{loc:{start:{line:87,column:4},end:{line:98,column:5}},type:"if",locations:[{start:{line:87,column:4},end:{line:98,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:87},5:{loc:{start:{line:88,column:6},end:{line:93,column:7}},type:"if",locations:[{start:{line:88,column:6},end:{line:93,column:7}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:88},6:{loc:{start:{line:99,column:4},end:{line:104,column:5}},type:"if",locations:[{start:{line:99,column:4},end:{line:104,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:99},7:{loc:{start:{line:118,column:11},end:{line:134,column:40}},type:"cond-expr",locations:[{start:{line:118,column:41},end:{line:126,column:6}},{start:{line:126,column:22},end:{line:134,column:40}}],line:118}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0,24:0,25:0,26:0,27:0,28:0,29:0,30:0,31:0,32:0,33:0,34:0,35:0,36:0,37:0,38:0,39:0,40:0},f:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0},b:{0:[0,0],1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0],6:[0,0],7:[0,0]},inputSourceMap:{version:3,file:void 0,names:["React","useMemo","Label","Html","DateTime","Duration","useTimelineContext","DefaultToolTip","rightMarginOffsetX","standardMarginOffsetX","marginOffsetY","sevenHourinMillis","twoDayinMillis","TaskTooltip","task","x","y","drawRange","end","drawEnd","resources","localized","customToolTip","label","completedPercentage","time","start","resourceId","startDuration","fromMillis","Number","toFormat","endDuration","percentage","duration","part","min","fromObject","as","Math","round","unit","hour","day","offsetToolTip","id","length","customToolTipData","toolTip","createElement","style","minWidth","maxWidth","minHeight","maxHeight","overflow","opacity"],sourceRoot:void 0,sources:["/home/runner/work/konva-timeline/konva-timeline/src/tasks/components/Tooltip/index.tsx"],sourcesContent:['import React, { FC, useMemo } from "react";\nimport { Label } from "react-konva";\nimport { Html } from "react-konva-utils";\nimport { DateTime, Duration } from "luxon";\n\nimport { useTimelineContext } from "../../../timeline/TimelineContext";\nimport { KonvaPoint } from "../../../utils/konva";\nimport { TaskData } from "../../utils/tasks";\n\nimport DefaultToolTip from "./DefaultToolTip";\n\nexport interface TaskTooltipProps extends KonvaPoint {\n  task: TaskData;\n}\nconst rightMarginOffsetX = -230;\nconst standardMarginOffsetX = 15;\nconst marginOffsetY = 25;\nconst sevenHourinMillis = 25200000;\nconst twoDayinMillis = 172800000;\n/**\n * This component renders a task tooltip inside a canvas.\n */\nconst TaskTooltip: FC<TaskTooltipProps> = ({ task, x, y }) => {\n  const {\n    drawRange: { end: drawEnd },\n    resources,\n    localized,\n    customToolTip,\n  } = useTimelineContext();\n\n  const {\n    label,\n    completedPercentage,\n    time: { start, end },\n    resourceId,\n  } = task;\n  const startDuration = useMemo(() => {\n    return DateTime.fromMillis(Number(start)).toFormat("dd/MM/yyyy HH:mm:ss");\n  }, [start]);\n  const endDuration = useMemo(() => {\n    return DateTime.fromMillis(Number(end)).toFormat("dd/MM/yyyy HH:mm:ss");\n  }, [end]);\n  const percentage = useMemo(() => {\n    return completedPercentage + "%";\n  }, [completedPercentage]);\n\n  const duration = useMemo(() => {\n    const part = Number(end) - Number(start);\n    if (part < sevenHourinMillis) {\n      const min = Duration.fromObject({ ["millisecond"]: part }).as("minute");\n      return { time: Math.round(min * 10) / 10, unit: "min" };\n    }\n    if (part < twoDayinMillis) {\n      const hour = Duration.fromObject({ ["millisecond"]: part }).as("hour");\n      return { time: Math.round(hour * 10) / 10, unit: "hour" };\n    }\n    const day = Duration.fromObject({ ["millisecond"]: part }).as("day");\n    return { time: Math.round(day * 10) / 10, unit: "Day" };\n  }, [start, end]);\n\n  const offsetToolTip = useMemo(() => {\n    if (resourceId === resources[1].id) {\n      if (x > drawEnd + rightMarginOffsetX) {\n        return { x: rightMarginOffsetX, y: marginOffsetY };\n      }\n      return { x: standardMarginOffsetX, y: marginOffsetY };\n    }\n\n    if (resourceId === resources[resources.length - 1].id) {\n      if (x > drawEnd + rightMarginOffsetX) {\n        return { x: rightMarginOffsetX, y: marginOffsetY * 4 };\n      }\n      return { x: standardMarginOffsetX, y: marginOffsetY * 4 };\n    }\n\n    if (x > drawEnd + rightMarginOffsetX) {\n      return { x: rightMarginOffsetX, y: marginOffsetY * 2 };\n    }\n    return { x: standardMarginOffsetX, y: marginOffsetY * 2 };\n  }, [drawEnd, resourceId, x, resources]);\n\n  const customToolTipData = useMemo(() => {\n    return { ...task, start: startDuration, end: endDuration };\n  }, [task, startDuration, endDuration]);\n\n  const toolTip = useMemo(() => {\n    return !customToolTip ? (\n      <DefaultToolTip\n        duration={duration}\n        endDuration={endDuration}\n        startDuration={startDuration}\n        label={label}\n        localized={localized}\n        percentage={percentage}\n        completedPercentage={completedPercentage}\n      />\n    ) : (\n      <div style={{ minWidth: 190, maxWidth: 201, minHeight: 90, maxHeight: 101, overflow: "hidden" }}>\n        {customToolTip(customToolTipData)}\n      </div>\n    );\n  }, [\n    completedPercentage,\n    duration,\n    endDuration,\n    label,\n    localized,\n    startDuration,\n    percentage,\n    customToolTip,\n    customToolTipData,\n  ]);\n\n  return (\n    <Label x={x + offsetToolTip.x} y={y - offsetToolTip.y} opacity={1}>\n      <Html>{toolTip}</Html>\n    </Label>\n  );\n};\n\nexport default TaskTooltip;\n'],mappings:"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",ignoreList:[]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"9b6b8d7db56c60ca9878e2488cb523274902f31a"},coverage=global[gcv]||(global[gcv]={});coverage[path]&&"9b6b8d7db56c60ca9878e2488cb523274902f31a"===coverage[path].hash||(coverage[path]=coverageData);var actualCoverage=coverage[path];return cov_2fcno329eq=function(){return actualCoverage},actualCoverage}cov_2fcno329eq();const rightMarginOffsetX=(cov_2fcno329eq().s[0]++,-230),standardMarginOffsetX=(cov_2fcno329eq().s[1]++,15),marginOffsetY=(cov_2fcno329eq().s[2]++,25),sevenHourinMillis=(cov_2fcno329eq().s[3]++,252e5),twoDayinMillis=(cov_2fcno329eq().s[4]++,1728e5);cov_2fcno329eq().s[5]++;var components_Tooltip=({task:task,x:x,y:y})=>{cov_2fcno329eq().f[0]++;const{drawRange:{end:drawEnd},resources:resources,localized:localized,customToolTip:customToolTip}=(cov_2fcno329eq().s[6]++,(0,TimelineContext._)()),{label:label,completedPercentage:completedPercentage,time:{start:start,end:end},resourceId:resourceId}=(cov_2fcno329eq().s[7]++,task),startDuration=(cov_2fcno329eq().s[8]++,(0,react.useMemo)((()=>(cov_2fcno329eq().f[1]++,cov_2fcno329eq().s[9]++,luxon.c9.fromMillis(Number(start)).toFormat("dd/MM/yyyy HH:mm:ss"))),[start])),endDuration=(cov_2fcno329eq().s[10]++,(0,react.useMemo)((()=>(cov_2fcno329eq().f[2]++,cov_2fcno329eq().s[11]++,luxon.c9.fromMillis(Number(end)).toFormat("dd/MM/yyyy HH:mm:ss"))),[end])),percentage=(cov_2fcno329eq().s[12]++,(0,react.useMemo)((()=>(cov_2fcno329eq().f[3]++,cov_2fcno329eq().s[13]++,completedPercentage+"%")),[completedPercentage])),duration=(cov_2fcno329eq().s[14]++,(0,react.useMemo)((()=>{cov_2fcno329eq().f[4]++;const part=(cov_2fcno329eq().s[15]++,Number(end)-Number(start));if(cov_2fcno329eq().s[16]++,part<sevenHourinMillis){cov_2fcno329eq().b[0][0]++;const min=(cov_2fcno329eq().s[17]++,luxon.dw.fromObject({millisecond:part}).as("minute"));return cov_2fcno329eq().s[18]++,{time:Math.round(10*min)/10,unit:"min"}}if(cov_2fcno329eq().b[0][1]++,cov_2fcno329eq().s[19]++,part<twoDayinMillis){cov_2fcno329eq().b[1][0]++;const hour=(cov_2fcno329eq().s[20]++,luxon.dw.fromObject({millisecond:part}).as("hour"));return cov_2fcno329eq().s[21]++,{time:Math.round(10*hour)/10,unit:"hour"}}cov_2fcno329eq().b[1][1]++;const day=(cov_2fcno329eq().s[22]++,luxon.dw.fromObject({millisecond:part}).as("day"));return cov_2fcno329eq().s[23]++,{time:Math.round(10*day)/10,unit:"Day"}}),[start,end])),offsetToolTip=(cov_2fcno329eq().s[24]++,(0,react.useMemo)((()=>(cov_2fcno329eq().f[5]++,cov_2fcno329eq().s[25]++,resourceId===resources[1].id?(cov_2fcno329eq().b[2][0]++,cov_2fcno329eq().s[26]++,x>drawEnd+rightMarginOffsetX?(cov_2fcno329eq().b[3][0]++,cov_2fcno329eq().s[27]++,{x:rightMarginOffsetX,y:marginOffsetY}):(cov_2fcno329eq().b[3][1]++,cov_2fcno329eq().s[28]++,{x:standardMarginOffsetX,y:marginOffsetY})):(cov_2fcno329eq().b[2][1]++,cov_2fcno329eq().s[29]++,resourceId===resources[resources.length-1].id?(cov_2fcno329eq().b[4][0]++,cov_2fcno329eq().s[30]++,x>drawEnd+rightMarginOffsetX?(cov_2fcno329eq().b[5][0]++,cov_2fcno329eq().s[31]++,{x:rightMarginOffsetX,y:4*marginOffsetY}):(cov_2fcno329eq().b[5][1]++,cov_2fcno329eq().s[32]++,{x:standardMarginOffsetX,y:4*marginOffsetY})):(cov_2fcno329eq().b[4][1]++,cov_2fcno329eq().s[33]++,x>drawEnd+rightMarginOffsetX?(cov_2fcno329eq().b[6][0]++,cov_2fcno329eq().s[34]++,{x:rightMarginOffsetX,y:2*marginOffsetY}):(cov_2fcno329eq().b[6][1]++,cov_2fcno329eq().s[35]++,{x:standardMarginOffsetX,y:2*marginOffsetY}))))),[drawEnd,resourceId,x,resources])),customToolTipData=(cov_2fcno329eq().s[36]++,(0,react.useMemo)((()=>(cov_2fcno329eq().f[6]++,cov_2fcno329eq().s[37]++,{...task,start:startDuration,end:endDuration})),[task,startDuration,endDuration])),toolTip=(cov_2fcno329eq().s[38]++,(0,react.useMemo)((()=>(cov_2fcno329eq().f[7]++,cov_2fcno329eq().s[39]++,customToolTip?(cov_2fcno329eq().b[7][1]++,react.createElement("div",{style:{minWidth:190,maxWidth:201,minHeight:90,maxHeight:101,overflow:"hidden"}},customToolTip(customToolTipData))):(cov_2fcno329eq().b[7][0]++,react.createElement(Tooltip_DefaultToolTip,{duration:duration,endDuration:endDuration,startDuration:startDuration,label:label,localized:localized,percentage:percentage,completedPercentage:completedPercentage})))),[completedPercentage,duration,endDuration,label,localized,startDuration,percentage,customToolTip,customToolTipData]));return cov_2fcno329eq().s[40]++,react.createElement(ReactKonva.JU,{x:x+offsetToolTip.x,y:y-offsetToolTip.y,opacity:1},react.createElement(es.Ed,null,toolTip))};try{Tooltip.displayName="Tooltip",Tooltip.__docgenInfo={description:"This component renders a task tooltip inside a canvas.",displayName:"Tooltip",props:{task:{defaultValue:null,description:"",name:"task",required:!0,type:{name:"TaskData<TimeRange>"}},x:{defaultValue:null,description:"The x coordinate of a point on canvas",name:"x",required:!0,type:{name:"number"}},y:{defaultValue:null,description:"The y coordinate of a point on canvas",name:"y",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/tasks/components/Tooltip/index.tsx#Tooltip"]={docgenInfo:Tooltip.__docgenInfo,name:"Tooltip",path:"src/tasks/components/Tooltip/index.tsx#Tooltip"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/react-konva-utils/es/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Ed:function(){return Html}});var react=__webpack_require__("./node_modules/react/index.js"),client=__webpack_require__("./node_modules/react-dom/client.js"),ReactKonva=__webpack_require__("./node_modules/react-konva/es/ReactKonva.js"),dist=__webpack_require__("./node_modules/its-fine/dist/index.js"),__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};const Html=({children:children,groupProps:groupProps,divProps:divProps,transform:transform,transformFunc:transformFunc})=>{const Bridge=(0,dist.y3)(),groupRef=react.useRef(null),[div]=react.useState((()=>document.createElement("div"))),root=react.useMemo((()=>client.createRoot(div)),[div]),shouldTransform=null==transform||transform,handleTransform=function useEvent(fn=()=>{}){const ref=react.useRef(fn);return ref.current=fn,react.useCallback(((...args)=>ref.current.apply(null,args)),[])}((()=>{if(shouldTransform&&groupRef.current){let attrs=groupRef.current.getAbsoluteTransform().decompose();transformFunc&&(attrs=transformFunc(attrs)),div.style.position="absolute",div.style.zIndex="10",div.style.top="0px",div.style.left="0px",div.style.transform=`translate(${attrs.x}px, ${attrs.y}px) rotate(${attrs.rotation}deg) scaleX(${attrs.scaleX}) scaleY(${attrs.scaleY})`,div.style.transformOrigin="top left"}else div.style.position="",div.style.zIndex="",div.style.top="",div.style.left="",div.style.transform="",div.style.transformOrigin="";const _a=divProps||{},{style:style}=_a,restProps=__rest(_a,["style"]);Object.assign(div.style,style),Object.assign(div,restProps)}));return react.useLayoutEffect((()=>{var _a;const group=groupRef.current;if(!group)return;const parent=null===(_a=group.getStage())||void 0===_a?void 0:_a.container();return parent?(parent.appendChild(div),shouldTransform&&(el=>{const pos=window.getComputedStyle(el).position;return!("absolute"===pos||"relative"===pos)})(parent)&&(parent.style.position="relative"),group.on("absoluteTransformChange",handleTransform),handleTransform(),()=>{var _a;group.off("absoluteTransformChange",handleTransform),null===(_a=div.parentNode)||void 0===_a||_a.removeChild(div)}):void 0}),[shouldTransform]),react.useLayoutEffect((()=>{handleTransform()}),[divProps,transformFunc]),react.useLayoutEffect((()=>{root.render(react.createElement(Bridge,null,children))})),react.useLayoutEffect((()=>()=>{setTimeout((()=>{root.unmount()}))}),[]),react.createElement(ReactKonva.YJ,Object.assign({ref:groupRef},groupProps))};__webpack_require__("./node_modules/use-image/index.js")},"./node_modules/use-image/index.js":function(module,__unused_webpack_exports,__webpack_require__){var React=__webpack_require__("./node_modules/react/index.js");module.exports=function useImage(url,crossOrigin,referrerpolicy){const statusRef=React.useRef("loading"),imageRef=React.useRef(),[_,setStateToken]=React.useState(0),oldUrl=React.useRef(),oldCrossOrigin=React.useRef(),oldReferrerPolicy=React.useRef();return oldUrl.current===url&&oldCrossOrigin.current===crossOrigin&&oldReferrerPolicy.current===referrerpolicy||(statusRef.current="loading",imageRef.current=void 0,oldUrl.current=url,oldCrossOrigin.current=crossOrigin,oldReferrerPolicy.current=referrerpolicy),React.useLayoutEffect((function(){if(url){var img=document.createElement("img");return img.addEventListener("load",onload),img.addEventListener("error",onerror),crossOrigin&&(img.crossOrigin=crossOrigin),referrerpolicy&&(img.referrerPolicy=referrerpolicy),img.src=url,function cleanup(){img.removeEventListener("load",onload),img.removeEventListener("error",onerror)}}function onload(){statusRef.current="loaded",imageRef.current=img,setStateToken(Math.random())}function onerror(){statusRef.current="failed",imageRef.current=void 0,setStateToken(Math.random())}}),[url,crossOrigin,referrerpolicy]),[imageRef.current,statusRef.current]}}}]);