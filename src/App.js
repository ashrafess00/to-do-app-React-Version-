import "./style/mainStyle.css";
import React, { useRef, useState, useEffect } from "react";
import Mode from "./Components/Mode";

function App() {
  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem("to-do-list");
    return localData ? JSON.parse(localData) : [];
  });

  const [tasksTab, setTasksTab] = useState("all");
  const [inputText, setInputText] = useState("");

  const [itemsLeft, setItemsLeft] = useState();

  const inputTextRef = useRef(null);

  const addTask = () => {
    if (inputText) {
      let to_do_list = JSON.parse(localStorage.getItem("to-do-list"));
      to_do_list.push({ value: inputText, active: true, key: Date.now() });
      setTasks(to_do_list);
      setInputText("");
      localStorage.setItem("to-do-list", JSON.stringify(to_do_list));
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("to-do-list")) {
      localStorage.setItem("to-do-list", JSON.stringify([]));
    }
    setItemsLeft(
      tasks.filter((e) => {
        return e.active === true;
      }).length
    );
  }, [tasks]);

  const toBeCompleted = (itemKey) => {
    let to_do_list = JSON.parse(localStorage.getItem("to-do-list"));
    let to_do_list_two = to_do_list.map((item) => {
      if (item.key === itemKey) {
        item.active = !item.active;
        return item;
      } else {
        return item;
      }
    });
    localStorage.setItem("to-do-list", JSON.stringify(to_do_list_two));
    setTasks(to_do_list_two);
  };

  const clearCompleted = () => {
    let to_do_list = JSON.parse(localStorage.getItem("to-do-list"));

    let to_do_list_clear = to_do_list.filter((items) => items.active);
    localStorage.setItem("to-do-list", JSON.stringify(to_do_list_clear));
    setTasks(to_do_list_clear);
  };

  return (
    <>
      {/* task input  */}
      <div className="to-do-container">
        <Mode />
        <div className="task-con flex ai-c p-1 mb-2 br">
          <div className="circle mr-1 c-p" onClick={() => addTask()}></div>
          <input
            type="text"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            ref={inputTextRef}
          />
        </div>

        {/* tasks  */}
        <div className="tasksContainer">
          {tasksTab === "all"
            ? tasks.map((tasks) => {
                return (
                  <div
                    className="taskCon2 flex ai-c p-1 br c-p"
                    key={tasks.key}
                    onClick={() => toBeCompleted(tasks.key)}
                  >
                    <div
                      className={`circle mr-1 ${
                        !tasks.active ? "completedCircle" : ""
                      }`}
                    >
                      <div></div>
                    </div>
                    <p className={!tasks.active ? "completed" : ""}>
                      {tasks.value}
                    </p>
                  </div>
                );
              })
            : tasksTab === "active"
            ? tasks
                .filter((tasks) => {
                  return tasks.active;
                })
                .map((tasks) => {
                  return (
                    <div
                      className="taskCon2 flex ai-c p-1 br c-p"
                      key={tasks.key}
                      onClick={() => toBeCompleted(tasks.key)}
                    >
                      <div className="circle mr-1"></div>
                      <p className={!tasks.active ? "completed" : ""}>
                        {tasks.value}
                      </p>
                    </div>
                  );
                })
            : tasksTab === "completed"
            ? tasks
                .filter((tasks) => {
                  return !tasks.active;
                })
                .map((tasks) => {
                  return (
                    <div
                      className="taskCon2 flex ai-c p-1 br c-p"
                      key={tasks.key}
                      onClick={() => toBeCompleted(tasks.key)}
                    >
                      <div className="circle mr-1"></div>
                      <p className={!tasks.active ? "completed" : ""}>
                        {tasks.value}
                      </p>
                    </div>
                  );
                })
            : ""}
        </div>
        {/* container bottom  */}
        <div className="flex jc-sb small-text taskCon2 p-1">
          <div>{itemsLeft} items left</div>
          <div className="filterCon flex gap-1 c-p">
            <div onClick={() => setTasksTab("all")}>All</div>
            <div onClick={() => setTasksTab("active")}>Active</div>
            <div onClick={() => setTasksTab("completed")}>Completed</div>
          </div>
          <div className="c-p" onClick={() => clearCompleted()}>
            Clear Completed
          </div>
        </div>

        <div className="filterCon2 flex jc-sb small-text gap-1 c-p">
          <div onClick={() => setTasksTab("all")}>All</div>
          <div onClick={() => setTasksTab("active")}>Active</div>
          <div onClick={() => setTasksTab("completed")}>Completed</div>
        </div>
      </div>
    </>
  );
}

export default App;
