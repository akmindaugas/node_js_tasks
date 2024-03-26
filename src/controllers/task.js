let tasks = [];
// =======================================================
const GET_TASK_BY_ID = (req, res) => {
  console.log(typeof req.params.id);
  //   NUMBER KONVERTUOJA stringa i numberi
  const task = tasks.find((t) => t.id === Number(req.params.id));
  // tikriname ar task su klausiamu id aplamai egzistuoja?
  if (!task)
    return res.status(404).json({ message: "task with such id was not found" });
  console.log(task);
  return res.json({ task: task });
};
// ==========================================================
const CREATE_TASK = (req, res) => {
  const task = {
    // verciame ivedama id i stringa, kad veliau ir gristu stringas, atliekant tikus veiksmus. kitaip gris number
    id: req.body.id.toString(),
    title: req.body.title,
    status: req.body.status,
  };
  // ===tikriname ar tokis tasko id jau egzistuoja?
  const isTaskExists = tasks.some((t) => t.id === task.id);
  if (isTaskExists) {
    return res.status(409).json({ message: "This task already exists" });
  }
  tasks.push(task);
  return res.status(201).json({ status: "Task was created", task: task });
};
// ==================================================================
const GET_ALL_TASKS = (req, res) => {
  if (!tasks.length) {
    return res.json({ status: "task array is empty" });
  }
  return res.json({ tasks: tasks });
};

const UPDATE_TASK_BY_ID = (req, res) => {
  const isTaskExists = tasks.some((task) => task.id === req.params.id);
  if (!isTaskExists) {
    return res
      .status(404)
      .json({ message: `task with id ${req.params.id} was not found` });
  }
  // randame nario, kuri norime atnaujinti,  indexa
  const index = tasks.findIndex((task) => {
    return task.id === req.params.id;
  });
  // sia eilute pasakome, kad udatinamo tasko title yra lygus naujam title
  // tasks[index].title = req.body.title;
  // perrasome visa taska, plikdami senas reiksmes (isspredintas taskas) ir pakeisdami naujomis visas per body paduodamas reiksmes
  // kadangi body yra objektas, jis turi buti isspredinamas

  tasks[index] = { ...tasks[index], ...req.body };

  // graziname atnaujinta taska
  return res.json({ updatedTask: tasks[index] });
};

const DELETE_TASK_BY_ID = (req, res) => {
  const remainingTasks = tasks.filter((task) => {
    return req.params.id !== task.id;
  });

  // tikriname ar nebandome trinti id, koks neegzistuoja
  const isTaskExists = tasks.some((task) => task.id === req.params.id);
  if (!isTaskExists) {
    return res
      .status(404)
      .json({ message: `task with id ${req.params.id} was not found` });
  }
  // graziname isfiltruota masyva, be istrinto nario
  tasks = remainingTasks;
  return res
    .status(200)
    .json({ message: `task with id ${req.params.id} was deleted` });
};

export {
  GET_ALL_TASKS,
  CREATE_TASK,
  GET_TASK_BY_ID,
  DELETE_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
};
