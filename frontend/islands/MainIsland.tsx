import { useState, useRef, useEffect, useLayoutEffect } from "preact/hooks";
import * as d3 from "d3"
import tip from 'd3-tip';

export default function MainIsland() {
  const [numStages, setNumStages] = useState<number>(1)

  const [name, setName] = useState<string>("")

  // Relevant data for api call
  const [payload, setPayload] = useState<number>(0);
  const [missileDiameter, setMissileDiameter] = useState<number>(0);
  const [nozzleArea, setNozzleArea] = useState<number>(0);
  const [nosecone, setNosecone] = useState<string>("");
  const [lDivD, setLDivD] = useState<number>(0);
  const [reentryDiameter, setReentryDiameter] = useState<number>(0);
  const [estimatedRange, setEstimatedRange] = useState<number>(0);
  const [burnoutAngle, setBurnoutAngle] = useState<number>(0);

  const [fuelMasses, setFuelMasses] = useState<Array<number>>([0])
  const [dryMasses, setDryMasses] = useState<Array<number>>([0])
  const [thrusts, setThrusts] = useState<Array<number>>([0])
  const [isps, setISPs] = useState<Array<number>>([0])

  // loading
  const [isLoading, setIsLoading] = useState<boolean>(false)


  // results
  const [hasResults, setHasResults] = useState<boolean>(false)
  const [dataset, setDataset] = useState<Object>({})

  // graph
  const [statistic, setStatistic] = useState<string>("velocity")
  const [unit, setUnit] = useState<string>("m/s")

  // ref
  const ref = useRef()

  // set parameters
  const changePreset = (e) => {
    const preset = e.target.value

    switch (preset) {
      case ("Germany - V2"):
        setNumStages(1)

        setName("Germany - V2")

        setPayload(975)
        setMissileDiameter(1.65)
        setNozzleArea(1)
        setNosecone("V2")
        setLDivD(1)
        setReentryDiameter(0)
        setEstimatedRange(240)
        setBurnoutAngle(45)

        setFuelMasses([8900])
        setDryMasses([4000])
        setThrusts([27461])
        setISPs([210])

        break;
      case ("Russia - Scud-B"):
        setNumStages(1)

        setName("Russia - Scud-B")

        setPayload(1000)
        setMissileDiameter(0.855)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(1)
        setReentryDiameter(0)
        setEstimatedRange(300)
        setBurnoutAngle(45)

        setFuelMasses([5200])
        setDryMasses([1150])
        setThrusts([8300])
        setISPs([226])

        break;
      case ("Iraq - Al-Husayn"):
        setNumStages(1)

        setName("Iraq - Al-Husayn")

        setPayload(500)
        setMissileDiameter(0.88)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(1)
        setReentryDiameter(0)
        setEstimatedRange(600)
        setBurnoutAngle(45)

        setFuelMasses([5600])
        setDryMasses([1200])
        setThrusts([9177.4])
        setISPs([226])

        break;
      case ("DPRK - Nodong-A"):
        setNumStages(1)

        setName("DPRK - Nodong-A")

        setPayload(1000)
        setMissileDiameter(1.35)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(1)
        setReentryDiameter(0)
        setEstimatedRange(1500)
        setBurnoutAngle(45)

        setFuelMasses([12798])
        setDryMasses([2294])
        setThrusts([26600])
        setISPs([226])

        break;
      case ("DPRK - Nodong-A1"):
        setNumStages(1)

        setName("DPRK - Nodong-A1")

        setPayload(650)
        setMissileDiameter(1.35)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(1)
        setReentryDiameter(0)
        setEstimatedRange(2000)
        setBurnoutAngle(45)

        setFuelMasses([14950])
        setDryMasses([2371])
        setThrusts([31260])
        setISPs([226])

        break;
      case ("DPRK - Nodong-B"):
        setNumStages(1)

        setName("DPRK - Nodong-B")

        setPayload(1000)
        setMissileDiameter(1.5)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(1)
        setReentryDiameter(0)
        setEstimatedRange(4000)
        setBurnoutAngle(45)

        setFuelMasses([17858])
        setDryMasses([2146])
        setThrusts([26580])
        setISPs([269])

        break;
      case ("Iran - Qased5"):
        setNumStages(5)

        setName("Iran - Qased5")

        setPayload(200)
        setMissileDiameter(0.95)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(2)
        setReentryDiameter(0.6)
        setEstimatedRange(5000)
        setBurnoutAngle(45)

        setFuelMasses([15075.0, 42.0, 755.0, 200.0, 171.0])
        setDryMasses([1675.0, 0.001, 150.0, 0.001, 55.0])
        setThrusts([30917.0, 0.01, 2961.0, 0.01, 1743.0])
        setISPs([240.0, 0.01, 255.0, 0.01, 255.0])

        break;
      case ("Iran - Qased2"):
        setNumStages(3)

        setName("Iran - Qased5")

        setPayload(200)
        setMissileDiameter(0.95)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(2)
        setReentryDiameter(0.6)
        setEstimatedRange(5000)
        setBurnoutAngle(45)

        setFuelMasses([15075.0, 755.0, 171.0])
        setDryMasses([1675.0, 150.0, 55.0])
        setThrusts([30917.0, 2961.0, 1743.0])
        setISPs([240.0, 255.0, 255.0])

        break;
      case ("DPRK - TD-1"):
        setNumStages(3)

        setName("DPRK - TD-1")

        setPayload(1000)
        setMissileDiameter(1.5)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(1)
        setReentryDiameter(0)
        setEstimatedRange(2000)
        setBurnoutAngle(45)

        setFuelMasses([12798, 3771, 196.66])
        setDryMasses([1675.2394, 1100, 23])
        setThrusts([30432, 6000, 2039.43])
        setISPs([226, 268, 280])

        break;
      case ("DPRK - TD-2"):
        setNumStages(2)

        setName("DPRK - TD-2")

        setPayload(1158)
        setMissileDiameter(2)
        setNozzleArea(1)
        setNosecone("Conical")
        setLDivD(1)
        setReentryDiameter(0)
        setEstimatedRange(6400)
        setBurnoutAngle(45)

        setFuelMasses([52124, 12798])
        setDryMasses([3532, 2294])
        setThrusts([104257, 31200])
        setISPs([230, 264])

        break;
    }
  }

  const changeName = (e) => {
    setName(e.target.value)
  }

  const changePayload = (e) => {
    setPayload(parseFloat(e.target.value))
  }

  const changeMissleDiameter = (e) => {
    setMissileDiameter(parseFloat(e.target.value))
  }

  const changeNozzleArea = (e) => {
    setNozzleArea(parseFloat(e.target.value))
  }

  const changeNosecone = (e) => {
    setNosecone(e.target.value)
  }

  const changeLDivD = (e) => {
    setLDivD(parseFloat(e.target.value))
  }

  const changeReentryDiameter = (e) => {
    setReentryDiameter(parseFloat(e.target.value))
  }

  const changeEstimatedRange = (e) => {
    setEstimatedRange(parseFloat(e.target.value))
  }

  const changeBurnoutAngle = (e) => {
    setBurnoutAngle(parseFloat(e.target.value))
  }

  const changeFuelMass = (e) => {
    const relevantIndex = e.target.id.split('')[e.target.id.split('').length - 1] - 1

    const numericalValue = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)

    if (fuelMasses[relevantIndex] === undefined) {
      const newArray = fuelMasses
      newArray.push(numericalValue)
      setFuelMasses(newArray)
    } else {
      const newArray = fuelMasses
      newArray[relevantIndex] = numericalValue
      setFuelMasses(newArray)
    }
  }

  const changeDryMass = (e) => {
    const relevantIndex = e.target.id.split('')[e.target.id.split('').length - 1] - 1

    const numericalValue = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)

    if (dryMasses[relevantIndex] === undefined) {
      const newArray = dryMasses
      newArray.push(numericalValue)
      setDryMasses(newArray)
    } else {
      const newArray = dryMasses
      newArray[relevantIndex] = numericalValue
      setDryMasses(newArray)
    }
  }

  const changeThrust = (e) => {
    const relevantIndex = e.target.id.split('')[e.target.id.split('').length - 1] - 1

    const numericalValue = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)

    if (thrusts[relevantIndex] === undefined) {
      const newArray = thrusts
      newArray.push(numericalValue)
      setThrusts(newArray)
    } else {
      const newArray = thrusts
      newArray[relevantIndex] = numericalValue
      setThrusts(newArray)
    }
  }

  const changeISP = (e) => {
    const relevantIndex = e.target.id.split('')[e.target.id.split('').length - 1] - 1

    const numericalValue = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)

    if (isps[relevantIndex] === undefined) {
      const newArray = isps
      newArray.push(numericalValue)
      setISPs(newArray)
    } else {
      const newArray = isps
      newArray[relevantIndex] = numericalValue
      setISPs(newArray)
    }
  }

  // set statistic for chart
  const changeStatistic = (e) => {
    const stat = e.target.value

    setStatistic(stat)
  }

  // button handlers
  const handleSubmit = async () => {
    setIsLoading(true)
    let base = "http://localhost:8080/api/sim_parameters"

    let params = "?"

    // check
    if (fuelMasses.length != numStages || dryMasses.length != numStages || thrusts.length != numStages || isps.length != numStages) {
      console.log("handle error")
      return
    }

    // Add fuel masses
    for (let i = 0; i < fuelMasses.length; i++) {
      const fuelMass = fuelMasses[i];

      const param_bit = `fuel_masses=${fuelMass}`

      params = params.concat(param_bit)
      params = params.concat("&")
    }

    // Add dry masses
    for (let i = 0; i < dryMasses.length; i++) {
      const dryMass = dryMasses[i];

      const param_bit = `dry_masses=${dryMass}`

      params = params.concat(param_bit)
      params = params.concat("&")
    }

    // Add ISPs
    for (let i = 0; i < isps.length; i++) {
      const isp = isps[i];

      const param_bit = `ISPs=${isp}`

      params = params.concat(param_bit)
      params = params.concat("&")
    }

    // Add thrusts
    for (let i = 0; i < thrusts.length; i++) {
      const thrust = thrusts[i];

      const param_bit = `thrusts=${thrust}`

      params = params.concat(param_bit)
      params = params.concat("&")
    }

    // Add payload
    params = params.concat(`payload=${payload}&`)

    // Add missle diameter
    params = params.concat(`missile_diameter=${missileDiameter}&`)

    // Add nozzle area
    params = params.concat(`nozzle_area=${nozzleArea}&`)

    // Add nosecone
    params = params.concat(`nosecone=${nosecone}&`)

    // Add length divided by diameter
    params = params.concat(`length_div_diameter=${lDivD}&`)

    // Add reentry diameter
    params = params.concat(`reentry_diameter=${reentryDiameter}&`)

    // Add estimated range
    params = params.concat(`estimated_range=${estimatedRange}&`)

    // Add burnout angle
    params = params.concat(`burnout_angle=${burnoutAngle}`)

    // console.log("payload:", payload)
    // console.log("missile diameter:", missileDiameter)
    // console.log("nozzle area:", nozzleArea)
    // console.log("nosecone:", nosecone)
    // console.log("l div d:", lDivD)
    // console.log("reentry diameter:", reentryDiameter)
    // console.log("estimated range:", estimatedRange)
    // console.log("burnout angle:", burnoutAngle)
    // console.log("fuel masses:", fuelMasses)
    // console.log("dry masses:", dryMasses)
    // console.log("thrusts:", thrusts)
    // console.log("isps:", isps)

    console.log(params)
    let full_url = base.concat(params)

    console.log("submit to", full_url)

    let resp = await fetch(full_url)

    let respJSON = await resp.json()

    console.log("received response")

    console.log(respJSON.results)
    let time = respJSON.results.Time
    let velocity = respJSON.results.Velocity
    let cd = respJSON.results.CD
    let drag = respJSON.results.Drag
    let gamma = respJSON.results.Gamma
    let height = respJSON.results.Height
    let mass = respJSON.results.Mass
    let range = respJSON.results.Range
    let thrust = respJSON.results.Thrust

    const newDataset = []

    for (let i = 0; i < time.length; i++) {
      const element = {
        time: time[i],
        velocity: velocity[i],
        cd: cd[i],
        drag: drag[i],
        gamma: gamma[i],
        height: height[i],
        mass: mass[i],
        range: range[i],
        thrust: thrust[i]
      }

      newDataset.push(element)
    }

    console.log('setting new Dataset:', newDataset)
    setDataset(newDataset)
    setHasResults(true)
    setIsLoading(false)
  }

  const handleDelete = (e) => {
    console.log(e.target.id)

    if (numStages > 1) {
      const newFuelMasses = fuelMasses.slice(0, -1)
      const newDryMasses = dryMasses.slice(0, -1)
      const newThrusts = thrusts.slice(0, -1)
      const newISPs = isps.slice(0, -1)

      setNumStages(numStages - 1)
      setFuelMasses(newFuelMasses)
      setDryMasses(newDryMasses)
      setThrusts(newThrusts)
      setISPs(newISPs)
    }
  }

  const handleGeneralReset = (e) => {
    setNumStages(1)

    setName("")

    const payloadEl = document.querySelector("#payload") as HTMLInputElement
    payloadEl.value = "0"
    setPayload(0)

    const missleDiameterEl = document.querySelector("#missile-diameter") as HTMLInputElement
    missleDiameterEl.value = "0"
    setMissileDiameter(0)

    const nozzleAreaEl = document.querySelector("#nozzle-area") as HTMLInputElement
    nozzleAreaEl.value = "0"
    setNozzleArea(0)

    const noseconeEl = document.querySelector("#nosecone") as HTMLSelectElement
    noseconeEl.value = ""
    setNosecone("")

    const lDivDEl = document.querySelector("#length-div-diameter") as HTMLInputElement
    lDivDEl.value = "0"
    setLDivD(0)

    const reentryDiameterEl = document.querySelector("#reentry-diameter") as HTMLInputElement
    reentryDiameterEl.value = "0"
    setReentryDiameter(0)

    const estimatedRangeEl = document.querySelector("#estimated-range") as HTMLInputElement
    estimatedRangeEl.value = "0"
    setEstimatedRange(0)

    const burnoutAngleEl = document.querySelector("#burnout-angle") as HTMLInputElement
    burnoutAngleEl.value = "0"
    setBurnoutAngle(0)
  }

  const handleSingleReset = (e) => {
    const relevantIndex = e.target.id.split('')[e.target.id.split('').length - 1]

    const newFuelMasses = fuelMasses
    const newDryMasses = dryMasses
    const newThrusts = thrusts
    const newISPs = isps

    const fuelMassEl = document.querySelector(`#fuel-mass-${parseInt(relevantIndex) + 1}`) as HTMLInputElement
    fuelMassEl.value = "0"

    const dryMassEl = document.querySelector(`#dry-mass-${parseInt(relevantIndex) + 1}`) as HTMLInputElement
    dryMassEl.value = "0"

    const thrustEl = document.querySelector(`#thrust-${parseInt(relevantIndex) + 1}`) as HTMLInputElement
    thrustEl.value = "0"

    const ispEl = document.querySelector(`#thrust-${parseInt(relevantIndex) + 1}`) as HTMLInputElement
    ispEl.value = "0"

    newFuelMasses[relevantIndex] = 0
    newDryMasses[relevantIndex] = 0
    newThrusts[relevantIndex] = 0
    newISPs[relevantIndex] = 0

    // if (numStages > 1) {
    //   setNumStages(numStages - 1)
    // }

    setFuelMasses(newFuelMasses)
    setDryMasses(newDryMasses)
    setThrusts(newThrusts)
    setISPs(newISPs)
  }

  const handleReturn = () => {
    setDataset({})

    setName("")

    // reset values
    setNumStages(1)

    setPayload(0)
    setMissileDiameter(0)
    setNozzleArea(0)
    setNosecone("")
    setLDivD(0)
    setReentryDiameter(0)
    setEstimatedRange(0)
    setBurnoutAngle(0)

    setFuelMasses([0])
    setDryMasses([0])
    setThrusts([0])
    setISPs([0])

    // reset chart stats
    setStatistic("velocity")

    // return to input view
    setIsLoading(false)
    setHasResults(false)
  }

  useEffect(() => {
    // set ceiling factor, min and 
    let factor = 0
    let min = 0
    let unit = ""
    let round_factor = 0

    if (statistic === "cd") {
      factor = 0.01
      unit = ""
      round_factor = 2
      setUnit(unit)
    } else if (statistic === "drag") {
      factor = 20000
      unit = "N"
      round_factor = 0
      setUnit(unit)
    } else if (statistic === "gamma") {
      factor = 1
      min = -1
      unit = ""
      round_factor = 2
      setUnit(unit)
    } else if (statistic === "height") {
      factor = 10000
      unit = "m"
      round_factor = 0
      setUnit(unit)
    } else if (statistic === "mass") {
      factor = 1000
      unit = "kg"
      round_factor = 0
      setUnit(unit)
    } else if (statistic === "range") {
      factor = 20000
      unit = "m"
      round_factor = 0
      setUnit(unit)
    } else if (statistic === "thrust") {
      factor = 20000
      unit = "N"
      round_factor = 0
      setUnit(unit)
    } else if (statistic === "velocity") {
      factor = 100
      unit = "m/s"
      round_factor = 0
      setUnit(unit)
    }

    const svgElement = d3.select(ref.current)
    const jettison = svgElement.append("g")
      .attr("transform", "translate(" + 60 + "," + 40 + ")")

    // Add x axis
    const x = d3.scaleLinear()
      .domain([0, Math.ceil(d3.extent(dataset, function (d) { return d.time; })[1] / 100) * 100])
      .range([0, ref.current.width.animVal.value - 80])
    jettison.append("g")
      .attr("transform", "translate(0," + (ref.current.height.animVal.value - 80) + ")")
      .call(d3.axisBottom(x))

    // Add y axis
    const y = d3.scaleLinear()
      .domain([min, Math.ceil(d3.max(dataset, function (d) { return d[statistic] }) / factor) * factor])
      .range([ref.current.height.animVal.value - 80, 0]);
    jettison.append("g")
      .call(d3.axisLeft(y))

    // add chart line and add tooltips
    jettison.append("path")
      .datum(dataset)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("d", d3.line().x((d) => x(d.time)).y((d) => y(d[statistic])));

    const tooltip = tip()
      .attr("class", "d3-tip")

    jettison.selectAll("circle")
      .data(dataset)
      .enter().append("circle")
      .attr("r", 1.5)
      .attr("cx", function (d) { return x(d.time); })
      .attr("cy", function (d) { return y(d[statistic]); })
      .attr("fill", 'steelblue')
      .on("mouseover", (event, d) => {
        d3.select(event.target).raise()
        tooltip.show(d)
      })
      .on("mousemove", (event, d) => {
        d3.select(event.target).attr("fill", "red").attr("r", 5).raise()
        tooltip.html(`Time: ${Math.round(d.time)}s<br/>${statistic.charAt(0).toUpperCase() + statistic.slice(1)}: ${d[statistic].toFixed(round_factor)}${unit}`)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY + 10 + 'px');
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).attr("fill", "steelblue").attr("r", 1.5).attr("z-index", 0)
        tooltip.hide(d)
      }
      );

    svgElement.call(tooltip);

    return () => { jettison.remove(); tooltip.destroy() }
  }, [statistic, dataset])


  return (
    <div>
      {
        // Input Parameters
        !isLoading && !hasResults ? (
          <div class="flex flex-col mt-4 gap-2 w-full">
            {/* All Parameters */}
            <p class="flex-grow-1 text-xl">Input Parameters</p>
            {/* Presets TODO: add all presets */}
            <select class="flex-grow-1 bg-gray-200 rounded-md" onInput={changePreset}>
              <option selected disabled value="">Preset</option>
              <option value="Germany - V2">Germany - V2</option>
              <option value="Russia - Scud-B">Russia - Scud-B</option>
              <option value="Iraq - Al-Husayn">Iraq - Al-Husayn</option>
              <option value="DPRK - Nodong-A">DPRK - Nodong-A</option>
              <option value="DPRK - Nodong-A1">DPRK - Nodong-A1</option>
              <option value="DPRK - Nodong-B">DPRK - Nodong-B</option>
              <option value="Iran - Qased5">Iran - Qased5</option>
              <option value="Iran - Qased2">Iran - Qased2</option>
              <option value="DPRK - TD-1">DPRK - TD-1</option>
              <option value="DPRK - TD-2">DPRK - TD-2</option>
            </select>

            <div class="flex flex-row">
              <p class="ml-0 mr-auto w-1/3">Name</p><input onInput={changeName} class="bg-gray-200 rounded-md w-full px-4" type="text" id={`name`} value={name} />
            </div>


            {/* General parameters */}
            <div class="flex flex-col p-2 rounded-md border-1 border-black">
              <div class="flex flex-row">
                <p class="flex-grow-1 text-lg">General Parameters</p>
                <button onClick={handleGeneralReset}><svg class="h-6 pointer-events-none" viewBox="0 0 24 24"><path class="pointer-events-none" d="M7.11 8.53 5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"></path></svg></button>
              </div>
              <div class="flex flex-col">
                <div class="flex flex-row my-1">
                  <p class="ml-0 mr-auto w-1/3">Payload (kg)</p><input onInput={changePayload} class="bg-gray-200 rounded-md bg-gray-200 rounded-md w-full px-4" type="number" id="payload" value={payload} /><p class="mx-auto">kg</p>
                </div>
                <div class="flex flex-row my-1">
                  <p class="ml-0 mr-auto w-1/3">Missile Diameter (m)</p><input onInput={changeMissleDiameter} class="bg-gray-200 rounded-md w-full px-4" type="number" id="missile-diameter" value={missileDiameter} /><p class="mx-auto">m</p>
                </div>
                <div class="flex flex-row my-1">
                  <p class="ml-0 mr-auto w-1/3">Nozzle Area (m)</p><input onInput={changeNozzleArea} class="bg-gray-200 rounded-md w-full px-4" type="number" id="nozzle-area" value={nozzleArea} /><p class="mx-auto">kgs</p>
                </div>
                <div class="flex flex-row my-1">
                  <p class="ml-0 mr-auto w-1/3">Nosecone</p>
                  <select onInput={changeNosecone} class="bg-gray-200 rounded-md w-full pl-auto pr-4" name="nosecone" id="nosecone" value={nosecone}>
                    <option selected disabled value="">Pick a nosecone shape</option>
                    <option value="V2">V2</option>
                    <option value="Conical">Conical</option>
                    <option value="Elliptical">Elliptical</option>
                    <option value="Tangent Ogive">Tangent Ogive</option>
                    <option value="Parabolic">Parabolic</option>
                    <option value="Sears-Haack">Sears-Haack</option>
                  </select>
                </div>
                <div class="flex flex-row my-1">
                  <p class="ml-0 mr-auto w-2/5">Length divided by Diameter</p><input onInput={changeLDivD} class="bg-gray-200 rounded-md w-full px-4" type="number" id="length-div-diameter" value={lDivD} />
                </div>
                <div class="flex flex-row my-1">
                  <p class="ml-0 mr-auto w-1/3">Re-entry Diameter (m)</p><input onInput={changeReentryDiameter} class="bg-gray-200 rounded-md w-full px-4" type="number" id="reentry-diameter" value={reentryDiameter} /><p class="mx-auto">m</p>
                </div>
                <div class="flex flex-row my-1">
                  <p class="ml-0 mr-auto w-1/3">Estimated Range (km)</p><input onInput={changeEstimatedRange} class="bg-gray-200 rounded-md w-full px-4" type="number" id="estimated-range" value={estimatedRange} /><p class="mx-auto">km</p>
                </div>
                <div class="flex flex-row my-1">
                  <p class="ml-0 mr-auto w-1/3">Burnout Angle</p><input onInput={changeBurnoutAngle} class="bg-gray-200 rounded-md w-full px-4" type="number" id="burnout-angle" value={burnoutAngle} /><p class="mx-auto">degrees</p>
                </div>
              </div>
            </div>


            {
              // Stage specific parameters
              Array.from(Array(numStages).keys()).map(i => (
                <div class="flex flex-col p-2 rounded-md border-1 border-black" id={`stage-${i + 1}`}>
                  <div class="flex flex-row">
                    <p class="flex-grow-1 text-lg">Stage {i + 1}</p>
                    <button onClick={handleSingleReset} id={i}><svg class="h-6 pointer-events-none" viewBox="0 0 24 24"><path class="pointer-events-none" d="M7.11 8.53 5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"></path></svg></button>
                    <button onClick={handleDelete} id={i}><svg class="h-6 pointer-events-none" viewBox="0 0 24 24"><path class="pointer-events-none" fill="#e53e3e" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></button>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex flex-row my-1">
                      <p class="ml-0 mr-auto w-1/3">Fuel Mass (kg)</p><input onInput={changeFuelMass} class="bg-gray-200 rounded-md w-full px-4" type="number" id={`fuel-mass-${i + 1}`} value={fuelMasses[i]} /><p class="mx-auto">kg</p>
                    </div>
                    <div class="flex flex-row my-1">
                      <p class="ml-0 mr-auto w-1/3">Dry Mass (kg)</p><input onInput={changeDryMass} class="bg-gray-200 rounded-md w-full px-4" type="number" id={`dry-mass-${i + 1}`} value={dryMasses[i]} /><p class="mx-auto">kg</p>
                    </div>
                    <div class="flex flex-row my-1">
                      <p class="ml-0 mr-auto w-1/3">Thrust (kg f)</p><input onInput={changeThrust} class="bg-gray-200 rounded-md w-full px-4" type="number" id={`thrust-${i + 1}`} value={thrusts[i]} /><p class="mx-auto">kg&nbsp;f</p>
                    </div>
                    <div class="flex flex-row my-1">
                      <p class="ml-0 mr-auto w-1/3">ISP (kg/s)</p><input onInput={changeISP} class="bg-gray-200 rounded-md ml-auto w-full px-4" type="number" id={`isp-${i + 1}`} value={isps[i]} /><p class="mx-auto">kg/s</p>
                    </div>
                  </div>
                </div>
              ))
            }
            {/* Add stage button */}
            <button class="flex flex-row p-2 rounded-md border-1 border-gray-500 items-center" onClick={() => setNumStages(numStages + 1)}>
              <svg class="h-6 pointer-events-none ml-2 mr-auto" viewBox="0 0 24 24"><path class="pointer-events-none" fill="#6b7280" stroke="#6b7280" d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
              <p class="text-lg ml-2 mr-auto text-gray-500">Add Another Stage</p>
            </button>

            {/* Submit parameters */}
            <button class="flex flex-row p-2 rounded-md border-1 border-blue-500 bg-blue-500 items-center" onClick={handleSubmit}>
              <svg class="h-6 pointer-events-none ml-2 mr-auto" viewBox="0 0 24 24"><path class="pointer-events-none" stroke="#eee" fill="#eee" d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"></path></svg>
              <p class="text-lg ml-2 mr-auto text-white">Submit</p>
            </button>
          </div>
        ) : null
      }
      {
        // Loading view
        isLoading && !hasResults ? (
          <div>
            loading...
          </div>
        ) : null
      }
      {
        // View of Chart
        !isLoading && hasResults ? (
          <div class={'flex flex-col mt-4'}>

            {/* Title (includes selection for statistic and unit for statistic) */}
            <h4 class={"flex flex-row text-xl mx-auto"}>
              {name}: Time (s) vs
              <select onInput={changeStatistic} class="bg-gray-200 rounded-md w-fit ml-2 pr-4 mr-2" name="statistic" id="statistic" value={statistic}>
                <option selected value="velocity">Velocity</option>
                <option value="cd">CD</option>
                <option value="drag">Drag</option>
                <option value="gamma">Gamma</option>
                <option value="height">Height</option>
                <option value="mass">Mass</option>
                <option value="range">Range</option>
                <option value="thrust">Thrust</option>
              </select>({unit})
            </h4>

            {/* Chart */}
            <svg id="canvas" ref={ref} class="w-full h-[65vh]" style="background-color: #fff" />

            {/* Return Button */}
            <button class="flex flex-row p-2 rounded-md border-1 border-gray-500 items-center" onClick={handleReturn}>
              <svg class="h-6 pointer-events-none ml-2 mr-auto" viewBox="0 0 24 24"><path class={"pointer-events-none"} stroke="#6b7280" fill="#6b7280" d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></svg>
              <p class="text-lg ml-2 mr-auto text-gray-500">Return</p>
            </button>
          </div>
        ) : null
      }
    </div>
  );
}
