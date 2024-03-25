const Task = require("../models/Task");

module.exports = class TaskController {
  static createTask(req, res) {
    res.render("tasks/create");
  }

  static async showTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });

    console.log(tasks);
    res.render("tasks/all", { tasks });
  }

  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    await Task.create(task);

    res.redirect("/tasks");
  }

  static async removeTask(req, res) {
    const id = req.body.id;

    await Task.destroy({ where: { id } });

    res.redirect("/tasks");
  }

  static async updateTask(req, res) {
    const id = req.params.id;

    const task = await Task.findOne({ raw: true, where: { id: id } });

    res.render("tasks/edit", { task });
  }

  static async updateTaskPost(req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;

    const task = {
      title,
      description,
    };

    await Task.update(task, { where: { id } });

    res.redirect("/tasks");
  }

  static async doneTask(req, res) {
    const id = req.body.id;

    const task = {
      done: req.body.done === "0" ? true : false,
    };
    await Task.update(task, { where: { id } });
    res.redirect("/tasks");
  }
};
