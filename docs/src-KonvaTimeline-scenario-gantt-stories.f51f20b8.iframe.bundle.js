"use strict";(self.webpackChunk_melfore_konva_timeline=self.webpackChunk_melfore_konva_timeline||[]).push([[40,773],{"./src/KonvaTimeline/scenario-gantt.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Line:function(){return Line},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return scenario_gantt_stories}});var react=__webpack_require__("./node_modules/react/index.js");function cov_k8h79nps3(){var path="/home/runner/work/konva-timeline/konva-timeline/src/utils/stories/decorators/Gantt.tsx",global=new Function("return this")(),gcv="__coverage__",coverageData={path:"/home/runner/work/konva-timeline/konva-timeline/src/utils/stories/decorators/Gantt.tsx",statementMap:{0:{start:{line:3,column:18},end:{line:41,column:1}},1:{start:{line:9,column:28},end:{line:9,column:57}},2:{start:{line:10,column:2},end:{line:15,column:22}},3:{start:{line:11,column:4},end:{line:13,column:5}},4:{start:{line:12,column:6},end:{line:12,column:36}},5:{start:{line:16,column:23},end:{line:35,column:35}},6:{start:{line:17,column:4},end:{line:17,column:61}},7:{start:{line:18,column:21},end:{line:33,column:6}},8:{start:{line:19,column:6},end:{line:28,column:7}},9:{start:{line:20,column:22},end:{line:20,column:34}},10:{start:{line:21,column:8},end:{line:27,column:10}},11:{start:{line:29,column:6},end:{line:31,column:7}},12:{start:{line:30,column:8},end:{line:30,column:20}},13:{start:{line:32,column:6},end:{line:32,column:15}},14:{start:{line:34,column:4},end:{line:34,column:23}},15:{start:{line:36,column:2},end:{line:40,column:6}},16:{start:{line:42,column:23},end:{line:44,column:64}},17:{start:{line:44,column:19},end:{line:44,column:64}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:3,column:18},end:{line:3,column:19}},loc:{start:{line:8,column:6},end:{line:41,column:1}},line:8},1:{name:"(anonymous_1)",decl:{start:{line:10,column:12},end:{line:10,column:13}},loc:{start:{line:10,column:18},end:{line:15,column:3}},line:10},2:{name:"(anonymous_2)",decl:{start:{line:16,column:35},end:{line:16,column:36}},loc:{start:{line:16,column:51},end:{line:35,column:3}},line:16},3:{name:"(anonymous_3)",decl:{start:{line:18,column:31},end:{line:18,column:32}},loc:{start:{line:18,column:36},end:{line:33,column:5}},line:18},4:{name:"(anonymous_4)",decl:{start:{line:42,column:23},end:{line:42,column:24}},loc:{start:{line:44,column:19},end:{line:44,column:64}},line:44}},branchMap:{0:{loc:{start:{line:9,column:37},end:{line:9,column:56}},type:"binary-expr",locations:[{start:{line:9,column:37},end:{line:9,column:50}},{start:{line:9,column:54},end:{line:9,column:56}}],line:9},1:{loc:{start:{line:11,column:4},end:{line:13,column:5}},type:"if",locations:[{start:{line:11,column:4},end:{line:13,column:5}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:11},2:{loc:{start:{line:12,column:15},end:{line:12,column:34}},type:"binary-expr",locations:[{start:{line:12,column:15},end:{line:12,column:28}},{start:{line:12,column:32},end:{line:12,column:34}}],line:12},3:{loc:{start:{line:17,column:4},end:{line:17,column:60}},type:"binary-expr",locations:[{start:{line:17,column:4},end:{line:17,column:24}},{start:{line:17,column:28},end:{line:17,column:60}}],line:17},4:{loc:{start:{line:19,column:6},end:{line:28,column:7}},type:"if",locations:[{start:{line:19,column:6},end:{line:28,column:7}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:19},5:{loc:{start:{line:19,column:10},end:{line:19,column:45}},type:"binary-expr",locations:[{start:{line:19,column:10},end:{line:19,column:14}},{start:{line:19,column:18},end:{line:19,column:45}}],line:19},6:{loc:{start:{line:29,column:6},end:{line:31,column:7}},type:"if",locations:[{start:{line:29,column:6},end:{line:31,column:7}},{start:{line:void 0,column:void 0},end:{line:void 0,column:void 0}}],line:29}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0},f:{0:0,1:0,2:0,3:0,4:0},b:{0:[0,0],1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0],6:[0,0]},inputSourceMap:{version:3,file:void 0,names:["cloneElement","useCallback","useEffect","useState","React","GanttMock","children","onTaskChange","externalOnTaskChange","tasks","externalTasks","props","setTasks","task","opts","newTasks","map","i","tasksId","includes","id","start","time","Number","addTime","end","createElement","Fragment","GanttDecorator","Story","args"],sourceRoot:void 0,sources:["/home/runner/work/konva-timeline/konva-timeline/src/utils/stories/decorators/Gantt.tsx"],sourcesContent:['import { cloneElement, ReactElement, useCallback, useEffect, useState } from "react";\nimport React from "react";\nimport { Decorator } from "@storybook/react";\n\nimport { TaskData } from "../../..";\nimport { TimelineProviderProps } from "../../../timeline/TimelineContext";\n\nconst GanttMock = ({\n  children,\n  onTaskChange: externalOnTaskChange,\n  tasks: externalTasks,\n  ...props\n}: TimelineProviderProps) => {\n  const [tasks, setTasks] = useState<TaskData[]>(externalTasks || []);\n\n  useEffect(() => {\n    if (externalTasks !== tasks) {\n      setTasks(externalTasks || []);\n    }\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [externalTasks]);\n\n  const onTaskChange = useCallback(\n    (task: TaskData, opts?: { tasksId: string[]; addTime: number }) => {\n      externalOnTaskChange && externalOnTaskChange(task, opts);\n      const newTasks = tasks.map((i) => {\n        if (opts && opts.tasksId.includes(i.id)) {\n          const start = i.time.start;\n          return { ...i, time: { start: Number(start) + opts.addTime, end: Number(i.time.end) + opts.addTime } };\n        }\n\n        if (i.id === task.id) {\n          return task;\n        }\n\n        return i;\n      });\n\n      setTasks(newTasks);\n    },\n    [externalOnTaskChange, tasks]\n  );\n\n  return <>{cloneElement(children as ReactElement, { onTaskChange, tasks, ...props })}</>;\n};\n\nconst GanttDecorator: Decorator<TimelineProviderProps> = (Story, { args }) => (\n  <GanttMock {...args}>{Story()}</GanttMock>\n);\n\nexport default GanttDecorator;\n'],mappings:"AAAA,SAASA,YAAY,EAAgBC,WAAW,EAAEC,SAAS,EAAEC,QAAQ,QAAQ,OAAO;AACpF,OAAOC,KAAK,MAAM,OAAO;AAMzB,MAAMC,SAAS,GAAGA,CAAC;EACjBC,QAAQ;EACRC,YAAY,EAAEC,oBAAoB;EAClCC,KAAK,EAAEC,aAAa;EACpB,GAAGC;AACkB,CAAC,KAAK;EAC3B,MAAM,CAACF,KAAK,EAAEG,QAAQ,CAAC,GAAGT,QAAQ,CAAaO,aAAa,IAAI,EAAE,CAAC;EAEnER,SAAS,CAAC,MAAM;IACd,IAAIQ,aAAa,KAAKD,KAAK,EAAE;MAC3BG,QAAQ,CAACF,aAAa,IAAI,EAAE,CAAC;IAC/B;IACA;EACF,CAAC,EAAE,CAACA,aAAa,CAAC,CAAC;EAEnB,MAAMH,YAAY,GAAGN,WAAW,CAC9B,CAACY,IAAc,EAAEC,IAA6C,KAAK;IACjEN,oBAAoB,IAAIA,oBAAoB,CAACK,IAAI,EAAEC,IAAI,CAAC;IACxD,MAAMC,QAAQ,GAAGN,KAAK,CAACO,GAAG,CAAEC,CAAC,IAAK;MAChC,IAAIH,IAAI,IAAIA,IAAI,CAACI,OAAO,CAACC,QAAQ,CAACF,CAAC,CAACG,EAAE,CAAC,EAAE;QACvC,MAAMC,KAAK,GAAGJ,CAAC,CAACK,IAAI,CAACD,KAAK;QAC1B,OAAO;UAAE,GAAGJ,CAAC;UAAEK,IAAI,EAAE;YAAED,KAAK,EAAEE,MAAM,CAACF,KAAK,CAAC,GAAGP,IAAI,CAACU,OAAO;YAAEC,GAAG,EAAEF,MAAM,CAACN,CAAC,CAACK,IAAI,CAACG,GAAG,CAAC,GAAGX,IAAI,CAACU;UAAQ;QAAE,CAAC;MACxG;MAEA,IAAIP,CAAC,CAACG,EAAE,KAAKP,IAAI,CAACO,EAAE,EAAE;QACpB,OAAOP,IAAI;MACb;MAEA,OAAOI,CAAC;IACV,CAAC,CAAC;IAEFL,QAAQ,CAACG,QAAQ,CAAC;EACpB,CAAC,EACD,CAACP,oBAAoB,EAAEC,KAAK,CAC9B,CAAC;EAED,oBAAOL,KAAA,CAAAsB,aAAA,CAAAtB,KAAA,CAAAuB,QAAA,qBAAG3B,YAAY,CAACM,QAAQ,EAAkB;IAAEC,YAAY;IAAEE,KAAK;IAAE,GAAGE;EAAM,CAAC,CAAI,CAAC;AACzF,CAAC;AAED,MAAMiB,cAAgD,GAAGA,CAACC,KAAK,EAAE;EAAEC;AAAK,CAAC,kBACvE1B,KAAA,CAAAsB,aAAA,CAACrB,SAAS,EAAKyB,IAAI,EAAGD,KAAK,CAAC,CAAa,CAC1C;AAED,eAAeD,cAAc",ignoreList:[]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"9a27fbb415e342b7f00427063355307488ba2b9a"},coverage=global[gcv]||(global[gcv]={});coverage[path]&&"9a27fbb415e342b7f00427063355307488ba2b9a"===coverage[path].hash||(coverage[path]=coverageData);var actualCoverage=coverage[path];return cov_k8h79nps3=function(){return actualCoverage},actualCoverage}cov_k8h79nps3(),cov_k8h79nps3().s[0]++;const GanttMock=({children:children,onTaskChange:externalOnTaskChange,tasks:externalTasks,...props})=>{cov_k8h79nps3().f[0]++;const[tasks,setTasks]=(cov_k8h79nps3().s[1]++,(0,react.useState)((cov_k8h79nps3().b[0][0]++,externalTasks||(cov_k8h79nps3().b[0][1]++,[]))));cov_k8h79nps3().s[2]++,(0,react.useEffect)((()=>{cov_k8h79nps3().f[1]++,cov_k8h79nps3().s[3]++,externalTasks!==tasks?(cov_k8h79nps3().b[1][0]++,cov_k8h79nps3().s[4]++,setTasks((cov_k8h79nps3().b[2][0]++,externalTasks||(cov_k8h79nps3().b[2][1]++,[])))):cov_k8h79nps3().b[1][1]++}),[externalTasks]);const onTaskChange=(cov_k8h79nps3().s[5]++,(0,react.useCallback)(((task,opts)=>{cov_k8h79nps3().f[2]++,cov_k8h79nps3().s[6]++,cov_k8h79nps3().b[3][0]++,externalOnTaskChange&&(cov_k8h79nps3().b[3][1]++,externalOnTaskChange(task,opts));const newTasks=(cov_k8h79nps3().s[7]++,tasks.map((i=>{if(cov_k8h79nps3().f[3]++,cov_k8h79nps3().s[8]++,cov_k8h79nps3().b[5][0]++,opts&&(cov_k8h79nps3().b[5][1]++,opts.tasksId.includes(i.id))){cov_k8h79nps3().b[4][0]++;const start=(cov_k8h79nps3().s[9]++,i.time.start);return cov_k8h79nps3().s[10]++,{...i,time:{start:Number(start)+opts.addTime,end:Number(i.time.end)+opts.addTime}}}return cov_k8h79nps3().b[4][1]++,cov_k8h79nps3().s[11]++,i.id===task.id?(cov_k8h79nps3().b[6][0]++,cov_k8h79nps3().s[12]++,task):(cov_k8h79nps3().b[6][1]++,cov_k8h79nps3().s[13]++,i)})));cov_k8h79nps3().s[14]++,setTasks(newTasks)}),[externalOnTaskChange,tasks]));return cov_k8h79nps3().s[15]++,react.createElement(react.Fragment,null,(0,react.cloneElement)(children,{onTaskChange:onTaskChange,tasks:tasks,...props}))};cov_k8h79nps3().s[16]++;var Gantt=(Story,{args:args})=>(cov_k8h79nps3().f[4]++,cov_k8h79nps3().s[17]++,react.createElement(GanttMock,args,Story())),utils=__webpack_require__("./src/utils/stories/utils.ts");var scenario_gantt_stories={title:"Scenario/Gantt",component:__webpack_require__("./src/KonvaTimeline/index.tsx").A,decorators:[Gantt],tags:["autodocs"],argTypes:{onTaskClick:{type:"function"},onTaskChange:{type:"function"}}};const{resources:resources}=(0,utils.Xk)({averageTaskDurationInMinutes:200,resourcesCount:3,tasksCount:5,timeRangeInDays:1}),Line={args:{onAreaSelect:void 0,resources:resources,resolution:"2weeks",enableLines:!0,toolTip:!1,onTaskClick:task=>task,initialDateTime:16983576e5,range:{start:16983576e5,end:17020952e5},tasks:[{id:"4",label:"Task4",resourceId:"2",time:{start:16983576e5,end:16986132e5},relatedTasks:["1"]},{id:"1",label:"Task1",resourceId:"1",time:{start:16987932e5,end:16994348e5},relatedTasks:["3","2"]},{id:"3",label:"Task3",resourceId:"3",time:{start:16997348e5,end:17002348e5}},{id:"2",label:"Task2",resourceId:"2",time:{start:16999e8,end:1700048e6},relatedTasks:["5"]},{id:"5",label:"Task5",resourceId:"1",time:{start:17005052e5,end:17008052e5}}],onTaskChange:(task,opts)=>{task.id}}},__namedExportsOrder=["Line"];Line.parameters={...Line.parameters,docs:{...Line.parameters?.docs,source:{originalSource:'{\n  args: {\n    onAreaSelect: undefined,\n    resources,\n    resolution: "2weeks",\n    enableLines: true,\n    toolTip: false,\n    onTaskClick: task => task,\n    initialDateTime: 1698357600000,\n    range: {\n      start: 1698357600000,\n      end: 1702095200000\n    },\n    tasks: [{\n      id: "4",\n      label: "Task4",\n      resourceId: "2",\n      time: {\n        start: 1698357600000,\n        end: 1698613200000\n      },\n      relatedTasks: ["1"]\n    }, {\n      id: "1",\n      label: "Task1",\n      resourceId: "1",\n      time: {\n        start: 1698793200000,\n        end: 1699434800000\n      },\n      relatedTasks: ["3", "2"]\n    }, {\n      id: "3",\n      label: "Task3",\n      resourceId: "3",\n      time: {\n        start: 1699734800000,\n        end: 1700234800000\n      }\n    }, {\n      id: "2",\n      label: "Task2",\n      resourceId: "2",\n      time: {\n        start: 1699900000000,\n        end: 1700048000000\n      },\n      relatedTasks: ["5"]\n    }, {\n      id: "5",\n      label: "Task5",\n      resourceId: "1",\n      time: {\n        start: 1700505200000,\n        end: 1700805200000\n      }\n    }],\n    onTaskChange: (task, opts) => {\n      task.id, opts;\n    }\n  }\n}',...Line.parameters?.docs?.source}}}},"./node_modules/react-dom/client.js":function(__unused_webpack_module,exports,__webpack_require__){var m=__webpack_require__("./node_modules/react-dom/index.js");exports.createRoot=m.createRoot,exports.hydrateRoot=m.hydrateRoot}}]);