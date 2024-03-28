import dataModel from "../models/task.js";

let flights = [];
// =======================================================
const GET_FLIGHT_BY_ID = (req, res) => {
  console.log(typeof req.params.id);
  //   NUMBER KONVERTUOJA stringa i numberi. veliau pakeiteme eilute, kadangi viska konvertuojame i stringa
  // const task = tasks.find((t) => t.id === Number(req.params.id));
  const flight = flights.find((f) => f.id === req.params.id);
  // tikriname ar task su klausiamu id aplamai egzistuoja?
  if (!flight)
    return res
      .status(404)
      .json({ message: "flight with such id was not found" });
  console.log(task);
  return res.json({ flight: flight });
};
// ==========================================================
const CREATE_FLIGHT = async (req, res) => {
  try {
    const flight = new dataModel({
      // verciame ivedama id i stringa, kad veliau ir gristu stringas, atliekant tikus veiksmus. kitaip gris number
      // id: req.body.id.toString(),
      price: req.body.price.toString(),
      departureCity: req.body.departureCity,
      destinationCity: req.body.destinationCity,
      destinationCityPhotoUrl: req.body.destinationCityPhotoUrl,
      // departureTime: req.body.departureTime.toString(),
    });
    // // ===tikriname ar tokis flight id jau egzistuoja?
    // const isFlightExists = flights.some((f) => f.id === flight.id);
    // if (isFlightExists) {
    //   return res.status(409).json({ message: "This flight already exists" });
    // }

    // const flight = new DataModel({
    //   title: req.body.title,
    //   status: req.body.status,

    //   // return res
    //   // .status(201)
    //   // .json({status: "flight "})
    // });
    const response = await flight.save();
    // flights.push(flight);
    return res
      .status(201)
      .json({ status: "Flight was created", response: response });
  } catch (err) {
    console.log("handled error", err);
    return res.status(500).json({ message: "error happend" });
  }
};
// ==================================================================
const GET_ALL_FLIGHTS = async (req, res) => {
  try {
    // dirbant su db sis if'as nereikalingas:

    // if (!flights.length) {
    //   return res.json({ status: "flight array is empty" });
    // }

    // grazina visus duomenis, kad sulauktume rezultato , dedame await, o prie funkcijos - async
    const flights = await dataModel.find();

    return res.json({ flights: flights });
  } catch (err) {
    console.log("handled error", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const UPDATE_FLIGHT_BY_ID = (req, res) => {
  const isFlightExists = flights.some((flight) => flight.id === req.params.id);
  if (!isFlightExists) {
    return res
      .status(404)
      .json({ message: `flight with id ${req.params.id} was not found` });
  }
  // randame nario, kuri norime atnaujinti,  indexa
  const index = flights.findIndex((flight) => {
    return flight.id === req.params.id;
  });
  // sia eilute pasakome, kad udatinamo flight title yra lygus naujam title
  // flights[index].title = req.body.title;
  // perrasome visa taska, palikdami senas reiksmes (isspredintas taskas) ir pakeisdami naujomis visas per body paduodamas reiksmes
  // kadangi body yra objektas, jis turi buti isspredinamas

  flights[index] = { ...flights[index], ...req.body };

  // graziname atnaujinta flight
  return res.json({ updatedFlight: flights[index] });
};
// ===========================================================
const DELETE_FLIGHT_BY_ID = (req, res) => {
  const remainingFlights = flights.filter((flight) => {
    return req.params.id !== flight.id;
  });

  // tikriname ar nebandome trinti id, koks neegzistuoja
  const isFlightExists = flights.some((flight) => flight.id === req.params.id);
  if (!isFlightExists) {
    return res
      .status(404)
      .json({ message: `flight with id ${req.params.id} was not found` });
  }
  // graziname isfiltruota masyva, be istrinto nario
  tasks = remainingFlights;
  return res
    .status(200)
    .json({ message: `flight with id ${req.params.id} was deleted` });
};

export {
  GET_FLIGHT_BY_ID,
  CREATE_FLIGHT,
  GET_ALL_FLIGHTS,
  DELETE_FLIGHT_BY_ID,
  UPDATE_FLIGHT_BY_ID,
};
